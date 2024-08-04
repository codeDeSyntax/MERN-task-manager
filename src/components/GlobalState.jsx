import PropTypes from "prop-types";
import { createContext } from "react";

export const GlobState = createContext();

const StateProvider = ({ children }) => {
  // Add prop validation for 'children'

  return <GlobState.Provider value={{}}>{children}</GlobState.Provider>;
};

StateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { StateProvider };
