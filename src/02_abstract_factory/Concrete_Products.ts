import type { Laptop, Mobile } from "./Product_Interfaces.js";

export class SamsungLaptop implements Laptop {
  public name: string = "Samsung Laptop";
  public price = 1500;

  public getData(): string {
    return `Laptop Name: ${this.name}\nLaptop Price: ${this.price}`;
  }
}

export class SamsungMobile implements Mobile {
  public name: string = "Samsung Mobile";
  public price: number = 999;

  public getData(): string {
    return `Mobile Name: ${this.name}\nMobile Price: ${this.price}`;
  }
}

export class AppleLaptop implements Laptop {
  public name: string = "Apple Laptop";
  public price = 2999;

  public getData(): string {
    return `Laptop Name: ${this.name}\nLaptop Price: ${this.price}`;
  }
}

export class AppleMobile implements Mobile {
  public name: string = "Apple Mobile";
  public price: number = 899;

  public getData(): string {
    return `Mobile Name: ${this.name}\nMobile Price: ${this.price}`;
  }
}
