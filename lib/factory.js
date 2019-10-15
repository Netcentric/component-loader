import { components } from './components';
import { instances } from './instances';
import { create } from './create';
import { uuid } from './uuid';

/**
 * Factory by a component name and node
 * Removed this feature from run.js function into its own function for separed use
 */

export const factory = (name, element, initAttr = 'data-nc') => {
  // if there is a component available with the name
  if (components[name]) {
    if (!instances[name]) {
      instances[name] = [];
    }
    // create a unique ID for the component + node
    element.uuid = uuid();
    // add to the active collection using a unique ID
    instances[name].push(
      create(
        components[name], // Component Class
        name, // Component Name
        element, // Node
        `${initAttr}-params-${name}`, // params to find components
      ),
    );
    return;
  }
  // no component was found
  return console.error(`Component factory cannot find a component "${name}"`);
};
