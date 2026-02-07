#[tauri::command]
pub fn c_exit_app(app: tauri::AppHandle) {
    app.exit(0);
}