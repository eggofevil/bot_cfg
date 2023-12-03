import React from "react";

import Item from "./Item";

export default class List extends React.Component {
  /*
  objects - список объектов для формирования листа
  checked - принимаем значение если вышестоящий лист был выбран
  hidden - состояние листа - спрятан или нет
  onItemCheck - передаем ниже - что делать в Item при нажатии на чекбокс
  */

  constructor(props) {
    super(props);
    this.state = {
      allChecked: false,
    };
  }

  componentDidUpdate(prevProps) {
    this.props.allChecked !== prevProps.allChecked ? this.handleCheck() : null;
  }

  handleCheck = () => {
    this.setState({ allChecked: !this.state.allChecked });
  };

  render() {
    const { objects, onItemCheck, hidden, listNum } = this.props;
    const { allChecked } = this.state;

    const sectionClassName = hidden ? "childs hidden" : "childs";
    const list = objects.map((object, index) => {
      const id = object.id;
      const name = object.name;
      const childs = object.childs;
      const itemNum = listNum + "-" + index;
      const itemKey = "item-" + itemNum;
      return (
        <Item
          itemId={id}
          itemName={name}
          allChecked={allChecked}
          onItemCheck={onItemCheck}
          itemChilds={childs}
          itemNum={itemNum}
          key={itemKey}
        />
      );
    });
    return (
      <section className={sectionClassName}>
        <input
          className="check all"
          type="checkbox"
          checked={this.state.allChecked}
          onChange={this.handleCheck}
          id={"list-chbx-" + listNum}
        />
        <p className={"childs-text"}>выделить все</p>
        <ul>{list}</ul>
      </section>
    );
  }
}
