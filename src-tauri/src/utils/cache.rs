use std::{fs::File, io::BufWriter, path::Path};
use serde_json::{Value};

/// Gets the full data directory path
/// 
/// Returns the full data directory path as a string
pub fn get_full_data_dir_path(app_data_dir: &str) -> String {
    let mut full_path: String = app_data_dir.to_owned();
    full_path.push_str("/.cached_swf.json");

    full_path.clone()
}

/// Write a list of swfs to the cache for faster access
pub async fn cache_swfs(swfs: Vec<Value>, app_data_dir: String) {
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

/// Gets a list of cached swf files
/// 
/// Returns a list of cached swf paths
pub async fn get_cached_swfs(app_data_dir: String) -> Vec<Value> {
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