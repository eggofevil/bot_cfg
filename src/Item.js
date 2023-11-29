import React from "react";

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemChecked: false,
      childsHidden: true,
    };
  }

  handleCheckBoxChange = () => {
    this.setState(
      {
        itemChecked: !this.state.itemChecked,
      },
      () => this.props.onItemCheck(this.props.itemId)
    );
  };

  handleExpandClick = () => {
    this.setState({ childsHidden: !this.state.childsHidden });
  };

  render() {
    const { itemId, itemName, itemChilds, itemNumber } = this.props;
    let expandButton = itemChilds ? (
      <button className={"expand"} onClick={this.handleExpandClick}>
        +
      </button>
    ) : (
      <div className="expand-placeholder"></div>
    );
    return (
      <li>
        <div className="info">
          {expandButton}
          <input
            id={"chbx-" + itemNumber}
            className="checkbox"
            type="checkbox"
            checked={this.state.itemChecked}
            onChange={this.handleCheckBoxChange}
          />
          {itemName} : {itemId}
        </div>
        {itemChilds ? (
          <ul className={this.state.childsHidden ? "childs hidden" : "childs"}>
            {itemChilds}
          </ul>
        ) : null}
      </li>
    );
  }
}
