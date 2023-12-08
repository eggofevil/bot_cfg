import React from "react";
import List from "./List";

export default class Item extends React.PureComponent {
  /*
  itemId
  itemName
  checkChilds
  onItemCheck
  itemChilds
  itemNum
  */
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      listHidden: true,
    };
  }

  componentDidUpdate(prevProps) {
    const { checkChilds } = this.props;
    const { checked } = this.state;
    if (prevProps.checkChilds !== checkChilds && checkChilds !== checked)
      this.handleCheck();
  }

  handleCheck = () => {
    const { onItemCheck, itemId } = this.props;
    const { checked } = this.state;
    this.setState({ checked: !checked }, () => onItemCheck(itemId));
  };

  handleExpand = () => {
    this.setState({ listHidden: !this.state.listHidden });
  };

  render() {
    const { itemId, itemName, checkChilds, onItemCheck, itemChilds, itemNum } =
      this.props;
    const { checked, listHidden } = this.state;
    const { handleCheck, handleExpand } = this;
    let chbxExpand;
    let listNum;
    let listKey;
    if (itemChilds) {
      listNum = itemNum;
      listKey = "ls-" + listNum;
      chbxExpand = (
        <input
          className="chbx-expand custom"
          type="checkbox"
          name="expand list"
          checked={!listHidden}
          onChange={handleExpand}
        />
      );
    }

    return (
      <li>
        <span className="chbx-wrapper">{itemChilds && chbxExpand}</span>
        <span className="chbx-wrapper">
          <input
            className="chbx-check custom"
            type="checkbox"
            name="check item"
            checked={checked}
            onChange={handleCheck}
            id={"chbx-" + itemNum}
          />
        </span>
        {itemName + " (ID:" + itemId + ")"}
        {itemChilds && (
          <List
            objects={itemChilds}
            checkChilds={checkChilds}
            hidden={listHidden}
            onItemCheck={onItemCheck}
            listNum={listNum}
            key={listKey}
          />
        )}
      </li>
    );
  }
}
