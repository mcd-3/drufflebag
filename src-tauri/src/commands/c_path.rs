use serde_json::{json, Value};
use crate::utils::path::get_directory_path;
use crate::utils::swf::add_to_swf_list;

#[tauri::command]
pub fn c_copy_to_public(swf_absolute_path: &str) {
    std::fs::copy(
        swf_absolute_path,
        "./../public/play.temp.swf"
    ).unwrap();
}

#[tauri::command]
pub async fn c_scan_directory(
    app: tauri::AppHandle,
    cached_directory_path: String
) -> serde_json::Value {
    let mut swf_files: Vec<Value> = Vec::new();
    let directory_path: String = get_directory_path(&app, &cached_directory_path);

    if directory_path == "" {
        return json!({
            "cancelled": true,
        })
    }

    let entries = std::fs::read_dir(&directory_path).unwrap();

    // TODO: Make this multi-threaded for better performance
    for entry in entries {
        match entry {
            Ok(entry) => {
                add_to_swf_list(
                    &app,
                    entry,
                    &directory_path,
                    &mut swf_files
                );
            }
            Err(e) => {
                println!("ERROR: {:?}", e);
            }
        }
    }

    let return_json = json!({
        "parent_dir": directory_path,
        "swfs": swf_files,
        "cancelled": false,
    });

    return_json
}