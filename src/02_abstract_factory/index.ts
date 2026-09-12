import {
  type Company,
  AppleCompany,
  SamsungCompany,
} from "./Concrete_Factories.js";

// let comName = "apple";
let comName = "samsung";

let com: Company;

if (comName === "apple") {
  com = new AppleCompany();
} else if (comName === "samsung") {
  com = new SamsungCompany();
} else {
  throw new Error("Type not found");
}

com.displayCollectionData();
