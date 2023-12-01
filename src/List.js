import React from "react";

import Item from "./Item";

export default class List extends React.Component {
  /*
  objects - список объектов для формирования листа
  parentChecked - передаем ниже - состояние чекбокса верхнего Item для настройки состояния нижних
  onItemCheck - передаем ниже - что делать в Item при нажатии на чекбокс 
  hidden - состояние листа - спрятан или нет
  */

  constructor(props) {
    super(props);
  }

  render() {
    const { objects, onItemCheck, parentChecked } = this.props;
    const ulClassName = this.props.hidden ? "childs hidden" : "childs";
    const list = objects.map((object, index) => {
      const id = object.id;
      const name = object.name;
      const childs = object.childs;
      return (
        <Item
          itemId={id}
          itemName={name}
          parentChecked={parentChecked}
          onItemCheck={onItemCheck}
          itemChilds={childs}
        />
      );
    });
    return <ul className={ulClassName}>{list}</ul>;
  }
}
