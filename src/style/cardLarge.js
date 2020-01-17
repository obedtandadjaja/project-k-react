import React , { Component } from 'react';
import { Link } from 'react-router-dom'


class CardLarge extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className='dashCardMenu' style={{backgroundColor: this.props.color}}>
              <Link to={{ pathname: this.props.to }} style={this.style}>
                <div className='case'>
                  <div className='header'>
                    <h1>{this.props.header}</h1>
                  </div>
                  <div className='body'>
                    <p>{this.props.body}</p>
                  </div>
                </div>
              </Link>
            </div>
        )
    }

}

export default CardLarge;