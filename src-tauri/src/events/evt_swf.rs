use serde::Serialize;
use tauri::{AppHandle, Emitter};

#[derive(Clone, Serialize)]
struct SwfPayload {
    hash: String,
    avm: usize,
    date: String,
}

#[derive(Clone, Serialize)]
struct CountPayload {
    count: usize
}

#[tauri::command]
pub fn evt_update_swf_by_hash(
    app: AppHandle,
    hash: String,
    avm: usize,
    date: String
) {
    app.emit(
        "update_swf_by_hash",
        SwfPayload { hash: hash.clone(), avm, date: date.clone() }
    ).unwrap();
}

#[tauri::command]
pub fn evt_update_swf_count(app: &AppHandle, count: usize) {
    app.emit(
        "update_swf_count",
        CountPayload { count }
    ).unwrap();
}