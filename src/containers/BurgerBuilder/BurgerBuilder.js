import React , {Component} from 'react';
import {connect} from 'react-redux';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as burgerBuilderActions from '../../store/actions/index';


class BurgerBuilder extends Component {
     state = {
         purchasable: false,
         purchasing: false
     }

     componentDidMount() {
        this.props.onInitIngredients();
     }


     updatePurchaseState = (ingredients) => {
         const sum = Object.keys(ingredients).map((igKey) => {
             return ingredients[igKey]
         }).reduce((sum, el) =>{ return sum + el},0);
         return sum > 0;
     }

     purchaseHandler = () => {
         if(this.props.isAuth) {
            this.setState({purchasing: true})
         } else {
             this.props.onSetAuthRedirectPath('/checkout');
             this.props.history.push('/auth');
         }
     }

     purchaseCancelHandler = () => {
         this.setState({purchasing: false});
     }
 
     purchaseContinueHandler = () => {
         this.props.onInitPurchase();
         this.props.history.push({pathname:'/checkout'});
     }
     
     render() {
         const disabledInfo ={ ...this.props.ings};
         for (let key in disabledInfo) {
             disabledInfo[key] = disabledInfo[key] <= 0;
         }
         return (
<<<<<<< HEAD
             <React.Fragment>
=======
             <Aux>
>>>>>>> 5aa2ab2fc6342d03f67dccfa9e477258207dd60a
                 <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}> 
                 {!this.props.ings? <Spinner/>:
                 <OrderSummary price={this.props.price} purchaseCancelled={this.purchaseCancelHandler} purchaseContinued={this.purchaseContinueHandler} ingredients={this.props.ings} />
                 }
                 </Modal>
                 {this.props.ings ? 
<<<<<<< HEAD
                 <div>
                 <Burger ingredients={this.props.ings} />
                 <BuildControls isAuth={this.props.isAuth} ordered={this.purchaseHandler} purchasable={this.updatePurchaseState(this.props.ings)} price={this.props.price} disabled={disabledInfo} ingredientAdded ={this.props.onIngredientAdded} ingredientRemoved={this.props.onIngredientRemoved} />
                 </div>
                 : <Spinner />
                 }
            </React.Fragment>
=======
                 <Aux>
                 <Burger ingredients={this.props.ings} />
                 <BuildControls isAuth={this.props.isAuth} ordered={this.purchaseHandler} purchasable={this.updatePurchaseState(this.props.ings)} price={this.props.price} disabled={disabledInfo} ingredientAdded ={this.props.onIngredientAdded} ingredientRemoved={this.props.onIngredientRemoved} />
                 </Aux>
                 : <Spinner />
                 }
            </Aux>
>>>>>>> 5aa2ab2fc6342d03f67dccfa9e477258207dd60a
         );
     }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded:  (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved:  (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => {dispatch( burgerBuilderActions.purchaseInit())},
        onSetAuthRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);