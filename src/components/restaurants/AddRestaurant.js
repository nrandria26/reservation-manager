import React, { useEffect, useState } from 'react';
import { FcShop } from "react-icons/fc";
import { FaUndo, FaHome, FaSignOutAlt } from 'react-icons/fa';
import RestaurantService from '../../services/RestaurantService';
import { NavLink } from 'react-router-dom';
import Loading from '../Loading';

const AddRestaurant = () => {

    const initialRestaurantState = {
        nameRestaurant: '',
        addressRestaurant: '',
        phoneRestaurant: ''
    };
    const [restaurant, setRestaurant] = useState(initialRestaurantState);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(
        () => { MountAddRestaurant(); }, []
    );

    const MountAddRestaurant = () => {
        console.log("Ajout d'un restaurant dans le catalogue");
        setIsLoading(true);
        setTimeout(() => { setIsLoading(false); }, 500);
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setRestaurant({ ...restaurant, [name]: value });
    };

    const handleSubmit = e => {
        if (e) e.preventDefault();
        createRestaurant();
    };

    const createRestaurant = () => {
        const data = {
            nameRestaurant: restaurant.nameRestaurant,
            addressRestaurant: restaurant.addressRestaurant,
            phoneRestaurant: restaurant.phoneRestaurant
        };

        RestaurantService.createRestaurant(data)
            .then(response => {
                setRestaurant({
                    nameRestaurant: response.data.nameRestaurant,
                    addressRestaurant: response.data.addressRestaurant,
                    phoneRestaurant: response.data.phoneRestaurant
                });
                setIsSubmitted(true);
                console.log(response.data);
            })
            .catch(e => { console.log(e); });
    };

    const newCreateRestaurant = () => {
        setRestaurant(initialRestaurantState);
        setIsSubmitted(false);
        setIsLoading(true);
        setTimeout(() => { setIsLoading(false); }, 500);
    };

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <React.Fragment>
                <div className="row justify-content-center">
                    <div className="col-md-auto mb-5">
                        {isSubmitted ? (
                            <div className="card border-primary">
                                <div className="card-body text-center">
                                    <h5>Le restaurant a bien été ajouté dans le catalogue</h5>
                                    <button className="btn btn-success" onClick={newCreateRestaurant}><FaHome /> Créer</button>
                                    <NavLink to="/restaurants"><button className="btn btn-dark" style={{ marginLeft: 10 }}><FaSignOutAlt /> Retour</button></NavLink>
                                </div>
                            </div>
                        ) : (
                                <div className="card border-primary">
                                    <div className="card-header text-center text-white bg-primary border-primary">
                                        <h4><span><FcShop size={50} /></span> Ajout d'un restaurant</h4>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label>Nom du restaurant:</label>
                                                <input type="text" name="nameRestaurant" className="form-control" value={restaurant.nameRestaurant} onChange={handleInputChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label>Adresse du restaurant:</label>
                                                <input type="text" name="addressRestaurant" className="form-control" value={restaurant.addressRestaurant} onChange={handleInputChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label>Téléphone:</label>
                                                <input type="text" name="phoneRestaurant" className="form-control" value={restaurant.phoneRestaurant} onChange={handleInputChange} required pattern="^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$" />
                                            </div>

                                            <div className="text-center">
                                                <button type="submit" className="btn btn-success"><FaHome /> Ajouter</button>
                                                <button type="button" className="btn btn-dark" style={{ marginLeft: 10 }} onClick={newCreateRestaurant}><FaUndo /> Effacer</button>
                                                <NavLink to="/restaurants"><button type="button" className="btn btn-danger" style={{ marginLeft: 10 }}><FaSignOutAlt /> Annuler</button></NavLink>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AddRestaurant;