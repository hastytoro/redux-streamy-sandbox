import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

const apiKey1 =
  "797401886567-9cumct9mrt3v2va409rasa7fa6fq02hh.apps.googleusercontent.com";
const apiKey2 =
  "207101391287-op9ifc9rhtl0hfd9rrrm7ld0bdmgk1pf.apps.googleusercontent.com";

class GoogleAuth extends React.Component {
  // auth = null;
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: apiKey2,
          scope: "email",
          plugin_name: "streamy",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      const userId = this.auth.currentUser.get().getId();
      this.props.signIn(userId);
    } else {
      this.props.signOut();
    }
  };
  onSignOut = () => {
    this.auth.signOut();
  };
  onSignIn = () => {
    this.auth.signIn();
  };

  renderAuth = () => {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.onSignOut}>
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui blue google button" onClick={this.onSignIn}>
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  };
  render() {
    return <div>{this.renderAuth()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
