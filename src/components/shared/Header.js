import React from "react";
import logo from "../../icons/logo.png";

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <img className="logo" src={logo} alt="logo"></img>
        <h1>Bliss Frontend Challenge</h1>
      </header>
    );
  }
}

export default Header;
