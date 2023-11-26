import React from "react";
import getExternalData from "./externalData";

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
    const data = this.state.data;
    let main = <div className="main">"Nothing to say"</div>;
    if (data) {
      function createList(objects) {
        const list = objects.map((object) => {
          return (
            <li>
              <p>"ID": {object.id}</p>
              <p>"NAME": {object.name}</p>
              {object.childs ? createList(object.childs) : null}
            </li>
          );
        });
        return <ul>{list}</ul>;
      }
      main = <div className="main">{createList(data)}</div>;
    }

    return main;
  }
}
