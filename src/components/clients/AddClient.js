import React, { useState } from 'react';
import { FaUserPlus, FaUndo, FaSignOutAlt } from 'react-icons/fa';
import { FcViewDetails } from "react-icons/fc";
import { NavLink } from 'react-router-dom';
import ClientService from '../../services/ClientService';

const AddClient = () => {

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
    const [client, setClient] = useState(initialClientState);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setClient({ ...client, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        createClient();
    };

    const createClient = () => {
        const data = {
            lastName: client.lastName,
            firstName: client.firstName,
            email: client.email,
            phone: client.phone,
            street: client.street,
            city: client.city,
            state: client.state,
            zip: client.zip
        };

        ClientService.createClient(data)
            .then(response => {
                setClient({
                    lastName: response.data.lastName,
                    firstName: response.data.firstName,
                    email: response.data.email,
                    phone: response.data.phone,
                    street: response.data.street,
                    city: response.data.city,
                    state: response.data.state,
                    zip: response.data.zip
                });
                setIsSubmitted(true);
                console.log(response.data);
            })
            .catch(e => { console.log(e); });
    };

    const newCreateClient = () => {
        setClient(initialClientState);
        setIsSubmitted(false);
    };

    return (
        <React.Fragment>
            <div className="row justify-content-center">
                <div className="col-md-auto mb-5">
                    {isSubmitted ? (
                        <div className="card border-primary">
                            <div className="card-body text-center">
                                <h5>La fiche client a bien été créée</h5>
                                <button className="btn btn-success" onClick={newCreateClient}><FaUserPlus /> Créer</button>
                                <NavLink to="/clients"><button className="btn btn-dark" style={{ marginLeft: 10 }}><FaSignOutAlt /> Retour</button></NavLink>
                            </div>
                        </div>
                    ) : (
                            <div className="card border-primary">
                                <div className="card-header text-center text-white bg-primary border-primary">
                                    <h4><span><FcViewDetails size={50} /></span> Création d'une fiche client</h4>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label>Nom</label>
                                                <input type="text" name="lastName" className="form-control" value={client.lastName} onChange={handleInputChange} required />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Prénom</label>
                                                <input type="text" name="firstName" className="form-control" value={client.firstName} onChange={handleInputChange} required />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label>Email</label>
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">@</div>
                                                    </div>
                                                    <input type="email" name="email" className="form-control" value={client.email} onChange={handleInputChange} required />
                                                </div>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Téléphone</label>
                                                <input type="text" name="phone" className="form-control" value={client.phone} onChange={handleInputChange} required pattern="^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Rue</label>
                                            <input type="text" name="street" className="form-control" value={client.street} onChange={handleInputChange} required />
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label>Ville</label>
                                                <input type="text" name="city" className="form-control" value={client.city} onChange={handleInputChange} required />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label>Pays</label>
                                                <input type="text" name="state" className="form-control" value={client.state} onChange={handleInputChange} />
                                            </div>
                                            <div className="form-group col-md-2">
                                                <label>Code postal</label>
                                                <input type="text" name="zip" className="form-control" value={client.zip} onChange={handleInputChange} required pattern="^(?:[0-8]\d|9[0-8])\d{3}$" />
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <button type="submit" className="btn btn-success"><FaUserPlus /> Créer</button>
                                            <button type="button" className="btn btn-dark" style={{ marginLeft: 10 }} onClick={newCreateClient}><FaUndo /> Effacer</button>
                                            <NavLink to="/clients"><button type="button" className="btn btn-danger" style={{ marginLeft: 10 }}><FaSignOutAlt /> Annuler</button></NavLink>
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

export default AddClient;