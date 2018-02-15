let API_KEY;

/**
 * Module to use google's geocoding & reverse geocoding.
 */
let Geocoder;
export default Geocoder = {
	/**
	 * Initialize the module.
	 * @param {String} apiKey The api key of your application in google.
	 * @see https://developers.google.com/maps/documentation/geocoding/intro#geocoding
	 */
	init(apiKey){
		API_KEY = apiKey;
	},

	/**
	 * @returns {boolean} True if the module has been initiated. False otherwise.
	 */
	get isInit(){
		return !! API_KEY;
	},

	/**
	 * @see {@link Geocoder.init}
	 * @deprecated
	 */
	setApiKey(API_KEY) {
		this.init(API_KEY);
	},

	/**
	 * Do <a href="https://developers.google.com/maps/documentation/geocoding/intro#ReverseGeocoding">(reverse) geocoding</a>, converting geographic coordinates into a human-readable address & vice-versa.
	 * Accepted parameters:
	 * <ul>
	 *     <li>from(Number latitude, Number longitude)</li>
	 *     <li>from(Array [latitude, longitude])</li>
	 *     <li>from(Object {latitude, longitude})</li>
	 *     <li>from(Object {lat, lng})</li>
	 *     <li>from(String address)</li>
	 * </ul>
	 * @returns {Promise.<Object>} Object containing informations about the place at the coordinates.
	 * @see https://developers.google.com/maps/documentation/geocoding/intro#GeocodingResponses
	 */
	async from(...params) {
		// check api key
		if (!Geocoder.isInit)
			throw {
				code : Geocoder.Errors.NOT_INITIATED,
				message : "Geocoder isn't initialized. Call Geocoder.init function (only once), passing it your app's api key as parameter.",
			};

		// --- convert parameters ---
		let queryParams;

		// (latitude, longitude)
		if (!isNaN(params[0]) && !isNaN(params[1]))
			queryParams = {latlng : `${params[0]},${params[1]}`};

		// [latitude, longitude]
		else if (params[0] instanceof Array)
			queryParams = {latlng : `${params[0][0]},${params[0][1]}`};

		// {latitude, longitude}  or {lat, lng}
		else if (params[0] instanceof Object)
			queryParams = {latlng : `${params[0].lat || params[0].latitude},${params[0].lng || params[0].longitude}`};

		// address
		else if (typeof params[0] === 'string')
			queryParams = {address : params[0]};


		// --- start geocoding ---

		// check query params
		if (!queryParams)
		// no query params, means parameters where invalid
			throw {
				code : Geocoder.Errors.INVALID_PARAMETERS,
				message : "Invalid parameters : \n" + JSON.stringify(params, null, 2),
			};

		queryParams.key = API_KEY;

		// build url
		const url = 'https://maps.google.com/maps/api/geocode/json?' + toQueryParams(queryParams);

		let response, data;

		// fetch
		try {
			response = await fetch(url);
		} catch(error) {
			throw {
				code : Geocoder.Errors.FETCHING,
				message : "Error while fetching. Check your network.",
				origin : error,
			};
		}

		// parse
		try {
			data = await response.json();
		} catch(error) {
			throw {
				code : Geocoder.Errors.PARSING,
				message : "Error while parsing response's body into JSON. The response is in the error's 'origin' field. Try to parse it yourself.",
				origin : response,
			};
		}

		// check response's data
		if (data.status !== 'OK')
			throw {
				code : Geocoder.Errors.SERVER,
				message : "Error from the server while geocoding. The received datas are in the error's 'origin' field. Check it for more informations.",
				origin : data,
			};

		return data;
	},

	/**
	 * <a href="https://developers.google.com/maps/documentation/geocoding/intro#geocoding">Geocodes</a>, converting address into a geographic coordinates.
	 * Use {@link Geocoder.from} instead.
	 * @param {String} address Address to reverse geocode.
	 * @returns {Promise.<Object>} Object containing informations about the place and the coordinates.
	 * @see https://developers.google.com/maps/documentation/geocoding/intro#Viewports
	 * @deprecated
	 */
	getFromLocation(address) {
		return this.from(address);
	},

	/**
	 * Do <a href="https://developers.google.com/maps/documentation/geocoding/intro#ReverseGeocoding">reverse geocoding</a>, converting geographic coordinates into a human-readable address.
	 * Use {@link Geocoder.from} instead.
	 * @param {Number} lat Latitude coordinate.
	 * @param {Number} lng Longitude coordinate.
	 * @returns {Promise.<Object>} Object containing informations about the place at the coordinates.
	 * @see https://developers.google.com/maps/documentation/geocoding/intro#GeocodingResponses
	 * @deprecated
	 */
	getFromLatLng(lat, lng){
		return this.from(lat, lng);
	},

	/**
	 * All possible errors.
	 */
	Errors : {
		/**
		 * Module hasn't been initiated. Call {@link Geocoder.init}.
		 */
		NOT_INITIATED : 0,

		/**
		 * Parameters are invalid.
		 */
		INVALID_PARAMETERS : 1,

		/**
		 * Error wile fetching to server.
		 * The error.origin property contains the original fetch error.
		 */
		FETCHING : 2,

		/**
		 * Error while parsing server response.
		 * The error.origin property contains the response.
		 */
		PARSING : 3,

		/**
		 * Error from the server.
		 * The error.origin property contains the response's body.
		 */
		SERVER : 4,
	},
}

/**
 * Convert an object into query parameters.
 * @param {Object} object Object to convert.
 * @returns {string} Encoded query parameters.
 */
function toQueryParams(object){
	return Object.keys(object)
		.filter(key => !!object[key])
		.map(key => key + "=" + encodeURIComponent(object[key]))
		.join("&")
}