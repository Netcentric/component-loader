import { components } from './components';
import { create } from './create';
import { deferredComponents } from './deferredComponents';
import { instances } from './instances';
import { uuid } from './uuid';

const sortKeys = (list) => Object.keys(list).sort((a, b) => b - a);
const getComponent = (name) => {
  if (components[name]) {
    return components[name];
  }
  // first appearance of component in sorted levels
  const topLevel = sortKeys(components).find((level) => components[level][name]);
  return topLevel ? components[topLevel][name] : null;
};

/**
 * Factory by a component name and node
 * Removed this feature from run.js function into its own function for separate use
 */
export const factory = (name, element, initAttr) => {
  // if there is a component available with the name
  const component = getComponent(name);

  if (component) {
    if (!instances[name]) {
      instances[name] = [];
    }
    // create a unique ID for the component + node
    element.uuid = uuid();
    // add to the active collection using a unique ID
    instances[name].push(
      create(
        component, // Component Class
        name, // Component Name
        element, // Node
        initAttr // params to find components
      )
    );
    return null;
  }
  // no component was found
  deferredComponents[name] = deferredComponents[name] || [];
  deferredComponents[name].push({ element, initAttr });
  // eslint-disable-next-line no-console
  return console.warn(`Deferring initialisation of Component because factory cannot find a class for "${name}"`);
};
