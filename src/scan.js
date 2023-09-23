/**
 * Scan elements for the the query returnig all as array
 */

export const scan = (element = window.document, initAttr = 'data-nc') => {
  // gets all nodes at element with the initAttribute
  const nodes = Array.prototype.slice.call(element.querySelectorAll(`[${initAttr}]`));
  // Check if the element is also a component
  if (element.hasAttribute && element.hasAttribute(initAttr)) {
    nodes.push(element);
  }
  // return each node with the initAttr
  return nodes;
};
