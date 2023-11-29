import React from "react";

import Item from "./Item";
import getExternalData from "./getExternalData";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      checkedItems: [],
    };
    this.handleDataRecieved = this.handleDataRecieved.bind(this);
    this.handleItemCheck = this.handleItemCheck.bind(this);
  }

  handleDataRecieved(externalData) {
    this.setState({
      data: externalData,
    });
  }
  handleItemCheck(itemId) {
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
  }

  componentDidMount() {
    getExternalData(this.handleDataRecieved);
  }

  render() {
    function createList(id = "main", objects, handleItemCheck, parentNumber) {
      const Items = objects.map((object, index) => {
        const itemNumber = parentNumber + (parentNumber ? "-" : "") + index;
        const id = object.id;
        const name = object.name;
        const childs = object.childs
          ? createList(id, object.childs, handleItemCheck, itemNumber)
          : null;
        return (
          <Item
            key={itemNumber}
            itemNumber={itemNumber}
            itemId={id}
            itemName={name}
            onItemCheck={handleItemCheck}
            itemChilds={childs}
          />
        );
      });
      return Items;
    }

    return (
      <div className="main">
        {this.state.data ? (
          <ul>
            {createList("main", this.state.data, this.handleItemCheck, "")}
          </ul>
        ) : (
          "Данные не получены"
        )}
      </div>
    );
  }
}
