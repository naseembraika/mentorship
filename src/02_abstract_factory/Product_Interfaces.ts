export interface Laptop {
  name: string;
  price: number;

  getData(): void;
}

export interface Mobile {
  name: string;
  price: number;

  getData(): string;
}
