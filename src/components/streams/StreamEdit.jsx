import _ from "lodash";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

const StreamEdit = ({ match, stream, fetchStream, editStream }) => {
  useEffect(() => {
    const id = match.params.id;
    fetchStream(id);
  }, []);
  const onSubmit = (formValues) => {
    const id = match.params.id;
    editStream(id, formValues);
  };
  return (
    <div>
      {!stream ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3>Edit a Stream</h3>
          <StreamForm
            initialValues={_.pick(stream, "title", "description")}
            onSubmit={onSubmit}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
