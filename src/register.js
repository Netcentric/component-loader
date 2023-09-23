import { factory } from './factory';
import { components } from './components';
import { deferredComponents } from './deferredComponents';

/**
 * Constant with an object that contain collection of components classes.
 *
 * @param {object} newComponents - Components collection { name: definition }
 * @param {number} [level] - level of inheritance, 0,1,2 ...
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
    if (deferredComponents[name]) {
      deferredComponents[name].forEach(({ element, initAttr }) => factory(name, element, initAttr));
      delete deferredComponents[name];
    }
  });
};
