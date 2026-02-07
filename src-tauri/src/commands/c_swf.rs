use crate::utils::hash::get_file_hash;

#[tauri::command]
pub async fn c_get_swf_hash(swf_absolute_path: String) -> String {
    get_file_hash(&swf_absolute_path)
}