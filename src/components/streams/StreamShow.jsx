import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

const StreamShow = ({ fetchStream, match, stream }) => {
  const { id } = match.params;
  useEffect(() => {
    fetchStream(id);
  }, []);
  if (!stream) return <div>Loading...</div>;
  const { title, description } = stream;
  return (
    <div>
      <h2>{title}</h2>
      <h4>{description}</h4>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  return { stream: state.streams[id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
