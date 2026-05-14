mod data {
    pub mod migrations;
}

mod pages {
    pub mod open;
}

mod utils {
    pub mod hash;
    pub mod cache;
    pub mod path;
    pub mod swf;
}

mod commands {
    pub mod c_cache;
    pub mod c_app;
    pub mod c_page;
    pub mod c_path;
    pub mod c_swf;
}

mod events {
    pub mod evt_play_button;
    pub mod evt_emulation;
    pub mod evt_swf;
}

pub mod structs;

use std::sync::Mutex;
use tauri::{Emitter, Manager, State};

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
        c_open_settings,
        c_open_quickstart
    },
    c_path::{
        c_copy_to_public,
        c_scan_directory,
        c_get_launch_file,
        c_get_swf_count_from_dir
    },
    c_swf::c_get_swf_hash
};
use events::{
    evt_play_button::evt_update_play_button,
    evt_emulation::evt_close_emulation,
    evt_swf::evt_update_swf_by_hash,
};
use crate::structs::FileToOpen;

#[derive(Clone, serde::Serialize)]
struct Payload {
    args: Vec<String>,
    cwd: String,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let db_migrations = MigrationsHistory::migrations();

    tauri::Builder::default()
        .manage(FileToOpen(Mutex::new(None)))
        .plugin(tauri_plugin_single_instance::init(|app, argv, cwd| {
            app.emit("single-instance", Payload { args: argv, cwd }).unwrap();
        }))
        .plugin(tauri_plugin_dialog::init())
        .plugin(
            tauri_plugin_sql::Builder::new()
                .add_migrations("sqlite:drufflebag_sql.db", db_migrations)
                .build(),
        )
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            // Commands
            c_open_ruffle,
            c_open_settings,
            c_open_about,
            c_open_quickstart,
            c_scan_directory,
            c_cache_swfs,
            c_get_cached_swfs,
            c_get_swf_count_from_dir,
            c_copy_to_public,
            c_get_swf_hash,
            c_exit_app,
            c_get_launch_file,
            // Events
            evt_update_play_button,
            evt_close_emulation,
            evt_update_swf_by_hash,
        ])
        .setup(|app| {
            // Open with file
            let args: Vec<String> = std::env::args().collect();
            if args.len() > 1 {
                let state: State<'_, FileToOpen> = app.state::<FileToOpen>();
                *state.0.lock().unwrap() = Some(args[1].clone());
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
