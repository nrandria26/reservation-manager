import React, { useState, useEffect } from 'react';
import RestaurantService from '../../services/RestaurantService';
import { FaTrashAlt, FaSave, FaSignOutAlt } from 'react-icons/fa';
import { FcShop } from "react-icons/fc";
import { BsXOctagon } from 'react-icons/bs';
import Loading from '../Loading';

const DetailRestaurant = (props) => {

    const initialRestaurantState = {
        nameRestaurant: '',
        addressRestaurant: '',
        phoneRestaurant: ''
    };
    const [currentRestaurant, setCurrentRestaurant] = useState(initialRestaurantState);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const getRestaurantById = id => {
        console.log("Récupération du restaurant par son id");
        RestaurantService.getRestaurantById(id)
            .then(response => {
                console.log(response.data);
                setCurrentRestaurant(response.data);
                setIsLoading(false);
            })
            .catch(e => { console.log(e); });
    };

    useEffect(
        () => { getRestaurantById(props.match.params.id) }, [props.match.params.id]
    );

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentRestaurant({ ...currentRestaurant, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        updateCurrentRestaurant();
    }

    const updateCurrentRestaurant = () => {
        RestaurantService.updateRestaurant(currentRestaurant.id, currentRestaurant)
            .then(response => {
                console.log(response.data);
                setMessage("La fiche restaurant a été mise à jour");
            })
            .catch(e => { console.log(e); });
    };

    const deleteRestaurant = () => {
        RestaurantService.deleteRestaurantById(currentRestaurant.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/restaurants");
            })
            .catch(e => { console.log(e); });
    };

    const cancelMaj = () => {
        props.history.push("/restaurants");
    };

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <React.Fragment>
                <div className="row justify-content-center">
                    <div className="col-md-auto mb-5">
                        {currentRestaurant ? (
                            <div className="card border-primary">
                                <div className="card-header text-center text-white bg-primary border-primary">
                                    <h4><span><FcShop size={50} /></span> Modification de la fiche restaurant</h4>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label>Nom du restaurant:</label>
                                            <input type="text" name="nameRestaurant" className="form-control" value={currentRestaurant.nameRestaurant} onChange={handleInputChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label>Adresse du restaurant:</label>
                                            <input type="text" name="addressRestaurant" className="form-control" value={currentRestaurant.addressRestaurant} onChange={handleInputChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label>Téléphone:</label>
                                            <input type="text" name="phoneRestaurant" className="form-control" value={currentRestaurant.phoneRestaurant} onChange={handleInputChange} required pattern="^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$" />
                                        </div>

                                        <div className="text-center">
                                            <button type="submit" className="btn btn-warning text-white"><FaSave /> Sauvegarder</button>
                                            <button type="button" className="btn btn-danger" style={{ marginLeft: 10 }} onClick={deleteRestaurant}><FaTrashAlt /> Supprimer</button>
                                            <button type="button" className="btn btn-dark" style={{ marginLeft: 10 }} onClick={cancelMaj}>{message ? <FaSignOutAlt /> : <BsXOctagon />}{" "}{message ? 'Retour' : 'Annuler'}</button>
                                        </div>

                                        {message ? (<div className="alert alert-success text-center" style={{ marginTop: 10 }}>{message}</div>) : null}
                                    </form>
                                </div>
                            </div>
                        ) : (
                                <div className="card border-primary text-center">
                                    <div className="card-body">
                                        <p className="card-text font-weight-bold font-italic">Sélectionnez un restaurant ...</p>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default DetailRestaurant;