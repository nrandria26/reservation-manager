import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ReservationService from '../../services/ReservationService';
/*import { BsSearch } from 'react-icons/bs';*/
import moment from 'moment';
import 'moment/locale/fr';
import { BiPen } from 'react-icons/bi';
import Search from '../Search';

const ListReservations = () => {

    const [reservations, setReservations] = useState([]);
    const [currentReservation, setCurrentReservation] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchReservation, setSearchReservation] = useState("");

    useEffect(
        () => { getAllReservations(); }, []
    );

    const getAllReservations = () => {
        console.log("Récupération de la liste des réservations");
        ReservationService.getAllReservations()
            .then(response => {
                console.log(response.data);
                setReservations(response.data);
            })
            .catch(e => { console.log(e) });
    }

    const setActiveReservation = (reservation, index) => {
        setCurrentReservation(reservation);
        setCurrentIndex(index);
    }

    /*const onChangeSearchReservation = e => {
        const searchReservation = e.target.value;
        setSearchReservation(searchReservation);
    }*/
    const searchHandler = (value) => {
        setSearchReservation(value);
    };

    /*const searchReservationByName = () => {
        console.log("Recherche d'une réservation à partir du nom du client");
        if (searchReservation.length === 0) {
            getAllReservations();
            setCurrentReservation(null);
            setCurrentIndex(-1);
        } else {
            ReservationService.findReservationByName(searchReservation)
                .then(response => {
                    console.log(response.data);
                    setReservations(response.data);
                })
                .catch(e => { console.log(e) });
        }
    }*/

    let updateListReservations = reservations.filter(
        (reservation) => { return reservation.nameReservation.includes(searchReservation); }
    );

    if (reservations.length === 0) {
        return (
            <React.Fragment>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <p className="font-weight-bold font-italic">Aucune réservation enregistrée ...</p>
                        <p className="font-weight-bold font-italic">Cliquez <NavLink to="/add-reservation">ici</NavLink> pour réserver une table ...</p>
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
                                /*reservations && reservations.map(*/
                                updateListReservations && updateListReservations.map(
                                    (reservation, index) => (
                                        <li
                                            key={index}
                                            className={"list-group-item " + (index === currentIndex ? "active" : "")}
                                            onClick={() => setActiveReservation(reservation, index)}
                                        >
                                            {reservation.nameReservation} {"#"} {reservation.id}
                                        </li>
                                    )
                                )
                            }
                        </ul>
                    </div>
                    {currentReservation ? (
                        <div className="col-md-6">
                            <div>
                                <label>
                                    <strong>Nom du client:</strong>
                                </label>
                                {" "} {currentReservation.nameReservation}
                            </div>
                            <div>
                                <label>
                                    <strong>Nom du restaurant:</strong>
                                </label>
                                {" "} {currentReservation.nameRestaurant}
                            </div>
                            <div>
                                <label>
                                    <strong>Date de la réservation:</strong>
                                </label>
                                {" "} {moment(currentReservation.dateReservation).format('LL')}
                            </div>
                            <div>
                                <label>
                                    <strong>Heure de la réservation:</strong>
                                </label>
                                {" "} {currentReservation.hourReservation}
                            </div>
                            <div>
                                <label>
                                    <strong>Commentaire:</strong>
                                </label>
                                {" "} {currentReservation.comment}
                            </div>
                            <div>
                                <label>
                                    <strong>Statut de la réservation:</strong>
                                </label>
                                {" "} {currentReservation.statusReservation ? 'Validé' : 'En attente de validation'}
                            </div>
                            <NavLink to={"/reservations/" + currentReservation.id} className="btn btn-warning text-white"><BiPen /> Mette à jour</NavLink>
                        </div>
                    ) : (
                            <div className="col-md-6">
                                <p className="font-weight-bold font-italic">Sélectionnez une réservation ...</p>
                            </div>
                        )}
                </div>
            </React.Fragment>
        );
    }

}

export default ListReservations;