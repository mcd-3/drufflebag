use crate::pages::open::{
    create_ruffle_page,
    create_settings_page,
    create_about_page
};

#[cfg(windows)]
#[tauri::command]
pub async fn c_open_ruffle(
    app: tauri::AppHandle,
    swf_name: String
) {
    create_ruffle_page(app, swf_name);
}

#[cfg(not(windows))]
#[tauri::command]
pub async fn c_open_ruffle(
    app: tauri::AppHandle,
    swf_name: String
) {
    create_ruffle_page(app, swf_name);
}

#[cfg(windows)]
#[tauri::command]
pub async fn c_open_settings(app: tauri::AppHandle) {
    create_settings_page(app);
}

#[cfg(not(windows))]
#[tauri::command]
pub fn c_open_settings(app: tauri::AppHandle) {
    create_settings_page(app);
}

#[cfg(windows)]
#[tauri::command]
pub async fn c_open_about(app: tauri::AppHandle) {
    create_about_page(app);
}

#[cfg(not(windows))]
#[tauri::command]
pub fn c_open_about(app: tauri::AppHandle) {
    create_about_page(app);
}
