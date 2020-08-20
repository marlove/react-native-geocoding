declare module 'react-native-geocoding' {
    export default class Geocoder {
        public static init(apiKey: string, options: Object): void;
        public static isInit(): boolean;
        public static setApiKey(API_KEY: string): void;
        public static from(...params: any[]): Promise<void>;
        public static getFromLocation(address: string): Promise<any>;
        public static getFromLatLng(lat: number, lng: number): Promise<any>;
    }
}
