const googleApiUrl = 'https://maps.google.com/maps/api/geocode/json';

export default {
  apiKey: null,

  setApiKey(apiKey) {
    this.apiKey = apiKey;
  },

  async getFromLocation(address) {
    if (!this.apiKey) {
      return Promise.reject(new Error("Provided API key is invalid"));
    }

    if (!address) {
      return Promise.reject(new Error("Provided address is invalid"));
    }

    const url = `${googleApiUrl}?key=${this.apiKey}&address=${encodeURI(address)}`;
    const response = await fetch(url).catch(
      error => {
        return Promise.reject(new Error("Error fetching data"));
      }
    );

    const json = await response.json().catch(
      error => {
        return Promise.reject(new Error("Error parsing server response"));
      }
    );

    if (json.status === 'OK') {
      return json;
    }
    else {
      return Promise.reject(new Error(`Server returned status code ${json.status}`));
    }
  }
}