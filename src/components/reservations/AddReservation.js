import React, { useEffect, useState } from 'react';
import { FcCalendar } from 'react-icons/fc';
import { BiCalendarPlus } from "react-icons/bi";
import { FaUndo, FaSignOutAlt } from 'react-icons/fa';
import ReservationService from '../../services/ReservationService';
import ClientService from '../../services/ClientService';
import RestaurantService from '../../services/RestaurantService';
import { NavLink } from 'react-router-dom';
import Loading from '../Loading';

const AddReservation = () => {

    const initialReservationState = {
        nameReservation: '',
        nameRestaurant: '',
        dateReservation: '',
        hourReservation: '',
        comment: '',
        statusReservation: false
    };
    const [reservation, setReservation] = useState(initialReservationState);
    const [minDate, setMinDate] = useState(new Date());
    const [minTime, setMinTime] = useState("");
    const [maxTime, setMaxTime] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    //Retrieve all clients and restaurants to populate select
    const [clients, setClients] = useState([]);
    const [restaurants, setRestaurants] = useState([]);

    useEffect(
        () => { getAllClients(); getAllRestaurants(); getCurrentDate(); setMinMaxTime(); }, []
    );

    const handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setReservation({ ...reservation, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        createReservation();
    };

    const createReservation = () => {
        const data = {
            nameReservation: reservation.nameReservation,
            nameRestaurant: reservation.nameRestaurant,
            dateReservation: reservation.dateReservation,
            hourReservation: reservation.hourReservation,
            comment: reservation.comment,
            statusReservation: reservation.statusReservation
        };

        ReservationService.createReservation(data)
            .then(response => {
                setReservation({
                    nameReservation: response.data.nameReservation,
                    nameRestaurant: response.data.nameRestaurant,
                    dateReservation: response.data.dateReservation,
                    hourReservation: response.data.hourReservation,
                    comment: response.data.comment,
                    statusReservation: response.data.statusReservation
                });
                setIsSubmitted(true);
                console.log(response.data);
            })
            .catch(e => { console.log(e); });
    };

    const newReservation = () => {
        setReservation(initialReservationState);
        setIsSubmitted(false);
        setIsLoading(true);
        setTimeout(() => { setIsLoading(false); }, 500);
    };

    const getAllClients = () => {
        ClientService.getAllClients()
            .then(response => {
                console.log(response.data);
                setClients(response.data);
            })
            .catch(e => { console.log(e) });
    };

    const getAllRestaurants = () => {
        RestaurantService.getAllRestaurants()
            .then(response => {
                console.log(response.data);
                setRestaurants(response.data);
                setIsLoading(false);
            })
            .catch(e => { console.log(e) });
    };

    const getCurrentDate = () => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }

        today = yyyy + "-" + mm + "-" + dd;
        setMinDate(today);
    };

    const setMinMaxTime = () => {
        setMinTime("09:00");
        setMaxTime("22:00");
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
                                    <h5>La réservation a bien été enregistrée</h5>
                                    <button className="btn btn-success" onClick={newReservation}><BiCalendarPlus /> Créer</button>
                                    <NavLink to="/reservations"><button className="btn btn-dark" style={{ marginLeft: 10 }}><FaSignOutAlt /> Retour</button></NavLink>
                                </div>
                            </div>
                        ) : (
                                <div className="card border-primary">
                                    <div className="card-header text-center text-white bg-primary border-primary">
                                        <h4><span><FcCalendar size={50} /></span> Réservation d'une table</h4>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label>Nom du client:</label>
                                                <select name="nameReservation" className="form-control" onChange={handleInputChange} required>
                                                    <option value="">--- Choississez le client ---</option>
                                                    {clients.map((client) => (<option key={client.id} value={client.lastName + ' ' + client.firstName}>{client.lastName}{" "}{client.firstName}</option>))}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Nom du restaurant:</label>
                                                <select name="nameRestaurant" className="form-control" onChange={handleInputChange} required>
                                                    <option value="">--- Choississez le restaurant ---</option>
                                                    {restaurants.map((restaurant) => (<option key={restaurant.id} value={restaurant.nameRestaurant}>{restaurant.nameRestaurant}</option>))}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Date de la réservation:</label>
                                                <input type="date" name="dateReservation" className="form-control" value={reservation.dateReservation} min={minDate} onChange={handleInputChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label>Heure de la réservation:</label>
                                                <input type="time" name="hourReservation" className="form-control" value={reservation.hourReservation} min={minTime} max={maxTime} onChange={handleInputChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label>Commentaire:</label>
                                                <input type="text" name="comment" className="form-control" value={reservation.comment} onChange={handleInputChange} />
                                            </div>
                                            <div className="form-group">
                                                <label><strong>Statut:</strong></label>
                                                {" "}<input type="checkbox" name="statusReservation" checked={reservation.statusReservation} onChange={handleInputChange} />
                                                {" "}{reservation.statusReservation ? 'Validé' : 'En attente de validation'}
                                            </div>

                                            <div className="text-center">
                                                <button type="submit" className="btn btn-success"><BiCalendarPlus /> Enregistrer</button>
                                                <button type="button" className="btn btn-dark" style={{ marginLeft: 10 }} onClick={newReservation}><FaUndo /> Effacer</button>
                                                <NavLink to="/reservations"><button type="button" className="btn btn-danger" style={{ marginLeft: 10 }}><FaSignOutAlt /> Annuler</button></NavLink>
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

export default AddReservation;