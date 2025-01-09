/// Create a new Tauri window for the Emulation page
fn create_ruffle_page(app: tauri::AppHandle, swf_name: String) {
    tauri::WebviewWindowBuilder::new(&app, "emulator", tauri::WebviewUrl::App("ruffle.html".into()))
        .title(swf_name)
        .build()
        .unwrap();
}

/// Create a new Tauri window for the Settings page
fn create_settings_page(app: tauri::AppHandle) {
    tauri::WebviewWindowBuilder::new(&app, "settings", tauri::WebviewUrl::App("settings.html".into()))
        .title("Settings")
        .inner_size(625.0, 475.0)
        .build()
        .unwrap();
}

/// Create a new Tauri window for the About page
fn create_about_page(app: tauri::AppHandle) {
    tauri::WebviewWindowBuilder::new(&app, "about", tauri::WebviewUrl::App("about.html".into()))
        .title("About")
        .inner_size(400.0, 712.0)
        .build()
        .unwrap();
}

#[cfg(windows)]
#[tauri::command]
pub async fn open_ruffle(app: tauri::AppHandle, swf_name: String) { create_ruffle_page(app, swf_name); }

#[cfg(not(windows))]
#[tauri::command]
pub async fn open_ruffle(app: tauri::AppHandle, swf_name: String) { create_ruffle_page(app, swf_name); }

#[cfg(windows)]
#[tauri::command]
pub async fn open_settings(app: tauri::AppHandle) { create_settings_page(app); }

#[cfg(not(windows))]
#[tauri::command]
pub fn open_settings(app: tauri::AppHandle) { create_settings_page(app); }

#[cfg(windows)]
#[tauri::command]
pub async fn open_about(app: tauri::AppHandle) { create_about_page(app); }

#[cfg(not(windows))]
#[tauri::command]
pub fn open_about(app: tauri::AppHandle) { create_about_page(app); }
