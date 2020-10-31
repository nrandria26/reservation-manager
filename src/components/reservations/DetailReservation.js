import React, { useState, useEffect } from 'react';
import ReservationService from '../../services/ReservationService';
import { FaTrashAlt, FaSave, FaSignOutAlt } from 'react-icons/fa';
import { BsXOctagon, BsCheckBox } from 'react-icons/bs';
import { FcCalendar } from 'react-icons/fc';
import Loading from '../Loading';

const DetailReservation = (props) => {

    const initialReservationState = {
        nameReservation: '',
        nameRestaurant: '',
        dateReservation: '',
        hourReservation: '',
        comment: '',
        statusReservation: false
    };
    const [currentReservation, setCurrentReservation] = useState(initialReservationState);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const getReservationById = id => {
        console.log("Récupération de la réservation par son id");
        ReservationService.getReservationById(id)
            .then(response => {
                console.log(response.data);
                setCurrentReservation(response.data);
                setIsLoading(false);
            })
            .catch(e => { console.log(e); });
    };

    useEffect(
        () => { getReservationById(props.match.params.id) }, [props.match.params.id]
    );

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentReservation({ ...currentReservation, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        updateCurrentReservation();
    }

    const updateStatusReservation = status => {
        const data = {
            nameReservation: currentReservation.nameReservation,
            nameRestaurant: currentReservation.nameRestaurant,
            dateReservation: currentReservation.dateReservation,
            hourReservation: currentReservation.hourReservation,
            comment: currentReservation.comment,
            statusReservation: status
        }

        ReservationService.updateReservation(currentReservation.id, data)
            .then(response => {
                console.log(response.data);
                setCurrentReservation({ ...currentReservation, statusReservation: status });
                setMessage("La réservation a été validée");
            })
            .catch(e => { console.log(e); });
    }

    const updateCurrentReservation = () => {
        ReservationService.updateReservation(currentReservation.id, currentReservation)
            .then(response => {
                console.log(response.data);
                setMessage("La réservation a été mise à jour");
            })
            .catch(e => { console.log(e); });
    };

    const deleteReservation = () => {
        ReservationService.deleteReservationById(currentReservation.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/reservations");
            })
            .catch(e => { console.log(e); });
    };

    const cancelMaj = () => {
        props.history.push("/reservations");
    };

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <React.Fragment>
                <div className="row justify-content-center">
                    <div className="col-md-auto mb-5">
                        {currentReservation ? (
                            <div className="card border-primary">
                                <div className="card-header text-center text-white bg-primary border-primary">
                                    <h4><span><FcCalendar size={50} /></span> Modification de la réservation</h4>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label>Nom du client:</label>
                                            <input readOnly type="text" name="nameReservation" className="form-control" value={currentReservation.nameReservation} />
                                        </div>
                                        <div className="form-group">
                                            <label>Nom du restaurant:</label>
                                            <input readOnly type="text" name="nameRestaurant" className="form-control" value={currentReservation.nameRestaurant} />
                                        </div>
                                        <div className="form-group">
                                            <label>Date de la réservation:</label>
                                            <input type="date" name="dateReservation" className="form-control" value={currentReservation.dateReservation} onChange={handleInputChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label>Heure de la réservation:</label>
                                            <input type="time" name="hourReservation" className="form-control" value={currentReservation.hourReservation} onChange={handleInputChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label>Commentaire:</label>
                                            <input type="text" name="comment" className="form-control" value={currentReservation.comment} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <label><strong>Statut *:</strong></label>
                                            {" "}{currentReservation.statusReservation ? 'Validé' : 'En attente de validation'}
                                        </div>

                                        <div className="text-center">
                                            <button type="submit" className="btn btn-warning text-white"><FaSave /> Sauvegarder</button>
                                            {currentReservation.statusReservation ? null : (<button type="button" className="btn btn-success" style={{ marginLeft: 10 }} onClick={() => updateStatusReservation(true)}><BsCheckBox /> Valider</button>)}
                                            <button type="button" className="btn btn-danger" style={{ marginLeft: 10 }} onClick={deleteReservation}><FaTrashAlt /> Supprimer</button>
                                            <button type="button" className="btn btn-dark" style={{ marginLeft: 10 }} onClick={cancelMaj}>{message ? <FaSignOutAlt /> : <BsXOctagon />}{" "}{message ? 'Retour' : 'Annuler'}</button>
                                        </div>

                                        {message ? (<div className="alert alert-success text-center" style={{ marginTop: 10 }}>{message}</div>) : null}
                                    </form>
                                </div>
                                <small className="my-1 mx-1"><em>* En cas de validation d'une réservation, veuillez à bien sauvegarder l'action en cliquant sur le bouton "Sauvegarder"</em></small>
                            </div>
                        ) : (
                                <div className="card border-primary text-center">
                                    <div className="card-body">
                                        <p className="card-text font-weight-bold font-italic">Sélectionnez une réservation ...</p>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default DetailReservation;