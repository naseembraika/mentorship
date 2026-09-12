import type { DeviceFactory } from "./DeviceFactory.js";
import type { Laptop, Mobile } from "./Product_Interfaces.js";
import {
  AppleLaptop,
  AppleMobile,
  SamsungLaptop,
  SamsungMobile,
} from "./Concrete_Products.js";

export abstract class Company implements DeviceFactory {
  public abstract createLaptop(): Laptop;
  public abstract createMobile(): Mobile;

  public displayCollectionData(): void {
    console.log("======\nCollection Information");
    console.log(this.createLaptop().getData());
    console.log("-------");
    console.log(this.createMobile().getData());
    console.log("======");
  }
}

export class SamsungCompany extends Company {
  public createLaptop(): SamsungLaptop {
    return new SamsungLaptop();
  }

  public createMobile(): SamsungMobile {
    return new SamsungMobile();
  }
}

export class AppleCompany extends Company {
  public createLaptop(): AppleLaptop {
    return new AppleLaptop();
  }

  public createMobile(): AppleMobile {
    return new AppleMobile();
  }
}
