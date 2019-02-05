import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName,
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-835ce.firebaseio.com/ingredients.json')
        .then(response => dispatch(setIngredients(response.data)) )
        return dispatch
    }

}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients
    }
}