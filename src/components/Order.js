import React from 'react';
import {Component} from 'react';
import {formatPrice} from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types'

class Order extends Component{
    constructor(){
        super();
        this.renderOrder = this.renderOrder.bind(this);
    }
    renderOrder(key){
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>

        if(!fish || fish.status[0] === 'unavailable'){
            return <li key={key}> Sorry, {fish ? fish.name : 'fish'} is no longer available! {removeButton}</li>
        }
        return (
            <li key={key}>
                <span>
                <CSSTransitionGroup
                    component="span"
                    className="count"
                    transitionName="count" 
                    transitionEnterTimeout={2500}
                    transitionLeaveTimeout={2500}   
                >
                    <span key={count}>{count}</span>
                </CSSTransitionGroup>
                   
                    lbs {fish.name}{removeButton}
                </span>
                <span className="price">{formatPrice(count * fish.price )}</span>
                
            </li>
        )
    }
    render(){
        const orderIds = Object.keys(this.props.order);
        //reduce prolazi korz niz i dodaje neke stvari ili samo vrati novi objekat ...
        const total = orderIds.reduce((prevTotal, key) =>{
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status[0] == 'available';

            if(isAvailable) {
                return prevTotal + (count * fish.price || 0);
            }
            return prevTotal;
        },0); // 0 pocetna vrijednost
        return(
            <div className="order-wrap">
                <h2>Your Order</h2>

                
                <CSSTransitionGroup  
                    className="order" 
                    component="ul" 
                    transitionName="order"
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={1000}>
                {orderIds.map(this.renderOrder)}
                    <li className="total">
                        <strong>Total: </strong>
                        {formatPrice(total)}
                    </li>
                </CSSTransitionGroup >

               
            </div>
        )
    }
}
Order.propTypes = {
    fishes : PropTypes.object.isRequired,
    order : PropTypes.object.isRequired,
    removeFromOrder : PropTypes.func.isRequired
};
export default Order;