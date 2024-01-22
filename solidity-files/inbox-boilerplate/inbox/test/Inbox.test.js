const ganache = require("ganache");
const assert = require("assert");
const { Web3 } = require("web3");
const web3 = new Web3(ganache.provider());

class Car {
  park() {
    return "Stopped";
  }

  drive() {
    return "Vroom";
  }
}

describe("Car", () => {
  it("should return 'Stopped'", () => {
    const car = new Car();
    assert.equal(car.park(), "Stopped");
  });

  it("should return 'Vroom'", () => {
    const car = new Car();
    assert.equal(car.drive(), "Vroom");
  });
});
