import { components } from './components';
import { instances } from './instances';
import { create } from './create';
import { uuid } from './uuid';

/**
 * Run the loader on a element to get all attributes that corresponds to a component
 */

export const run = (element = window.document, initAttr = 'data-nc') => {
  // gets all nodes at element with the initAttribute
  const nodes = Array.prototype.slice.call(element.querySelectorAll(`[${initAttr}]`));
  // Check if the element is also a component
  if (element.hasAttribute && element.hasAttribute(initAttr)) {
    nodes.push(element);
  }
  // check each node with the initAttr
  nodes.forEach(node => setTimeout(() => {
    // get the component that needs will load by attribute
    const componentNames = node.getAttribute(initAttr).split(',');
    componentNames.forEach((name) => {
      // if there is a component available with the name
      if (components[name]) {
        if (!instances[name]) {
          instances[name] = [];
        }
        // create a unique ID for the component + node
        node.uuid = uuid();
        // add to the active collection using a unique ID
        instances[name].push(create(
          components[name], // Component Class
          name, // Component Name
          node, // Node
          `${initAttr}-params-${name}`, // params to find components
        ));
        return;
      }
      // no component was found
      return console.error(`loaderRun cannot find a component named "${name}"`);
    })
  }));
};
