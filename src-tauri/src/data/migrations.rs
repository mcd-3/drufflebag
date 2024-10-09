use tauri_plugin_sql::{Migration, MigrationKind};

pub struct MigrationsHistory { }

impl MigrationsHistory {
    pub fn migrations() -> Vec<Migration> {
        vec![
            Migration {
                version: 1,
                description: "create_type_table",
                sql: "CREATE TABLE swf_type_table (id INTEGER PRIMARY KEY, type STRING)",
                kind: MigrationKind::Up,
            },
            Migration {
                version: 2,
                description: "create_swf_table",
                sql: "
                    CREATE TABLE swf_table (
                        id INTEGER PRIMARY KEY,
                        name TEXT,
                        sha_256_hash TEXT,
                        spoofed_url TEXT,
                        author TEXT,
                        year DATE,
                        file_size_bytes INTEGER,
                        CONSTRAINT type
                            FOREIGN KEY (id)
                            REFERENCES swf_type_table(id)
                    );",
                kind: MigrationKind::Up,
            },
            Migration {
                version: 3,
                description: "insert_swf_types",
                sql: "
                    INSERT into swf_type_table (id, type) VALUES (1, 'Game');
                    INSERT into swf_type_table (id, type) VALUES (2, 'Animation');
                ",
                kind: MigrationKind::Up
            }
        ]
    }
}