"use strict";
const existingVehicleIds = new Set();
class Vehicle {
  constructor(id, types, status) {
    this.id = id;
    this.types = types;
    this.status = status;
  }
  assignUser(user) {
    if (this.status !== "available") {
      throw new Error(
        `Vehicle with ID ${this.id} is not available for assignment`
      );
    }
    console.log(
      `Assigning vehicle with ID ${this.id}  to ${user.name} ${user.surname} ${user.email}`
    );
    this.status = "in service";
  }
}
class User {
  constructor(name, surname, email, preferredMOP) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.preferredMOP = preferredMOP;
  }
  bookVehicle(vehicle) {
    if (vehicle.status !== "available") {
      throw new Error(
        `Vehicle with ID ${vehicle.id} is not available for booking`
      );
    } else {
      vehicle.assignUser(this);
      console.log(
        `Booking vehicle ${vehicle.id} for ${this.name} ${this.surname} ${this.email} ${this.preferredMOP}`
      );
    }
  }
}
class City {
  constructor(name, vehicleList) {
    this.name = name;
    this.vehicleList = vehicleList;
  }
  addVehicle(vehicle) {
    if (existingVehicleIds.has(vehicle.id)) {
      throw new Error(`Vehicle with ID ${vehicle.id} already exists`);
    }
    const existingVehicle = this.vehicleList.find((v) => v.id === vehicle.id);
    if (existingVehicle) {
      throw new Error(
        `Vehicle with ID ${vehicle.id} already exists in ${this.name} and is currently in service`
      );
    }
    existingVehicleIds.add(vehicle.id);
    this.vehicleList.push(vehicle);
    console.log(`Adding vehicle with ID ${vehicle.id} to ${this.name}`);
  }
}
const bike1 = new Vehicle(1, "bike", "available");
const scooter1 = new Vehicle(2, "scooter", "available");
const kickboard1 = new Vehicle(3, "kickboard", "available");
const user1 = new User("Andrea", "Fragnelli", "7eG5b@example.com", "cash");
const user2 = new User("Jane", "Coin", "7eG5b@example.com", "card");
const user3 = new User("Bob", "Doe", "7eG5b@example.com", "cash");
const city1 = new City("New York", []);
const city2 = new City("San Francisco", []);
const city3 = new City("Los Angeles", []);
city1.addVehicle(bike1);
city2.addVehicle(scooter1);
city3.addVehicle(kickboard1);
try {
  user1.bookVehicle(bike1);
  user2.bookVehicle(scooter1);
  user3.bookVehicle(kickboard1);
} catch (error) {
  console.error(error);
}
try {
  user1.bookVehicle(bike1);
} catch (error) {
  console.error(error);
}
const bike2 = new Vehicle(4, "bike", "available");
city1.addVehicle(bike2);
try {
  user2.bookVehicle(bike2);
} catch (error) {
  console.error(error);
}
