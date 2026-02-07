use std::{ffi::OsStr, path::Path};
use tauri::Emitter;
use tauri_plugin_dialog::{DialogExt, FilePath};
use serde_json::{json, Value};
use serde::Serialize;
use crate::utils::hash::get_file_hash;

#[tauri::command]
pub fn c_copy_to_public(swf_absolute_path: &str) {
    std::fs::copy(
        swf_absolute_path,
        "./../public/play.temp.swf"
    ).unwrap();
}

#[derive(Clone, Serialize)]
struct Payload {
    count: u32,
}

#[tauri::command]
pub async fn c_scan_directory(
    app: tauri::AppHandle,
    cached_directory_path: String
) -> serde_json::Value {
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
    let mut swf_count: u32 = 0;
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
                            swf_count = swf_count + 1;
                            app.emit(
                                "swf-count-update",
                                Payload { count: swf_count }
                            ).unwrap();
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