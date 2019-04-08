import React from 'react';

import classes from './SlideDrawer.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const slideDrawer = (props) => {
    let attachedClasses =  classes.Close;
    if(props.open){
        attachedClasses =  classes.Open;
    }
    return (
        <Aux>
            <BackDrop  show={props.open} clicked={props.closed}/>
            <div className={[classes.SlideDrawer, attachedClasses].join(" ")}>
                <Logo height='10%'/>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    )
};

export default slideDrawer;