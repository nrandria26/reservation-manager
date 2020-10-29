import http from '../API';


const getAllReservations = () => {
    return http.get("/reservations");
}

const getReservationById = (id) => {
    return http.get(`/reservations/${id}`);
}

const createReservation = (reservation) => {
    return http.post("/reservations", reservation);
}

const updateReservation = (id, reservation) => {
    return http.put(`/reservations/${id}`, reservation);
}

const deleteReservationById = (id) => {
    return http.delete(`/reservations/${id}`);
}

const findReservationByName = (name) => {
    return http.get(`/reservations?nameReservation=${name}`)
}

// eslint-disable-next-line
export default {
    getAllReservations,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservationById,
    findReservationByName
};
