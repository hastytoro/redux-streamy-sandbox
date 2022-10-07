import React, { useEffect } from "react";
import Modal from "../Modal";
import history from "../../history";

import { deleteStream, fetchStream } from "../../actions";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

const StreamDelete = ({ match, stream, fetchStream, deleteStream }) => {
  const { id } = match.params;
  useEffect(() => {
    fetchStream(id);
  }, []);
  const renderContent = () => {
    if (!stream) return "Are you sure you want to delete this title?";
    return `Are you sure you want to delete this title: ${stream.title}?`;
  };
  const renderBtn = () => {
    return (
      <React.Fragment>
        <button className="ui button negative" onClick={() => deleteStream(id)}>
          Delete
        </button>
        <Link className="ui button" to="/">
          Cancel
        </Link>
      </React.Fragment>
    );
  };
  return (
    <Modal
      onDismiss={() => history.push("/")}
      title="Delete Stream"
      content={renderContent()}
      components={renderBtn()}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return { stream: state.streams[id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
