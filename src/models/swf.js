class Swf {
  constructor({
    avm,
    name,
    path,
    md5_hash,
    type,
    size,
    lp,
    status,
    url,
  }) {
    this.avm = avm;
    this.name = name;
    this.path = path;
    this.md5_hash = md5_hash;
    this.type = type;
    this.size = size;
    this.lp = lp;
    this.status = status;
    this.url = url;
  }

  toJSON() {
    return {
        avm: this.avm,
        name: this.name,
        path: this.path,
        md5_hash: this.md5_hash,
        type: this.type,
        size: this.size,
        lp: this.lp,
        status: this.status,
        url: this.url
    };
  }
}

export default Swf;
