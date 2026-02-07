
use serde_json::Value;
use crate::utils::cache::{cache_swfs, get_cached_swfs};

#[tauri::command]
pub async fn c_cache_swfs(swfs: Vec<Value>, app_data_dir: String) {
    cache_swfs(swfs, app_data_dir).await;
}

#[tauri::command]
pub async fn c_get_cached_swfs(app_data_dir: String) -> Vec<Value> {
    get_cached_swfs(app_data_dir).await
}