import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Menu from './Menu';
import AddRestaurant from './components/restaurants/AddRestaurant';
import AddClient from './components/clients/AddClient';
import AddReservation from './components/reservations/AddReservation';
import ListClients from './components/clients/ListClients';
import ListReservations from './components/reservations/ListReservations';
import ListRestaurants from './components/restaurants/ListRestaurants';
import DetailClient from './components/clients/DetailClient';
import DetailReservation from './components/reservations/DetailReservation';
import DetailRestaurant from './components/restaurants/DetailRestaurant';
import Footer from './Footer';

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <div className="bg-dark">
          <div className="container-fluid">
            <div className="row">
              <Menu />
            </div>
          </div>
        </div>

        <div className="container my-5">
          
            <Switch>
              <Route
                path="/clients/:id"
                render={(props) => (<DetailClient {...props} />)}
              />
              <Route path="/clients">
                <ListClients />
              </Route>
              <Route path="/add-client">
                <AddClient />
              </Route>

              <Route
                path="/reservations/:id"
                render={(props) => (<DetailReservation {...props} />)}
              />
              <Route path="/reservations">
                <ListReservations />
              </Route>
              <Route path="/add-reservation">
                <AddReservation />
              </Route>

              <Route
                path="/restaurants/:id"
                render={(props) => (<DetailRestaurant {...props} />)}
              />
              <Route path="/restaurants">
                <ListRestaurants />
              </Route>
              <Route path="/add-restaurant">
                <AddRestaurant />
              </Route>

              <Route path="/">
                <ListClients />
              </Route>
            </Switch>
          
        </div>

        <div className="container">
        </div>

        <footer className="bg-dark fixed-bottom">
          <div className="container-fluid">
            <div className="row">
              <Footer />
            </div>
          </div>
        </footer>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
