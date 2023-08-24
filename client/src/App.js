import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import AddMachine from './pages/AddMachine';
import EditMachine from './pages/EditMachine';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import PreStartCheckQuestionary from './pages/PreStartCheckQuestionary';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Signup from './pages/Signup';

import NavBar from './components/containers/NavBar';
import Footer from './components/containers/Footer';
import Header from './components/containers/Header';

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
              <Route path="/add-machine" element={<AddMachine />} />
              <Route path="/edit-machine" element={<EditMachine />} />
              <Route path="/add-user" element={<AddUser />} />
              <Route path="/edit-user" element={<EditUser />} />
              <Route path="/pre-start-check" element={<PreStartCheckQuestionary />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
