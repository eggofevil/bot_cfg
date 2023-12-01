import React from "react";

import getExternalData from "./getExternalData";
import List from "./List";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      checkedItems: [],
    };
  }

  componentDidMount() {
    getExternalData(this.handleDataRecieved);
  }

  handleDataRecieved = (externalData) => {
    this.setState({
      data: externalData,
    });
  };

  setCheckedItems = (itemId) => {
    this.setState((prevState) => {
      const newCheckedItems = prevState.checkedItems.slice();
      const itemIndex = newCheckedItems.indexOf(itemId);
      itemIndex === -1
        ? newCheckedItems.push(itemId)
        : newCheckedItems.splice(itemIndex, 1);
      return {
        checkedItems: newCheckedItems,
      };
    });
  };

  showList = () =>
    this.state.checkedItems.map((item) => (
      <p style={{ display: "inline" }}>{item + ", "}</p>
    ));

  render() {
    if (this.state.data)
      return (
        <>
          <List
            objects={this.state.data}
            parentChecked={false}
            onItemCheck={this.setCheckedItems}
            hidden={false}
          />
          <div className="show-list">
            <p>Checked items:</p>
            {this.showList()}
          </div>
        </>
      );
    else return "Данные не получены";
  }
}
