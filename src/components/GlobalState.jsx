import PropTypes from "prop-types";
import { createContext } from "react";
import { useState } from "react";

export const GlobState = createContext();

const StateProvider = ({ children }) => {
  const [tasks, setTasks] = useState([

  ]);

  return (
    <GlobState.Provider value={{ tasks, setTasks }}>
      {children}
    </GlobState.Provider>
  );
};

StateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { StateProvider };
