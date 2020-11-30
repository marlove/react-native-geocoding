declare namespace Geocoder {
  interface LatLng {
    lat: number;
    lng: number;
  }
  interface PlusCode {
    compound_code: string;
    global_code: string;
  }
  interface GeocoderResponse {
    plus_code: PlusCode;
    results: {
      address_components: {
        long_name: string;
        short_name: string;
        types: string[];
      }[];
      formatted_address: string;
      geometry: {
        bounds: {
          northeast: LatLng;
          southwest: LatLng;
        };
        location: LatLng;
        location_type: 'APPROXIMATE' | 'ROOFTOP' | string;
        viewport: {
          northeast: LatLng;
          southwest: LatLng;
        };
      };
      place_id: string;
      types: string[];
      plus_code: PlusCode;
    }[];
    status: 'OK' | string;
  }

  type fromParams =
    | number
    | number[]
    | LatLng
    | { latitude: number; longitude: number }
    | string;

  function init(apiKey: string, options?: Object): void;
  function isInit(): boolean;
  function from(...params: fromParams[]): Promise<GeocoderResponse>;
}

declare module 'react-native-geocoding' {
  export default Geocoder;
}
