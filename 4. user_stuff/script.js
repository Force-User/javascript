class Entity {
  constructor(name) {
    this.name = name;
  }
}

class User extends Entity {
  constructor(name) {
    super(name);
    this._boxes = [];
  }
  addBox(box) {
    this._boxes.push(box);
  }
}

class Box extends Entity {
  constructor(name) {
    super(name);
    this._items = [];
  }
  addItem(item) {
    this._items.push(item);
  }
}

class Stuff extends Entity {
  constructor(name) {
    super(name);
  }
}

const user1 = new User("Ezio");
const box1 = new Box("Weapons");
const sword = new Stuff("Sword");
const blade = new Stuff("Blade");
box1.addItem(sword);
box1.addItem(blade);
user1.addBox(box1);
console.log(user1);
