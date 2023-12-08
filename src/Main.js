import React from "react";

import getExternalData from "./getExternalData";
import List from "./List";
import Result from "./Result";

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

  showResult = () =>
    this.state.checkedItems.map((item, index) => (
      <p style={{ display: "inline" }} key={"id-" + index}>
        {item + ", "}
      </p>
    ));

  handleSubmit = (showFinal) => {
    const { data, checkedItems } = this.state;
    changeChecked = (array) =>
      array.map((item) => {
        if (item.childs) item.childs = changeChecked(item.childs);
        if (checkedItems.indexOf(item.id) > -1) item.checked = true;
        return item;
      });
    const createResultJSON = changeChecked(data.slice());
    showFinal(result);
  };

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
            key={listKey}
          />
          <div>
            <p>Выделенные категории:</p>
            {this.showResult()}
          </div>
          <Result
            data={this.state.data}
            checkedItems={this.state.checkedItems}
          />
        </>
      );
    } else return "Данные не получены";
  }
}
