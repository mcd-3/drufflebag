use std::ffi::OsString;
use std::fs::DirEntry;
use std::{ffi::OsStr, path::Path};
use tauri::Emitter;
use serde_json::{json, Value};
use serde::Serialize;
use crate::utils::hash::get_file_hash;

#[derive(Clone, Serialize)]
struct Payload {
    count: usize,
}

/// Converts a DirEntry of a SWF file into a Serde Value and
/// adds it to a list of SWF values.
/// 
/// Emits an event to update total SWF count
pub fn add_to_swf_list(
    app: &tauri::AppHandle,
    entry: DirEntry,
    directory_path: &String,
    swf_files: &mut Vec<Value>
) {
    let filename: OsString = entry.file_name();
    let extension: Option<&str> = Path::new(&filename)
        .extension()
        .and_then(OsStr::to_str);

    match extension {
        Some(ext_str) => {
            if ext_str == "swf" {
                let full_path_string = format!(
                    "{}/{:?}",
                    directory_path,
                    filename
                ).replace("\"", "");

                let swf_json = json!({
                    "path": full_path_string,
                    "size": entry.metadata().unwrap().len(),
                    "md5_hash": get_file_hash(&full_path_string),
                    "avm": 0,
                });

                swf_files.push(swf_json);
                app.emit(
                    "swf-count-update",
                    Payload { count: swf_files.len() }
                ).unwrap();
            }
        },
        None => println!(""),
    }
}