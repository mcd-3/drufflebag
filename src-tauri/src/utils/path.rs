use tauri_plugin_dialog::{DialogExt, FilePath};
use std::path::Path;

/// Builds an absolute path from a directory path
/// 
/// Retuns a string of a directory path
pub fn get_directory_path(
    app: &tauri::AppHandle,
    cached_directory_path: &String
) -> String {
    let directory_path = if cached_directory_path == "" {
        match app.dialog().file().blocking_pick_folder() {
            Some(fp) => fp,
            None => FilePath::from(Path::new(""))
        }
    } else {
        FilePath::from(Path::new(&cached_directory_path))
    };

    directory_path.to_string()
}