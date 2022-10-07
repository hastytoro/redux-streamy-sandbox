import _ from "lodash";

import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import {
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  EDIT_STREAM,
  DELETE_STREAM,
  SIGN_IN,
  SIGN_OUT,
} from "../actions"; // types

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
};

const streamsReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  streams: streamsReducer,
});
