import { components } from './components';

/**
 * Constant with a object that contain collection of components classes.
 *
 * @param {object} newComponents - Components collection { name: definition }
 * @param {string|number} level - level of inheritance
 *
 */

export const register = (newComponents, level) => {
  // register add the components to the available components
  Object.keys(newComponents).forEach((name) => {
    if (typeof level === 'undefined') {
      components[name] = newComponents[name];
    } else {
      components[level] = components[level] || {};
      components[level][name] = newComponents[name];
    }
  });
};
