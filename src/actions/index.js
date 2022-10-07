import streams from "../apis/streams";
import history from "../history";

// types:
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
// ...
export const CREATE_STREAM = "CREATE_STREAM";
export const FETCH_STREAMS = "FETCH_STREAMS";
export const FETCH_STREAM = "FETCH_STREAM";
export const EDIT_STREAM = "EDIT_STREAM";
export const DELETE_STREAM = "DELETE_STREAM";

// Action creators:
export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

// Action creator - thunk CRUD operation (create)
export const createStream = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await streams.post("/streams", { ...formValues, userId });
    dispatch({
      type: CREATE_STREAM,
      payload: response.data,
    });
    history.push("/");
  };
};
// Action creator - thunk CRUD operation (read)
export const fetchStreams = () => {
  return async (dispatch) => {
    const response = await streams.get("/streams");
    dispatch({
      type: FETCH_STREAMS,
      payload: response.data,
    });
  };
};
// Action creator - thunk CRUD operation (read)
export const fetchStream = (id) => {
  return async (dispatch) => {
    const response = await streams.get(`/streams/${id}`);
    dispatch({
      type: FETCH_STREAM,
      payload: response.data,
    });
  };
};
// Action creator - thunk CRUD operation (update)
export const editStream = (id, formValues) => {
  return async (dispatch) => {
    const response = await streams.patch(`/streams/${id}`, formValues);
    dispatch({
      type: EDIT_STREAM,
      payload: response.data,
    });
    history.push("/");
  };
};
// Action creator - thunk CRUD operation (delete)
export const deleteStream = (id) => {
  return async (dispatch) => {
    await streams.delete(`/streams/${id}`);
    dispatch({
      type: DELETE_STREAM,
      payload: id,
    });
    history.push("/");
  };
};
