import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import RestaurantService from '../../services/RestaurantService';
import { BiPen } from 'react-icons/bi';
import Search from '../Search';
import Loading from '../Loading';

const ListRestaurants = () => {

    const [restaurants, setRestaurants] = useState([]);
    const [currentRestaurant, setCurrentRestaurant] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchRestaurant, setSearchRestaurant] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(
        () => { getAllRestaurants(); }, []
    );

    const getAllRestaurants = () => {
        console.log("Récupération de la liste des restaurants");
        RestaurantService.getAllRestaurants()
            .then(response => {
                console.log(response.data);
                setRestaurants(response.data);
                setIsLoading(false);
            })
            .catch(e => { console.log(e) });
    };

    const setActiveRestaurant = (restaurant, index) => {
        setCurrentRestaurant(restaurant);
        setCurrentIndex(index);
    };

    const searchHandler = (value) => {
        setSearchRestaurant(value);
    };

    let updateListRestaurants = restaurants.filter(
        (restaurant) => { return restaurant.nameRestaurant.includes(searchRestaurant); }
    );

    if (isLoading) {
        return <Loading />;
    } else {
        if (restaurants.length === 0) {
            return (
                <React.Fragment>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <p className="font-weight-bold font-italic">Aucun restaurant dans le catalogue ...</p>
                            <p className="font-weight-bold font-italic">Cliquez <NavLink to="/add-restaurant">ici</NavLink> pour en ajouter ...</p>
                        </div>
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <Search searchHandler={searchHandler} />

                    <div className="row justify-content-center">
                        <div className="col-md-6 mb-5">
                            <ul className="list-group">
                                {
                                    /*restaurants && restaurants.map(*/
                                    updateListRestaurants && updateListRestaurants.map(
                                        (restaurant, index) => (
                                            <li
                                                key={index}
                                                className={"list-group-item " + (index === currentIndex ? "active" : "")}
                                                onClick={() => setActiveRestaurant(restaurant, index)}
                                            >
                                                {restaurant.nameRestaurant}
                                            </li>
                                        )
                                    )
                                }
                            </ul>
                        </div>
                        {currentRestaurant ? (
                            <div className="col-md-6">
                                <div>
                                    <label>
                                        <strong>Nom du restaurant:</strong>
                                    </label>
                                    {" "} {currentRestaurant.nameRestaurant}
                                </div>
                                <div>
                                    <label>
                                        <strong>Adresse du restaurant:</strong>
                                    </label>
                                    {" "} {currentRestaurant.addressRestaurant}
                                </div>
                                <div>
                                    <label>
                                        <strong>Téléphone du restaurant:</strong>
                                    </label>
                                    {" "} {currentRestaurant.phoneRestaurant}
                                </div>
                                <NavLink exact to={"/restaurants/" + currentRestaurant.id} className="btn btn-warning text-white"><BiPen /> Mette à jour</NavLink>
                            </div>
                        ) : (
                                <div className="col-md-6">
                                    <p className="font-weight-bold font-italic">Sélectionnez un restaurant ...</p>
                                </div>
                            )}
                    </div>
                </React.Fragment>
            );
        }
    }

}

export default ListRestaurants;