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
                description: "create_status_table",
                sql: "CREATE TABLE swf_status_table (id INTEGER PRIMARY KEY, status STRING)",
                kind: MigrationKind::Up,
            },
            Migration {
                version: 3,
                description: "create_avm_table",
                sql: "CREATE TABLE avm_table (id INTEGER PRIMARY KEY, version INTEGER)",
                kind: MigrationKind::Up,
            },
            Migration {
                version: 4,
                description: "insert_swf_types",
                sql: "
                    INSERT into swf_type_table (id, type) VALUES (1, 'Game');
                    INSERT into swf_type_table (id, type) VALUES (2, 'Animation');
                ",
                kind: MigrationKind::Up
            },
            Migration {
                version: 5,
                description: "insert_avm",
                sql: "
                    INSERT into avm_table (id, version) VALUES (1, 1);
                    INSERT into avm_table (id, version) VALUES (2, 2);
                ",
                kind: MigrationKind::Up
            },
            Migration {
                version: 6,
                description: "insert_swf_status",
                sql: "
                    INSERT into swf_status_table (id, status) VALUES (1, 'Playable');
                    INSERT into swf_status_table (id, status) VALUES (2, 'Issues');
                    INSERT into swf_status_table (id, status) VALUES (3, 'Menu');
                    INSERT into swf_status_table (id, status) VALUES (4, 'Boots');
                    INSERT into swf_status_table (id, status) VALUES (5, 'Nothing');
                ",
                kind: MigrationKind::Up
            },
            Migration {
                version: 7,
                description: "create_swf_table",
                sql: "
                    CREATE TABLE swf_table (
                        id INTEGER PRIMARY KEY,
                        name TEXT,
                        md5_hash TEXT UNIQUE,
                        spoofed_url TEXT,
                        last_played_date DATE,
                        file_size_bytes INTEGER,
                        type_id INTEGER,
                        status_id INTEGER,
                        avm_id INTEGER,
                        FOREIGN KEY (type_id) 
                            REFERENCES swf_type_table (id) 
                                ON DELETE CASCADE 
                                ON UPDATE NO ACTION,
                        FOREIGN KEY (status_id) 
                            REFERENCES swf_status_table (id) 
                                ON DELETE CASCADE 
                                ON UPDATE NO ACTION
                        FOREIGN KEY (avm_id) 
                            REFERENCES avm_table (id) 
                                ON DELETE CASCADE 
                                ON UPDATE NO ACTION
                    );",
                kind: MigrationKind::Up,
            },
        ]
    }
}