import React, {Component} from 'react'

import classes from './Burger.css';
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient'

class Burger extends Component{
    
    render(){
        let transformedIngredients = this.props.ingredientsOrder.map((key, i) => {
            return (<BurgerIngredient key={i} type={key} />);
        });
        console.log(transformedIngredients)
        console.log(this.props.ingredientsOrder)
        
        if (transformedIngredients.length === 0){
            transformedIngredients = <p>Please start adding ingredients!</p>
        }
        return (
            <div className = {classes.Burger}>
                <BurgerIngredient type="bread-top"/>
                {transformedIngredients}
                <BurgerIngredient type="bread-bottom"/>
            </div>
        );
    }
    
    
}

export default Burger;