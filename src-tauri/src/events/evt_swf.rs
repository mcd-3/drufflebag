use serde::Serialize;
use tauri::{AppHandle, Emitter};

#[derive(Clone, Serialize)]
struct Payload {
    hash: String,
    avm: usize,
    date: String,
}

#[tauri::command]
pub fn evt_update_swf_by_hash(app: AppHandle, hash: String, avm: usize, date: String) {
    println!("{}", hash);
    println!("{}", avm);
    println!("{}", date);
    app.emit(
        "update_swf_by_hash",
        Payload { hash: hash.clone(), avm, date: date.clone() }
    ).unwrap();
}