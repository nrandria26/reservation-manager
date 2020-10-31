import React, { useState, useEffect } from 'react';
import ClientService from '../../services/ClientService';
import { FaTrashAlt, FaSave, FaSignOutAlt } from 'react-icons/fa';
import { FcViewDetails } from "react-icons/fc";
import { BsXOctagon } from 'react-icons/bs';
import Loading from '../Loading';

const DetailClient = (props) => {

    const initialClientState = {
        lastName: '',
        firstName: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zip: ''
    };
    const [currentClient, setCurrentClient] = useState(initialClientState);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const getClientById = id => {
        console.log("Récupération du client par son id");
        ClientService.getClientById(id)
            .then(response => {
                console.log(response.data);
                setCurrentClient(response.data);
                setIsLoading(false);
            })
            .catch(e => { console.log(e); });
    };

    useEffect(
        () => { getClientById(props.match.params.id) }, [props.match.params.id]
    );

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentClient({ ...currentClient, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        updateCurrentClient();
    }

    const updateCurrentClient = () => {
        ClientService.updateClient(currentClient.id, currentClient)
            .then(response => {
                console.log(response.data);
                setMessage("La fiche client a été mise à jour");
            })
            .catch(e => { console.log(e); });
    };

    const deleteClient = () => {
        ClientService.deleteClientById(currentClient.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/clients");
            })
            .catch(e => { console.log(e); });
    };

    const cancelMaj = () => {
        props.history.push("/clients");
    };

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <React.Fragment>
                <div className="row justify-content-center">
                    <div className="col-md-auto mb-5">
                        {currentClient ? (
                            <div className="card border-primary">
                                <div className="card-header text-center text-white bg-primary border-primary">
                                    <h4><span><FcViewDetails size={50} /></span> Modification de la fiche client</h4>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label>Nom</label>
                                                <input readOnly type="text" name="lastName" className="form-control" value={currentClient.lastName} />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Prénom</label>
                                                <input readOnly type="text" name="firstName" className="form-control" value={currentClient.firstName} />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label>Email</label>
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">@</div>
                                                    </div>
                                                    <input readOnly type="text" name="email" className="form-control" value={currentClient.email} />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Téléphone</label>
                                                <input type="text" name="phone" className="form-control" value={currentClient.phone} onChange={handleInputChange} required pattern="^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Rue</label>
                                            <input type="text" name="street" className="form-control" value={currentClient.street} onChange={handleInputChange} required />
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label>Ville</label>
                                                <input type="text" name="city" className="form-control" value={currentClient.city} onChange={handleInputChange} required />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label>Pays</label>
                                                <input type="text" name="state" className="form-control" value={currentClient.state} onChange={handleInputChange} />
                                            </div>
                                            <div className="form-group col-md-2">
                                                <label>Code postal</label>
                                                <input type="text" name="zip" className="form-control" value={currentClient.zip} onChange={handleInputChange} required pattern="^(?:[0-8]\d|9[0-8])\d{3}$" />
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <button type="submit" className="btn btn-warning text-white"><FaSave /> Sauvegarder</button>
                                            <button type="button" className="btn btn-danger" style={{ marginLeft: 10 }} onClick={deleteClient}><FaTrashAlt /> Supprimer</button>
                                            <button type="button" className="btn btn-dark" style={{ marginLeft: 10 }} onClick={cancelMaj}>{message ? <FaSignOutAlt /> : <BsXOctagon />}{" "}{message ? 'Retour' : 'Annuler'}</button>
                                        </div>

                                        {message ? (<div className="alert alert-success text-center" style={{ marginTop: 10 }}>{message}</div>) : null}
                                    </form>
                                </div>
                            </div>
                        ) : (
                                <div className="card border-primary text-center">
                                    <div className="card-body">
                                        <p className="card-text font-weight-bold font-italic">Sélectionnez une fiche client ...</p>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default DetailClient;