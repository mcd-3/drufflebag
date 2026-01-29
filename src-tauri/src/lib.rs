// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
mod data {
    pub mod migrations;
}

mod pages {
    pub mod open;
}

mod utils {
    pub mod hash;
}

use std::{ffi::OsStr, fs::File, io::BufWriter, path::Path};
use data::migrations::MigrationsHistory;
use tauri_plugin_dialog::{DialogExt, FilePath};
use serde_json::{json, Value};
use pages::open::{open_ruffle, open_settings, open_about};
use utils::hash::get_file_hash;

fn get_full_data_dir_path(app_data_dir: &str) -> String {
    let mut full_path: String = app_data_dir.to_owned();
    full_path.push_str("/.cached_swf.json");

    full_path.clone()
}

#[tauri::command]
async fn cache_swfs(swfs: Vec<Value>, app_data_dir: String) {
    // We pass the data dir here because Tauri's Rust bindings feel unfinished
    let full_path = get_full_data_dir_path(&app_data_dir);

    let path = Path::new(&full_path);
    if path.exists() {
        // Delete the existing file first if it exists
        std::fs::remove_file(path).unwrap();
    }
    let file = File::create(path).unwrap();
    let mut writer = BufWriter::new(file);
    serde_json::to_writer(&mut writer, &swfs).unwrap();
}

#[tauri::command]
async fn get_cached_swfs(app_data_dir: String) -> Vec<Value> {
    // We pass the data dir here because Tauri's Rust bindings feel unfinished
    let full_path = get_full_data_dir_path(&app_data_dir);
    let path = Path::new(&full_path);
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

#[tauri::command]
fn exit_app(app: tauri::AppHandle) {
    app.exit(0);
}

#[tauri::command]
async fn scan_directory(app: tauri::AppHandle, cached_directory_path: String) -> serde_json::Value {
    let directory_path = if cached_directory_path == "" {
        match app.dialog().file().blocking_pick_folder() {
            Some(fp) => fp,
            None => FilePath::from(Path::new(""))
        }
    } else {
        FilePath::from(Path::new(&cached_directory_path))
    };

    let mut swf_files: Vec<Value> = Vec::new();
    let directory_path_str = directory_path.to_string();

    if directory_path_str == "" {
        return json!({
            "cancelled": true,
        })
    }

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
                            let full_path_string = format!(
                                "{}/{:?}",
                                &directory_path_str, filename
                            ).replace("\"", "");

                            let swf_json = json!({
                                "path": full_path_string,
                                "size": entry.metadata().unwrap().len(),
                                "md5_hash": get_file_hash(&full_path_string),
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
        "swfs": swf_files,
        "cancelled": false,
    });

    return_json
}

#[tauri::command]
fn copy_to_public(swf_absolute_path: &str) {
    std::fs::copy(swf_absolute_path, "./../public/play.temp.swf").unwrap();
}

#[tauri::command]
async fn get_swf_hash(swf_absolute_path: String) -> String {
    get_file_hash(&swf_absolute_path)
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
            open_about,
            scan_directory,
            cache_swfs,
            get_cached_swfs,
            copy_to_public,
            get_swf_hash,
            exit_app,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
