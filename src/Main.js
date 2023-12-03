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
    this.state.checkedItems.map((item, index) => (
      <p style={{ display: "inline" }} key={"id-" + index}>
        {item + ", "}
      </p>
    ));

  render() {
    if (this.state.data) {
      const listNum = 0;
      const listKey = "ls-" + listNum;
      return (
        <>
          <List
            objects={this.state.data}
            onItemCheck={this.setCheckedItems}
            hidden={false}
            listNum={listNum}
            key={listNum}
          />
          <div className="show-list">
            <p>Выделенные категории:</p>
            {this.showList()}
          </div>
        </>
      );
    } else return "Данные не получены";
  }
}
