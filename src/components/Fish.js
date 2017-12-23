import React from 'react'
import {Component} from 'react'
import {formatPrice} from '../helpers'
import PropTypes from 'prop-types'
class Fish extends Component {
    render(){
        const {details, index} = this.props
        const isAvailable = details.status[0] === 'available';
        const buttonText =  isAvailable ? 'Add to order' : 'Sold out!';
        
        return(
            <li className="menu-fish">
            <img src={details.image} alt={details.name}/>
            <h3 className="fish-name">
                {details.name}
                <span className="price">{formatPrice(details.price)}</span>
            </h3>
            <p>{details.desc}</p>
            <button disabled={!isAvailable} onClick={() => this.props.addToOrder(index)}>{buttonText}</button>

            </li>
        )
    }
}
Fish.propTypes = {
    details : PropTypes.object.isRequired,
    index : PropTypes.string.isRequired,
    addToOrder : PropTypes.func.isRequired


}
export default Fish;


