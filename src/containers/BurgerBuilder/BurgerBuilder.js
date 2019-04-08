import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'; 
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler'

const INGREDIENT_PRICES = {
    'salad': 15,
    'cheese': 20,
    'meat': 50,
    'bacon': 30
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 49,
        purchasable: false,
        purchasing: false,
        ingredientsOrder: [],
        loading: false,
        error: false
    }
    componentDidMount(){
        axios.get('https://burger-builder-36.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({ error: true })
            })
    }
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            },0);
        this.setState({purchasable: sum > 0});
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        const tempOrder = [...this.state.ingredientsOrder];
        tempOrder.unshift(type);
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients, ingredientsOrder: tempOrder });
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        console.log(oldCount);
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        const tempOrder = [...this.state.ingredientsOrder];
        tempOrder.splice(tempOrder.indexOf(type),1)
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients, ingredientsOrder: tempOrder});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert("You continue your purchasing!");
        // this.setState({purchasing: false});
        this.setState({ loading: true });
        const order = {
            ingredientsOrder: this.state.ingredientsOrder,
            price: this.state.totalPrice,
            customer: {
                name: 'Manish Shaw',
                address: {
                    street: "Teststreet 1",
                    zipCode: "756019",
                    country: 'India'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({ loading: false, purchasing: false });
            console.log(response);
        })
        .catch(error => {
            this.setState({ loading: false, purchasing: false });
            console.log(error);
        });
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
        if (this.state.ingredients){
            burger = (
            <Aux>
                <Burger 
                    ingredients={this.state.ingredients}
                    ingredientsOrder={this.state.ingredientsOrder}
                />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler} 
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    purchasing={this.purchaseHandler}
                    price={this.state.totalPrice} 
                    itemPrice={INGREDIENT_PRICES}    
                />
            </Aux>);
            orderSummary = (
                <OrderSummary 
                    ingredients = {this.state.ingredients} 
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler} 
                    totalPrice={this.state.totalPrice}
                />
            );
        }

        if(this.state.loading) {
            orderSummary = <Spinner />
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
};

export default withErrorHandler(BurgerBuilder, axios);