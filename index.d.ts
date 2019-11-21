declare module "react-native-geocoding" {
  namespace Geocoder {
    export function init(apiKey: string, options: Object): void;
    export function isInit(): boolean;
    export function setApiKey(API_KEY: string): void;
    export function from(...params: any[]): Promise<any>;
    export function getFromLocation(address: string): Promise<any>;
    export function getFromLatLng(lat: number, lng: number): Promise<any>;
  }
  export = Geocoder;
}
