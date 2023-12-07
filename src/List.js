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
      checked: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { checkChilds } = this.props;
    const { checked } = this.state;
    if (prevProps.checkChilds !== checkChilds && checkChilds !== checked)
      this.handleCheck();
  }

  handleCheck = () => {
    this.setState({ checked: !this.state.checked });
  };

  render() {
    const { objects, onItemCheck, hidden, listNum } = this.props;
    const { checked } = this.state;
    const { handleCheck } = this;

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
          checkChilds={checked}
          onItemCheck={onItemCheck}
          itemChilds={childs}
          itemNum={itemNum}
          key={itemKey}
        />
      );
    });
    return (
      <section className={sectionClassName}>
        <span className="list control-wrapper">
          <input
            className="chbx custom check-list"
            type="checkbox"
            checked={checked}
            onChange={handleCheck}
            id={"list-chbx-" + listNum}
          />
        </span>
        <span>выделить все</span>
        <ul className="list-items">{list}</ul>
      </section>
    );
  }
}
