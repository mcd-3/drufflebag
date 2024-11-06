// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
mod data {
    pub mod migrations;
}

use std::{ffi::OsStr, path::Path};
use data::migrations::MigrationsHistory;
use tauri_plugin_dialog::DialogExt;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn open_ruffle(app: tauri::AppHandle) {
    tauri::WebviewWindowBuilder::new(&app, "Ruffle", tauri::WebviewUrl::App("ruffle.html".into()))
        .title("hey")
        .build()
        .unwrap();
}

#[tauri::command]
async fn scan_directory(app: tauri::AppHandle) -> Vec<String> {
    let directory_path = app.dialog().file().blocking_pick_folder().unwrap();

    let mut swf_files: Vec<String> = Vec::new();
    let directory_path_str = directory_path.to_string();

    let entries = std::fs::read_dir(&directory_path_str).unwrap();

    // TODO: Make this multi-threaded for better performance
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
                            swf_files.push(full_path_str);
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

    swf_files
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
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![open_ruffle])
        .invoke_handler(tauri::generate_handler![scan_directory])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
