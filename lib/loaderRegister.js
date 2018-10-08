import { loaderComponents } from './loaderComponents';

/**
 * Constant with a object that contain collection of components classes.
 */

export const loaderRegister = (components) => {
  // register add the components to the available components
  // this will overide the 1 level named properties
  Object.assign(loaderComponents, components);
};
