import http from '../API';

const getAllClients = () => {
    return http.get("/clients");
}

const getClientById = (id) => {
    return http.get(`/clients/${id}`);
}

const createClient = (client) => {
    return http.post("/clients", client);
}

const updateClient = (id, client) => {
    return http.put(`/clients/${id}`, client);
}

const deleteClientById = (id) => {
    return http.delete(`/clients/${id}`);
}

const findClientByName = (name) => {
    return http.get(`/clients?lastName=${name}`);
}

// eslint-disable-next-line
export default {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClientById,
    findClientByName
};
