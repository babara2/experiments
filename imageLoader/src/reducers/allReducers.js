import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { PID_CHANGE, PICID_SUBMIT, 
	CLOSE_LIGHTBOX, MOVE_TO_PREV, 
	MOVE_TO_NEXT, OPEN_LIGHTBOX } from '../actions/index'


// Submit and lightbox states are interlinked so using a single reducer
function photoSaver(state = {
	visited: false,
	toggled: false,
	data: undefined,
    error: ''
 }, action){
	switch (action.type) {
		case PID_CHANGE:
			return Object.assign({}, state, {
		        picId: action.payload
		    })
		case PICID_SUBMIT:
			if (action.payload.photos){
				return Object.assign({}, state, {
					visited: false,
					toggled: true,
			        data: action.payload.photos,
			        index: 0,
			        error: ''
			    })}
			if (!action.payload.photos){
				return Object.assign({}, state, {
					visited: false,
			        data: undefined,
			        error: action.payload.error
			    })}
			break
		case CLOSE_LIGHTBOX:
			return Object.assign({}, state, {
		        toggled: action.payload.toggled,
		        visited: action.payload.visited
		    })
		case OPEN_LIGHTBOX:
			return Object.assign({}, state, {
		        toggled: action.payload.toggled
		    })
		case MOVE_TO_PREV:
		return Object.assign({}, state, {
		        index: action.payload.index
		    })
		case MOVE_TO_NEXT:
			return Object.assign({}, state, {
		        index: action.payload.index
		    })
		default:
			return state
	}
}

//Combining all reducers into one
const rootReducer = combineReducers({
  stateInfo: photoSaver,
  form: formReducer
})

export default rootReducer
