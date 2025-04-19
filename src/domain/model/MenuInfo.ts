class MenuInfo {
  constructor(
    public name: string,
    public calory?: number,
    public protein?: number
  ) {}

  toDisplayDto() {
    return {
      name: this.name,
      calory: this.calory,
      protein: this.protein,
    };
  }
}

export default MenuInfo;
