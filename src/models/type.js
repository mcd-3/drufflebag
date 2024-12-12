class Type {
  constructor({id, type}) {
    this.id = id;
    this.type = type;
  }

  toJSON() {
    return {
      id: this.id,
      type: this.type
    };
  }
}
  
export default Type;
