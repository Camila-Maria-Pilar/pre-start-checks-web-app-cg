import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";


//Importing the pages of my app
import Dashboard from "./pages/Dashboard";
import AddMachine from "./pages/AddMachine";
import EditMachine from "./pages/EditMachine";
import AddUser from "./pages/AddUser";
import ListUsers from "./pages/ListUsers";
import EditUser from "./pages/EditUser";
import ListMachines from "./pages/ListMachines";
import MachineDetails from "./pages/MachineDetails";
import AddQuestionnaire from "./pages/AddQuestionnaire";
import EditQuestionnaire from "./pages/EditQuestionnaire";
import PrecheckLogForm from "./pages/PrecheckLogForm";
import Thanks from "./pages/Thanks";

import Login from "./pages/Login";
import Logout from "./pages/Logout";

import NavBar from "./containers/NavBar";
import Header from "./containers/Header";
import Footer from "./components/Footer";
//import Button from './components/Button';
//LoadingSpinner from './components/LoadingSpinner';
//import SelectField from './components/SelectField';
//import Card from './components/Card';
//import Table from './components/Table';
//import Modal from './components/Modal';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Middleware for attaching JWT tokens to every GraphQL request
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



function Main() {
  const location = useLocation();
  const shouldShowNavBar = () => {
    const { pathname } = location;
    const noNavBarPaths = ["/thanks", "/login", "/logout", "/Logout"];
    if (noNavBarPaths.includes(pathname)) return false;
    if (pathname.includes("/machines/") && pathname.endsWith("/prechecklog-form")) return false;
    return true;
  };

  return (
    <div className="flex-column justify-flex-start min-100-vh">
      <Header />
      {shouldShowNavBar() && <NavBar />}
      <div className="container">
        <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/machines" element={<ListMachines />} />
              <Route path="/machines/:id" element={<MachineDetails />} />
              <Route path="/addmachine" element={<AddMachine />} />
              <Route path="/editmachine" element={<EditMachine />} />
              <Route path="/addquestionnaire/:id" element={<AddQuestionnaire />} />
              <Route path="/editquestionnaire/:id" element={<EditQuestionnaire />} />
              <Route path="/adduser" element={<AddUser />} />
              <Route path="/listusers" element={<ListUsers />} />              
              <Route path="/edituser" element={<EditUser />} />
              <Route path="/machines/:id/prechecklog-form" element={<PrecheckLogForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/thanks" element={<Thanks />} />
              </Routes>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Main />
      </Router>
    </ApolloProvider>
  );
}

export default App;
