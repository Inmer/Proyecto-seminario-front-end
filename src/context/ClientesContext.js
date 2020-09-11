import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const Context = createContext({});

export const Provider = (props) => {
  // Initial values are obtained from the props
  const {
    users: initialUsers,
    clienteSeleccionado: initialSelectedUsers,
    children,
  } = props;

  // Use State to keep the values
  const [users, setUsers] = useState(initialUsers);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(
    initialSelectedUsers
  );
  const [listaVehiculos, setListaVehiculos] = useState(initialUsers);

  const addNewUser = (userName) => {
    const newUser = { id: new Date().getTime().toString(), name: userName };
    setUsers(users.concat([newUser]));
  };

  // Make the context object:
  const clientesContext = {
    users,
    setUsers,
    clienteSeleccionado,
    setClienteSeleccionado,
    listaVehiculos,
    setListaVehiculos,
    addNewUser,
  };

  // pass the value in provider and return
  return (
    <Context.Provider value={clientesContext}>{children}</Context.Provider>
  );
};

export const { Consumer } = Context;

Provider.propTypes = {
  users: PropTypes.array,
  clienteSeleccionado: PropTypes.object,
  listaVehiculos: PropTypes.array,
};

Provider.defaultProps = {
  users: [],
  clienteSeleccionado: {},
  listaVehiculos: [],
};
