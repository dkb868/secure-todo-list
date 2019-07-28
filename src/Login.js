import React from "react";

class Login extends React.Component {
  handleSignIn = () => {
    this.props.userSession.redirectToSignIn();
  };

  render() {
    return (
      <div
        style={{ padding: "30px 0" }}
        className="ui text container center aligned"
      >
        <h1>Decentralized Todo List</h1>
        <p>This is the most secure todo list on the market.</p>

        <button className="ui button positive" onClick={this.handleSignIn}>
          Sign in with blockstack
        </button>
      </div>
    );
  }
}

export default Login;
