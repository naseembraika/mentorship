interface Device {
  name: string;
  price: number;

  getData(): string;
}

class Laptop implements Device {
  public name: string = "Samsung Laptop";
  public price: number = 4500;

  public getData(): string {
    return `Device Name: ${this.name}\nDevice Price: ${this.price}`;
  }
}

class Mobile implements Device {
  public name: string = "Samsung Mobile";
  public price: number = 999;

  public getData(): string {
    return `Device Name: ${this.name}\nDevice Price: ${this.price}`;
  }
}

class AirBods implements Device {
  public name: string = "Samsung AirBods";
  public price: number = 499;

  public getData(): string {
    return `Device Name: ${this.name}\nDevice Price: ${this.price}`;
  }
}

interface Company {
  createDevice(): Device;
  displayData(): void;
}

class SamsungLaptop implements Company {
  public createDevice(): Device {
    return new Laptop();
  }

  public displayData(): void {
    const device: Device = this.createDevice();
    console.log(device.getData());
  }
}

class SamsungMobile implements Company {
  public createDevice(): Device {
    return new Mobile();
  }

  public displayData(): void {
    const device = this.createDevice();
    console.log(device.getData());
  }
}

class SamungAirBods implements Company {
  public createDevice(): Device {
    return new AirBods();
  }

  public displayData(): void {
    const device = this.createDevice();
    console.log(device.getData());
  }
}

const lapotp = new SamsungLaptop();
lapotp.displayData();

console.log();

const mobile = new SamsungMobile();
mobile.displayData();

console.log();

const airBods = new SamungAirBods();
airBods.displayData();
