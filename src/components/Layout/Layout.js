import React , {Component} from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawOpenHandler = () => {
        this.setState({showSideDrawer: true});
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }


    render() {
        return (
            <Aux>
            <Toolbar opened={this.sideDrawOpenHandler} isAuth={this.props.isAuth} />
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} isAuth={this.props.isAuth} />
            <main className={classes.Content}>
                {this.props.children}
            </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);