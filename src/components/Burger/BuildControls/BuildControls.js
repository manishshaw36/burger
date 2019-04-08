import React from 'react';

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>The Current price is <span className={classes.totalPrice}>RS {props.price.toFixed(2)} /-</span></p>
        {controls.map((ctrl) => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label} 
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)} 
                disabled = {props.disabled[ctrl.type]} 
                itemPrice = {props.itemPrice[ctrl.type]}    
            />
        ))}
        <button 
        className={classes.OrderButton} 
        disabled={!props.purchasable} onClick={props.purchasing}>ORDER NOW</button>
    </div>

);

export default buildControls
// itemPrice = {props.itemPrice[ctrl.type]} 