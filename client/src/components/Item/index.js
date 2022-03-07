import React from "react";

class Item extends React.Component {
    render() {
      return(
        <li>
          {this.props.val}
        </li>
      )
    }
}

export default Item;
  