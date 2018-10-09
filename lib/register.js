import { components } from './components';

/**
 * Constant with a object that contain collection of components classes.
 */

export const register = (newComponents) => {
  // register add the components to the available components
  Object.keys(newComponents).forEach((name) => {
    components[name] = newComponents[name];
  });
};
