import React from "react";
import List from "./List";

export default class Item extends React.Component {
  /*
  itemId
  itemName
  parentChecked
  onItemCheck
  itemChilds    
  
  //key={itemNumber}
  //itemNumber={itemNumber}
  //itemChecked={checked}
  */
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.parentChecked,
      listHidden: true,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.parentChecked !== prevProps.parentChecked &&
      this.props.parentChecked !== this.state.checked
    ) {
      console.log("мне бы поменять стейт");
      this.handleChange();
    }
  }

  handleChange = () => {
    const { onItemCheck, itemId } = this.props;
    this.setState(
      {
        checked: !this.state.checked,
      },
      () => onItemCheck(itemId)
    );
  };

  handleExpandClick = () => {
    this.setState({ listHidden: !this.state.listHidden });
  };

  render() {
    const { itemId, itemName, onItemCheck, itemChilds } = this.props;
    const { checked, listHidden } = this.state;

    const expandButton = itemChilds ? (
      <button className={"expand"} onClick={this.handleExpandClick}>
        +
      </button>
    ) : (
      <div className="expand-placeholder"></div>
    );
    return (
      <li>
        {expandButton}
        <input
          className="checkbox"
          type="checkbox"
          checked={checked}
          onChange={this.handleChange}
        />
        <div className="info">{itemName + " (ID:" + itemId + ")"}</div>
        {itemChilds && (
          <List
            objects={itemChilds}
            parentChecked={checked}
            onItemCheck={onItemCheck}
            hidden={listHidden}
          />
        )}
      </li>
    );
  }
}
