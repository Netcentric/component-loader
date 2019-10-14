import { runComponentByName } from "./runComponentByName";

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
    componentNames.forEach((name) => runComponentByName(name))
  }));
};
