import React from "react";
import getExternalData from "./externalData";
//import jsonData from "https://static.wbstatic.net/data/main-menu-ru-ru.json";
//mport jsonData from "https://static.wbstatic.net/data/main-menu-ru-ru.json" assert { type: "json" };
//let jsonData = require("https://static.wbstatic.net/data/main-menu-ru-ru.json");

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
    this.handleDataRecieved = this.handleDataRecieved.bind(this);
  }

  handleDataRecieved(externalData) {
    this.setState({
      data: externalData,
    });
  }

  componentDidMount() {
    getExternalData(this.handleDataRecieved);
  }

  render() {
    const data = this.state.data ? JSON.stringify(this.state.data) : null;
    return <div className="main">{data ? data : "Nothing to say"}</div>;
  }
}
