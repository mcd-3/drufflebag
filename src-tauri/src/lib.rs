// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
mod data {
    pub mod migrations;
}

use std::{ffi::OsStr, fs::File, io::BufWriter, path::Path};
use data::migrations::MigrationsHistory;
use chksum_md5 as md5;
use tauri_plugin_dialog::{DialogExt, FilePath};
use serde_json::{json, Value};

#[tauri::command]
async fn cache_swfs(swfs: Vec<Value>) {
    let path = Path::new("./.cached_swf.json");
    if path.exists() {
        // Delete the existing file first if it exists
        std::fs::remove_file(path).unwrap();
    }
    let file = File::create(path).unwrap();
    let mut writer = BufWriter::new(file);
    serde_json::to_writer(&mut writer, &swfs).unwrap();
}

#[tauri::command]
async fn get_cached_swfs() -> Vec<Value> {
    let path = Path::new("./.cached_swf.json");
    if path.exists() {
        let file = File::open(path)
            .expect("file should open read only");
        let json: serde_json::Value =
            serde_json::from_reader(file).unwrap();
        json.as_array().unwrap().to_vec()
    } else {
        // File does not exist so nothing is cached
        Vec::new()
    }
}

#[cfg(windows)]
#[tauri::command]
async fn open_ruffle(app: tauri::AppHandle, swf_name: String) {
    tauri::WebviewWindowBuilder::new(&app, "emulator", tauri::WebviewUrl::App("ruffle.html".into()))
        .title(swf_name)
        .build()
        .unwrap();
}

#[cfg(not(windows))]
#[tauri::command]
async fn open_ruffle(app: tauri::AppHandle, swf_name: String) {
    tauri::WebviewWindowBuilder::new(&app, "emulator", tauri::WebviewUrl::App("ruffle.html".into()))
        .title(swf_name)
        .build()
        .unwrap();
}

#[cfg(windows)]
#[tauri::command]
async fn open_settings(app: tauri::AppHandle) {
    tauri::WebviewWindowBuilder::new(&app, "settings", tauri::WebviewUrl::App("settings.html".into()))
    .title("Settings")
    .inner_size(600.0, 450.0)
    .build()
    .unwrap();
}

#[cfg(not(windows))]
#[tauri::command]
fn open_settings(app: tauri::AppHandle) {
    tauri::WebviewWindowBuilder::new(&app, "settings", tauri::WebviewUrl::App("settings.html".into()))
    .title("Settings")
    .inner_size(600.0, 450.0)
    .build()
    .unwrap();
}

#[tauri::command]
async fn scan_directory(app: tauri::AppHandle, cached_directory_path: String) -> serde_json::Value {
    let directory_path = if cached_directory_path == "" {
        app.dialog().file().blocking_pick_folder().unwrap()
    } else {
        FilePath::from(Path::new(&cached_directory_path))
    };

    let mut swf_files: Vec<Value> = Vec::new();
    let directory_path_str = directory_path.to_string();

    let entries = std::fs::read_dir(&directory_path_str).unwrap();

    // TODO: Make this multi-threaded for better performance
    // TODO: Read the file and get the AVM version and file size
    for entry in entries {
        match entry {
            Ok(entry) => {
                let filename = entry.file_name();
                let extension = Path::new(&filename)
                    .extension()
                    .and_then(OsStr::to_str);

                match extension {
                    Some(ext_str) => {
                        if ext_str == "swf" {
                            let full_path_str = format!("{}/{:?}", &directory_path_str, filename).replace("\"", "");

                            // MD5 is not considered secure, but it should be ok for our purposes
                            let file_to_hash = File::open(&full_path_str).unwrap();
                            let digest = md5::chksum(&file_to_hash).unwrap();

                            let swf_json = json!({
                                "path": full_path_str,
                                "size": entry.metadata().unwrap().len(),
                                "md5_hash": digest.to_hex_lowercase(),
                                "avm": 0,
                            });

                            swf_files.push(swf_json);
                        }
                    },
                    None => println!(""),
                }
            }
            Err(e) => {
                println!("ERROR: {:?}", e);
            }
        }
    }

    let return_json = json!({
        "parent_dir": directory_path_str,
        "swfs": swf_files
    });

    return_json
}

#[tauri::command]
fn copy_to_public(swf_absolute_path: &str) {
    std::fs::copy(swf_absolute_path, "./../public/play.temp.swf").unwrap();
}

#[tauri::command]
async fn get_swf_hash(swf_absolute_path: String) -> String {
    // TODO: This code is reused in scan_directory
    //       Move it to a proper non-tauri function
    let file_to_hash = File::open(&swf_absolute_path).unwrap();
    let digest = md5::chksum(&file_to_hash).unwrap();

    digest.to_hex_lowercase()
}

// async fn update_cache_by_swf_hash()

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let db_migrations = MigrationsHistory::migrations();

    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(
            tauri_plugin_sql::Builder::new()
                .add_migrations("sqlite:drufflebag_sql.db", db_migrations)
                .build(),
        )
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            open_ruffle,
            open_settings,
            scan_directory,
            cache_swfs,
            get_cached_swfs,
            copy_to_public,
            get_swf_hash,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
