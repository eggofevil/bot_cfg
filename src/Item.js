import React from "react";
import List from "./List";

export default class Item extends React.PureComponent {
  /*
  itemId
  itemName
  allChecked
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
    if (prevProps.allChecked !== this.props.allChecked) this.handleCheck();
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
    const { itemId, itemName, allChecked, onItemCheck, itemChilds, itemNum } =
      this.props;
    const { checked, listHidden } = this.state;
    const { handleCheck, handleExpand } = this;
    let expandButton = <div className="expand-placeholder"></div>;
    let listNum;
    let listKey;
    if (itemChilds) {
      expandButton = (
        <button className={"expand"} onClick={handleExpand}></button>
      );
      listNum = itemNum;
      listKey = "ls-" + listNum;
    }

    return (
      <li>
        {expandButton}
        <input
          className="check item"
          type="checkbox"
          checked={checked}
          onChange={handleCheck}
          id={"chbx-" + itemNum}
        />
        <div className="info">{itemName + " (ID:" + itemId + ")"}</div>
        {itemChilds && (
          <List
            objects={itemChilds}
            allChecked={allChecked}
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
