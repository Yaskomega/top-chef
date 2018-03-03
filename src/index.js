import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import restaurants from './restaurants.js';
//var lafourchette = require('lafourchette');

//console.log(restaurants);

function search_restaurant(name, restaurants){
    var result = [];
    restaurants.forEach(function(restaurant) {
        if(restaurant.name.includes(name)){
            result.push(restaurant);
        }
    });
    return result;
}


class Restaurant extends React.Component{
    render() {
        return (
            <div className="row">
                <div className="col-md-3">{this.props.name}</div>
                <div className="col-md-1">{this.props.stars}</div>
                <div className="col-md-3">{this.props.street}</div>
                <div className="col-md-2">{this.props.postalCode}</div>
                <div className="col-md-3">{this.props.locality}</div>
            </div>
        );
    }
}

class RestaurantsResultTable extends React.Component {
    constructor(props) {
        super(props);
        //this.state = {};

        this.handleClickRestaurant = this.handleClickRestaurant.bind(this);
    }

    handleClickRestaurant(name) {
        //this.setState({});
        //console.log(event);
        //var deals = lafourchette.getDeals(name);
        //console.log(deals);
        //console.log(event.target.name);
    }

    render() {
        const rows = [];
        var index = 0;
        this.props.restaurants.forEach((restaurant) => {
            rows.push(
                <Restaurant
                    key={index}
                    name={restaurant.name}
                    stars={restaurant.stars}
                    street={restaurant.street}
                    postalCode={restaurant.postalCode}
                    locality={restaurant.locality}
                    onClick={this.handleClickRestaurant(restaurant.name)}
                />
            );
            index++;
        });

        return (
            <div>
                {rows}
            </div>
        );
    }
}

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            stars: []
        };

        //this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeRestaurantName = this.handleChangeRestaurantName.bind(this);
    }

    handleChangeRestaurantName(event) {
        this.setState({
            name: event.target.value,
            stars : this.state.stars
        });
        //console.log(this.state);
    }

    handleChangeStars(event) {
        this.setState({
            name: this.state.name,
            stars: event.target.value
        });
    }


    handleSubmit(event) {
        //alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();

        // Searching for restaurants ...
        var result = search_restaurant(this.state.name, restaurants);
        //console.log(result);

        const element = <RestaurantsResultTable restaurants={result}/>
        ReactDOM.render(element, document.getElementById('search_result'));
    }

    render() {
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <fieldset>

                <div className="form-group">
                    <label className="col-md-4 control-label" htmlFor="restaurant_name">Restaurant Name</label>
                    <div className="col-md-4">
                        <input id="restaurant_name" name="restaurant_name" placeholder="Name of the wanted restaurant" className="form-control input-md" type="text" onInput={this.handleChangeRestaurantName}/>
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-md-4 control-label" htmlFor="stars">Number of stars</label>
                    <div className="col-md-4">
                        <label className="checkbox-inline" htmlFor="stars-1">
                            <input name="stars" id="stars-1" value="1" type="checkbox"/>
                                1
                        </label>
                        <label className="checkbox-inline" htmlFor="stars-2">
                            <input name="stars" id="stars-2" value="2" type="checkbox"/>
                                2
                        </label>
                        <label className="checkbox-inline" htmlFor="stars-3">
                            <input name="stars" id="stars-3" value="3" type="checkbox"/>
                                3
                        </label>
                    </div>
                </div>
                <input className="btn btn-primary" type="submit" value="Submit" />
                </fieldset>
            </form>
        );
    }
}



class App extends React.Component {
    //<ProductTable products={this.props.products} />
    render() {
        return (
            <div>
                <SearchForm/>
            </div>
        );
    }
}

ReactDOM.render(
    <App restaurants={restaurants} />,
    document.getElementById('container')
);
