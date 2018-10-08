import { components as loaderComponents } from './components';
import { instances as loaderInstances } from './instances';
import { init as initComponent } from './init';
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
  nodes.forEach(async (node) => {
    // get the component that needs will load by attribute
    const name = node.getAttribute(initAttr);
    // if there is a component available with the name
    if (loaderComponents[name]) {
      if (!loaderInstances[name]) {
        loaderInstances[name] = [];
      }
      // create a unique ID for the component + node
      node.uuid = uuid();
      // add to the active collection using a unique ID
      loaderInstances[name].push(initComponent(
        loaderComponents[name], // Component Class
        name, // Component Name
        node, // Node
        `${initAttr}-params`, // params to find components
      ));
      return;
    }
    // no component was found
    return console.error(`loaderRun cannot find a component named "${name}"`);
  });
};
