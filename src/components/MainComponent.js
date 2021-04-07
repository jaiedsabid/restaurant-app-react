import React, { Component } from 'react';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import { DISHES } from '../shared/Dishes';
import DishDetail from './DishdetailComponent';
import Footer from './FooterComponent';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null,
        };
    }

    onSelectDish = dishId => {
        this.setState({selectedDish: dishId})
    };

    render() {
        return (
            <div className="">
                <Header />
                <Menu dishes={this.state.dishes}
                      onClick={(dishId) => this.onSelectDish(dishId)}
                />
                <DishDetail dish={this.state.dishes.filter(dish => dish.id === this.state.selectedDish)[0]}/>
                <Footer />
            </div>
        );
    }

}

export default Main;
