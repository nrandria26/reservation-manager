import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ClientService from '../../services/ClientService';
/*import { BsSearch } from 'react-icons/bs';*/
import { FaUserEdit } from 'react-icons/fa';
import Search from '../Search';

const ListCients = () => {

    const [clients, setClients] = useState([]);
    const [currentClient, setCurrentClient] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchClient, setSearchClient] = useState("");

    useEffect(
        () => {
            getAllClients();
        }, []
    );

    const getAllClients = () => {
        console.log("Récupération de la liste des clients");
        ClientService.getAllClients()
            .then(response => {
                console.log(response.data);
                setClients(response.data);
            })
            .catch(e => { console.log(e) });
    };

    const setActiveClient = (client, index) => {
        setCurrentClient(client);
        setCurrentIndex(index);
    };

    /*const onChangeSearchClient = e => {
        const searchClient = e.target.value;
        setSearchClient(searchClient);
    };*/
    const searchHandler = (value) => {
        setSearchClient(value);
    };

    const searchClientByName = () => {
        console.log("Recherche d'un client à partir de son nom");
        if (searchClient.length === 0) {
            getAllClients();
            setCurrentClient(null);
            setCurrentIndex(-1);
        } else {
            ClientService.findClientByName(searchClient)
                .then(response => {
                    console.log(response.data);
                    setClients(response.data);
                })
                .catch(e => { console.log(e) });
        }
    };

    let updateListClients = clients.filter(
        (client) => { return client.lastName.includes(searchClient); }
    );

    if (clients.length === 0) {
        return (
            <React.Fragment>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <p className="font-weight-bold font-italic">Aucune fiche de client disponible ...</p>
                        <p className="font-weight-bold font-italic">Cliquez <NavLink to="/add-client">ici</NavLink> pour en créer une ...</p>
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
                                /*clients && clients.map(*/
                                updateListClients && updateListClients.map(
                                    (client, index) => (
                                        <li
                                            key={index}
                                            className={"list-group-item " + (index === currentIndex ? "active" : "")}
                                            onClick={() => setActiveClient(client, index)}
                                        >
                                            {client.lastName} {client.firstName}
                                        </li>
                                    )
                                )
                            }
                        </ul>
                    </div>
                    {currentClient ? (
                        <div className="col-md-6">
                            <div>
                                <label>
                                    <strong>Nom:</strong>
                                </label>
                                {" "} {currentClient.lastName}
                            </div>
                            <div>
                                <label>
                                    <strong>Prénom:</strong>
                                </label>
                                {" "} {currentClient.firstName}
                            </div>
                            <div>
                                <label>
                                    <strong>Email:</strong>
                                </label>
                                {" "} {currentClient.email}
                            </div>
                            <div>
                                <label>
                                    <strong>Téléphone:</strong>
                                </label>
                                {" "} {currentClient.phone}
                            </div>
                            <div>
                                <label>
                                    <strong>Adresse:</strong>
                                </label>
                                {" "} {currentClient.street} {","} {currentClient.zip} {currentClient.city}
                            </div>
                            <NavLink to={"/clients/" + currentClient.id} className="btn btn-warning text-white"><FaUserEdit /> Mette à jour</NavLink>
                        </div>
                    ) : (
                            <div className="col-md-6">
                                <p className="font-weight-bold font-italic">Sélectionnez une fiche client ...</p>
                            </div>
                        )}
                </div>
            </React.Fragment >
        );
    }

}

export default ListCients;