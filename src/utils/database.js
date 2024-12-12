import Database from '@tauri-apps/plugin-sql'
import Swf from '../models/swf';
import Status from '../models/status';
import Type from '../models/type';

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
 * @returns {Swf|null} Swf object retrieved from database.
 */
const getSWFByHash = async (hash) => {
  try {
    const db = await getDB();
    const query = await db.select(
      "SELECT * FROM swf_table WHERE md5_hash = ?",
      [hash]
    );

    if (query.length === 0) {
      return null;
    }

    const result = query[0];
  
    const swf = new Swf({
      avm: result.avm_id === null ? 0 : result.avm_id,
      name: result.name,
      path: "",
      md5_hash: result.md5_hash,
      type: null,
      size: result.file_size_bytes,
      lp: result.last_played_date,
      status: null,
      url: "",
    });
  
    return swf;
  } catch (e) {
    console.log(`ERROR: Could not get swf with hash ${hash}.`);
    console.log(e);
    return null;
  }
};

/**
 * Returns all Status objects from Database
 *
 * @returns {array} Array of Status objects
 */
const getStatuses = () => {
  // Don't get it from DB as it's expensive and not really worth it for most purposes
  return [
    new Status({ id: 1, status: 'Playable' }),
    new Status({ id: 2, status: 'Issues' }),
    new Status({ id: 3, status: 'Menu' }),
    new Status({ id: 4, status: 'Boots' }),
    new Status({ id: 5, status: 'Nothing' }),
  ];
};

/**
 * Returns all Type objects from Database
 *
 * @returns {array} Array of Type objects
 */
const getTypes = () => {
  // Don't get it from DB as it's expensive and not really worth it for most purposes
  return [
    new Type({ id: 1, type: 'Game' }),
    new Type({ id: 2, type: 'Animation' }),
  ];
};

/**
 * Insert a swf object into the database.
 *
 * @param {object} swf - SWF file object to insert 
 */
const insertSWF = async (swf) => {
  const db = await getDB();
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

const updateSWFDateAVMByHash = async ({ hash, date, avm }) => {
  const db = await getDB();
  try {
    return await db.execute(
      'UPDATE swf_table SET last_played_date = ?, avm_id = ? WHERE md5_hash = ?',
      [date, avm, hash]
    );
  } catch (e) {
    console.log(`Could not update the following hash: ${hash}`);
    console.error(e);
  }
}

/**
 * Updates a Swf object in the database. Finds by MD5 hash.
 *
 * @param {Swf} swf - Swf to update
 * @returns {} Update result
 */
const updateSWF = async (swf) => {
  const db = await getDB();
  try {
    return await db.execute(
      'UPDATE swf_table SET name = ?, spoofed_url = ?, last_played_date = ?, file_size_bytes = ?, type_id = ?, status_id = ?, avm_id = ? WHERE md5_hash = ?',
      [
        swf.name,
        "",
        swf.lp,
        swf.size,
        swf.type === 0 ? null : swf.type,
        swf.status === 0 ? null : swf.status,
        swf.avm === 0 ? null : swf.avm,
        swf.md5_hash,
      ]
    )
  } catch (e) {
    console.log('Could not update the following:');
    console.log(swf);
    console.error(e);
  }
}

export {
  getSWFByHash,
  getStatuses,
  getTypes,
  insertSWF,
  updateSWFDateAVMByHash,
  updateSWF,
};
