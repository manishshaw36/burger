import React, {Component} from 'react'

import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toobar/Toolbar';
import SlideDrawer from '../Navigation/SlideDrawer/SlideDrawer'

class Layout extends Component {
    state = {
        showSlideDrawer: false,
    }
    slideDrawerClosed = () => {
        this.setState({showSlideDrawer:false});
    }
    slideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSlideDrawer: !prevState.showSlideDrawer};
        })
    }
    render () {
        return(
            <Aux>
                <Toolbar drawerToggleClicked={this.slideDrawerToggleHandler}></Toolbar>
                <SlideDrawer 
                open={this.state.showSlideDrawer}
                closed={this.slideDrawerClosed} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;