import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                {this.props.ings? !this.props.purchased? <CheckoutSummary checkoutCancelled= {this.checkoutCancelledHandler} checkoutContinued = {this.checkoutContinuedHandler} ingredients = {this.props.ings} /> :<Redirect to='/'/> : <Redirect to='/'/> }           
             <Route path={this.props.match.path+ '/contact-data'} component = {ContactData}/>
            </div>
            )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}



export default connect (mapStateToProps)(Checkout);