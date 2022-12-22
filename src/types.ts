export enum Locations {
  "Madrid",
  "Barcelona",
}

export type UserDetails = {
  user: string;
  age: number;
  location: {
    address: string;
    city: Locations;
  };
};
