import Database from '@tauri-apps/plugin-sql'

const db = await Database.load('sqlite:drufflebag_sql.db');

/**
 * Gets the SQLite DB instance for the app
 *
 * @returns {Database} SQLite DB instance
 */
const getDB = async () => {
    return await Database.load('sqlite:drufflebag_sql.db');
};

/**
 * Gets a swf file entry by it's MD5 hash
 *
 * @param {string} hash - MD5 hash of a swf file 
 */
const getSWFByHash = async (hash) => {
    return await db.select(
        "SELECT * FROM swf_table WHERE md5_hash = ?",
        [hash]
    )
};

/**
 * Insert a swf object into the database.
 *
 * @param {object} swf - SWF file object to insert 
 */
const insertSWF = async (swf) => {
    try {
        return await db.execute(
            'INSERT into swf_table (id, name, md5_hash, spoofed_url, last_played_date, file_size_bytes, type_id, status_id, avm_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [null, swf.path.split('/').pop(), swf.md5_hash, null, null, swf.size, null, null, null]
        );
    } catch (e) {
        console.log('Entry already exists. Skipping...');
        return {};
    }
};

const updateSWF = async (swf) => {
    // Update by MD5 hash
    // No checks to see if it exists
    try {
        // return await db.execute(
        //     'UPDATE swf_table SET title = ?, status = ? WHERE id = ?',
        //     [todos.title, todos.status, todos.id]
        // )
    } catch (e) {
        console.log('Could not update the following:');
        console.log(swf);
        console.error(e);
    }
}


export { getSWFByHash, insertSWF };