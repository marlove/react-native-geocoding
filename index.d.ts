declare namespace Geocoder {
  interface GeocoderResponse {
    results: {
      address_components: {
        long_name: string;
        short_name: string;
        types: string[];
      }[];
      formatted_address: string;
      geometry: {
        bounds: {
          northeast: {
            lat: number;
            lng: number;
          };
          southwest: {
            lat: number;
            lng: number;
          };
        };
        location: {
          lat: number;
          lng: number;
        };
        location_type: 'APPROXIMATE';
        viewport: {
          northeast: {
            lat: number;
            lng: number;
          };
          southwest: {
            lat: number;
            lng: number;
          };
        };
      };
      place_id: string;
      types: string[];
    }[];
    status: 'OK' | string;
  }

  function init(apiKey: string, options?: Object): void;
  function isInit(): boolean;
  function from(...params: any[]): Promise<GeocoderResponse>;
}

declare module 'react-native-geocoding' {
  export default Geocoder;
}
