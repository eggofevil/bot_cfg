import React from "react";
import jsonData from "https://static.wbstatic.net/data/main-menu-ru-ru.json";
//import data from "https://static.wbstatic.net/data/main-menu-ru-ru.json" assert { type: "json" };

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(data);
    return <div className="main">MAIN</div>;
  }
}
