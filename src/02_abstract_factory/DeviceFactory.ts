import type { Laptop, Mobile } from "./Product_Interfaces.js";

export interface DeviceFactory {
  createLaptop(): Laptop;
  createMobile(): Mobile;
}
