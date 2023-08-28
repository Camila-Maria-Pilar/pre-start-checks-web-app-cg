import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import AddMachine from './pages/AddMachine';
import EditMachine from './pages/EditMachine';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import ListMachines from './pages/ListMachines';
import MachineDetails from './pages/MachineDetails';

import Login from './pages/Login';
import Logout from './pages/Logout';


import NavBar from './containers/NavBar';
import Header from './containers/Header';
import Footer from './components/Footer';
//import Button from './components/Button';
// LoadingSpinner from './components/LoadingSpinner';
//import SelectField from './components/SelectField';
//import Card from './components/Card';
//import Table from './components/Table';
//import Modal from './components/Modal';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Middleware for attaching JWT tokens to every GraphQL request
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <NavBar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/machines" element={<ListMachines />} />
              <Route path="/machines/:id" element={<MachineDetails />} />
              <Route path="/addmachine" element={<AddMachine />} />
              <Route path="/editmachine" element={<EditMachine />} />
              <Route path="/adduser" element={<AddUser />} />
              <Route path="/edituser" element={<EditUser />} />
              
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
