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
  get boxes() {
    return this._boxes;
  }
  addBox(boxName) {
    this._boxes.push(new Box(boxName));
  }
  print() {
    console.log(this);
  }
}

class Box extends Entity {
  constructor(name) {
    super(name);
    this._stuff = [];
  }
  addStuff(...stuff) {
    this._stuff.push(
      ...stuff.map((item) => {
        return new Stuff(item);
      })
    );
  }
}

class Stuff extends Entity {
  constructor(name) {
    super(name);
  }
}

const user1 = new User("Peter");
const user2 = new User("John");
user1.addBox("firstBox");
user1.addBox("seconBox");
user1.boxes[0].addStuff("Ручка", "Телефон");
user1.print();
user2.addBox("box");
user2.boxes[0].addStuff("Car");
user2.print();
