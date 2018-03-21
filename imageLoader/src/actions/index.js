import fetch from 'cross-fetch'

// Action types
export const PID_CHANGE = 'PID_CHANGE'
export const PICID_SUBMIT = 'PICID_SUBMIT'
export const CLOSE_LIGHTBOX = 'CLOSE_LIGHTBOX'
export const MOVE_TO_PREV = 'MOVE_TO_PREV'
export const MOVE_TO_NEXT = 'MOVE_TO_NEXT'
export const OPEN_LIGHTBOX = 'OPEN_LIGHTBOX'

//API KEY used to retrieve data using flickr api
const API_KEY = '57247e746a5bf1a48f114112e736dbb8'


// ####### Helper functions for onSubmit ########### //

// Returns the error for when a bad Photoset ID is entered
export const badPIDError = () => {
	return{
		error: 'Invalid Photoset ID given.'
	}
}

// Returns the error for when unable to make GET request from api
export const fatalError = () => {
	return{
		error: 'Please try again. There might be a problem with the network.'
	}
}

// Makes a call to the flickr api and retrieves data if present
// Also note we are using async function with await which allows us
// to make non-synchronous call in a 'synchronous' fashion
export const fetchPhotoset = async (pid) => {
	try{
	    const api_call = await fetch(`https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${API_KEY}&photoset_id=${pid}&format=json&nojsoncallback=1`)
	    const data = await api_call.json()
	    if (data.stat === 'ok'){
	    	return {
				photos: data.photoset.photo
			}
	 	};
	    if (data.stat === 'fail') {
	    	return badPIDError()
      	};
	}
    catch(err){
    	return fatalError()
    }
}

// ############### ACTION CREATERS ############### //

// Action on photoset id form submit
export const onSubmit = (value) => {
	return {
		type: PICID_SUBMIT,
		payload: fetchPhotoset(value.picId)
	}
}

// Action on closing the lightbox
export const onClose = () => {
	return{
		type: CLOSE_LIGHTBOX,
		payload: {
			toggled: false,
			visited: true
		}
	}
}

// Action on move to the previous picture in the lightbox
export const movePrev = (index, length) => {
	const newIndex = (index + length - 1) % length
	return{
		type: MOVE_TO_PREV,
		payload: {
			index: newIndex
		}
	}
}

// Action on moving to the next picture in the lightbox
export const moveNext = (index, length) => {
	const newIndex = (index + 1) % length
	return{
		type: MOVE_TO_NEXT,
		payload: {
			index: newIndex
		}
	}
}

// Action on re-opening the lightbox
export const openLightbox = () => {
	return{
		type: OPEN_LIGHTBOX,
		payload: {
			toggled: true
		}
	}
}
