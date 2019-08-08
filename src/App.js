import React, { Component } from 'react';
import {Route,Switch, withRouter, Redirect} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index'
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent';

const asyncCheckout = React.lazy(() => 
 import('./containers/Checkout/Checkout')
)

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
})

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
})

class App extends Component {

   componentDidMount() {
     this.props.onTryAutoSignUp()
   }
 
  render() {
    let routes = (
           <Switch>
              <Route path="/auth" component={asyncAuth}/>
              <Route path="/" exact component={BurgerBuilder}/>
              <Redirect to="/" />
          </Switch>
    );
    if(this.props.isAuth) {
      routes =  (<Switch>
                    <Route path="/orders" component = {asyncOrders} />
                    <Route path="/checkout" component={asyncCheckout}/>
                    <Route path="/auth" component={asyncAuth}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/" exact component={BurgerBuilder}/>
                    <Redirect to="/" />
                 </Switch>)
    }
    return (
      <div>
      <Layout>
        {routes}
      </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(App));