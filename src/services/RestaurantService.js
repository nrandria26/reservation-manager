import http from '../API';


const getAllRestaurants = () => {
    return http.get("/restaurants");
}

const getRestaurantById = (id) => {
    return http.get(`/restaurants/${id}`);
}

const createRestaurant = (restaurant) => {
    return http.post("/restaurants", restaurant);
}

const updateRestaurant = (id, restaurant) => {
    return http.put(`/restaurants/${id}`, restaurant);
}

const deleteRestaurantById = (id) => {
    return http.delete(`/restaurants/${id}`);
}

// eslint-disable-next-line
export default {
    getAllRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurantById
};

