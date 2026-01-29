use std::fs::File;
use chksum_md5 as md5;

pub fn get_file_hash(file_path: &str) -> String {
    let file_to_hash = File::open(file_path).unwrap();
    let digest = md5::chksum(&file_to_hash).unwrap();

    digest.to_hex_lowercase()
}