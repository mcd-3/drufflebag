// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
mod data {
    pub mod migrations;
}

use data::migrations::MigrationsHistory;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn open_ruffle(app: tauri::AppHandle) {
    tauri::WebviewWindowBuilder::new(
        &app,
        "Ruffle",
        tauri::WebviewUrl::App("ruffle.html".into())
    )
    .build()
    .unwrap();
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {

    let db_migrations = MigrationsHistory::migrations();

    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::new()
            .add_migrations("sqlite:drufflebag_sql.db", db_migrations)
            .build()
        )
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![open_ruffle])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
