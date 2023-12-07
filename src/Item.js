import React from "react";
import List from "./List";

export default class Item extends React.PureComponent {
  /*
  itemId
  itemName
  checkChilds
  onItemCheck
  itemChilds    
  
  //key={itemNumber}
  //itemNumber={itemNumber}
  //itemChecked={checked}
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
          className="chbx-expand custom expand-list"
          type="checkbox"
          name="expand list"
          checked={!listHidden}
          onChange={handleExpand}
        />
      );
    }

    return (
      <li>
        <span className="control-wrapper">{itemChilds && chbxExpand}</span>
        <span className="control-wrapper">
          <input
            className="chbx custom check-item"
            type="checkbox"
            name="check item"
            checked={checked}
            onChange={handleCheck}
            id={"chbx-" + itemNum}
          />
        </span>
        <span className="item-info">{itemName + " (ID:" + itemId + ")"}</span>
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
