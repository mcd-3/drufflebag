use std::sync::Mutex;
pub struct FileToOpen(pub Mutex<Option<String>>);