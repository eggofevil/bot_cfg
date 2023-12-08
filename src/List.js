import React from "react";

import Item from "./Item";

export default class List extends React.Component {
  /*
  objects
  onItemCheck
  hidden
  listNum
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

    const sectionClassName = hidden ? "hidden" + " items" : "items";
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
        <span className="chbx-wrapper">
          <input
            className="chbx-check custom"
            type="checkbox"
            checked={checked}
            onChange={handleCheck}
            id={"ls-chbx-" + listNum}
          />
        </span>
        <span className="check-all">выделить все</span>
        <ul>{list}</ul>
      </section>
    );
  }
}
