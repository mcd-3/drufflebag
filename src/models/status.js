class Status {
  constructor({id, status}) {
    this.id = id;
    this.status = status;
  }

  toJSON() {
    return {
      id: this.id,
      status: this.status
    };
  }
}
  
export default Status;
  