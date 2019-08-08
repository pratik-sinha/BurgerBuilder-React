import React,{ Component } from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index'


class ContactData extends Component {
    state = {
        orderForm: {
        name: {elementType: 'input', elementConfig: {type: 'text', placeholder: 'Your Name'}, value: '', validation: {required: true}, valid: false, touched: false}, 
        street: {elementType: 'input', elementConfig: {type: 'text', placeholder: 'Street'}, value: '', validation: {required: true}, valid: false, touched: false},
        zipCode: {elementType: 'input', elementConfig: {type: 'text', placeholder: 'ZIP'}, value: '', validation: {required: true, minLength: 5 , maxLength: 5}, valid: false, touched: false},
        country:{elementType: 'input', elementConfig: {type: 'text', placeholder: 'Country'}, value: '', validation: {required: true}, valid: false, touched: false},
        email:{elementType: 'input', elementConfig: {type: 'email', placeholder: 'Your mail'}, value: '', validation: {required: true}, valid: false, touched: false},
        deliveryMethod: {elementType: 'select', elementConfig: {options: [{value: 'fastest', name: 'Fastest'},{value: 'cheapest', name: 'Cheapest'}]}, value: 'fastest',validation: {}, valid: true}
        },
        formIsValid: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        const formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }
         const order = {ingredients: this.props.ings, price: this.props.price, orderData: formData, userId: this.props.userId};
         this.props.onOrderBurger(order,this.props.token)
    }

    checkValidity = (value,rules) => {
        let isValid = true;
        if(rules.required) {
            isValid = value.trim() !== "" && isValid;
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event, inputId) => {
        const updatedOrderform = { ...this.state.orderForm};
        const updatedFormElement = {...updatedOrderform[inputId]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderform[inputId] = updatedFormElement;
        let formIsValid = true;
        for(let id in updatedOrderform) {
            formIsValid = updatedOrderform[id].valid && formIsValid;
        }
        this.setState({orderForm : updatedOrderform, formIsValid}); 
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {this.props.loading?
                <Spinner /> : 
                <form onSubmit={this.orderHandler}>
                    {formElementsArray.map(el => (
                        <Input touched={el.config.touched} shouldValidate={el.config.validation} valid={el.config.valid} changed={(event) => this.inputChangedHandler(event, el.id)} key={el.id} elementType={el.config.elementType} elementConfig={el.config.elementConfig} value={el.config.value} />
                    ))}
                        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                 </form>
                }

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData,token) => { dispatch(actions.purchaseBurger(orderData,token)) }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ContactData);