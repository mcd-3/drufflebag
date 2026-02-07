mod data {
    pub mod migrations;
}

mod pages {
    pub mod open;
}

mod utils {
    pub mod hash;
    pub mod cache;
}

mod commands {
    pub mod c_cache;
    pub mod c_app;
    pub mod c_page;
    pub mod c_path;
    pub mod c_swf;
}

use data::migrations::MigrationsHistory;
use commands::{
    c_cache::{
        c_get_cached_swfs,
        c_cache_swfs
    },
    c_app::c_exit_app,
    c_page::{
        c_open_about,
        c_open_ruffle,
        c_open_settings
    },
    c_path::{
        c_copy_to_public,
        c_scan_directory
    },
    c_swf::c_get_swf_hash
};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let db_migrations = MigrationsHistory::migrations();

    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(
            tauri_plugin_sql::Builder::new()
                .add_migrations("sqlite:drufflebag_sql.db", db_migrations)
                .build(),
        )
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            c_open_ruffle,
            c_open_settings,
            c_open_about,
            c_scan_directory,
            c_cache_swfs,
            c_get_cached_swfs,
            c_copy_to_public,
            c_get_swf_hash,
            c_exit_app,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
