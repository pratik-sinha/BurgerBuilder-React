import * as actionTypes from '../actions/actionsTypes';

const initalState = {
    orders:[],
    loading: false,
    purchased: false
}

const reducer = (state = initalState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat({...action.orderData, id: action.orderId  })
            };
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            }
        default:
            return state
    }
}

export default reducer;