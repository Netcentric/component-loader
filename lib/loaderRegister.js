import { loaderComponents } from './loaderComponents';

/**
 * Constant with a object that contain collection of components classes.
 */

export const loaderRegister = (components) => {
  // register add the components to the available components
  Object.keys(components).forEach((name) => {
    loaderComponents[name] = components[name];
  });
};
