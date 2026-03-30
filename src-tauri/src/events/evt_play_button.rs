use tauri::{AppHandle, Emitter};

#[tauri::command]
pub fn evt_update_play_button(app: AppHandle) {
  app.emit("update_play_button", Some("updated")).unwrap();
}