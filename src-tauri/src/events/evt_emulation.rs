use tauri::{AppHandle, Emitter};

#[tauri::command]
pub fn evt_close_emulation(app: AppHandle) {
  app.emit("close_emulation", Some("close")).unwrap();
}