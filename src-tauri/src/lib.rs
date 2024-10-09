// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
mod data {
    pub mod migrations;
}

use data::migrations::MigrationsHistory;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
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
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
