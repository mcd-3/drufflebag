// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
mod data {
    pub mod migrations;
}

use std::{ffi::OsStr, fs::File, io::BufWriter, path::Path};
use data::migrations::MigrationsHistory;
use tauri_plugin_dialog::{DialogExt, FilePath};
use serde_json::{json, Result, Value};

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
        println!("{}", json);
        json.as_array().unwrap().to_vec()
    } else {
        // File does not exist so nothing is cached
        Vec::new()
    }
}

#[tauri::command]
fn open_ruffle(app: tauri::AppHandle, swf_name: &str) {
    tauri::WebviewWindowBuilder::new(&app, "Ruffle", tauri::WebviewUrl::App("ruffle.html".into()))
        .title(swf_name)
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
                            let swf_json = json!({
                                "path": full_path_str,
                                "size": entry.metadata().unwrap().len(),
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
        .invoke_handler(tauri::generate_handler![open_ruffle, scan_directory, cache_swfs, get_cached_swfs])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
