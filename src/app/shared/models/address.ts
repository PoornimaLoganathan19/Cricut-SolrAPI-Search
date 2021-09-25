import { Country } from "./country";
import { State } from "./state";

export class Address {
  id: number;
  line1: string;
  line2: string;
  town: string;
  country: Country;
  state: State;
  postalCode: string;
  latitude: number;
  longitude: number;
  addressType: string;
  defaultAddress: boolean;
}
