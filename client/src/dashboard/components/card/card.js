import React from 'react';
import './card.css'

class Card extends React.Component {

  render() {
    return (
      <div id={this.props.id} className={'card ' + this.props.className}>
        {this.props.cardContent}
      </div>
    );
  };
}

export default Card;
