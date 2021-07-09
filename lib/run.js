import { factory } from './factory';
import { scan } from './scan';

/**
 *  Run the loader on a element to get all attributes that corresponds to a component
 *  @param {HTMLElement} [element] root element
 *  @param {string} [initAttr] attribut name
 */

export const run = (element = window.document, initAttr = 'data-nc') =>
  scan(element, initAttr).forEach(
    node => setTimeout(() => {
      // when we have coral polyfills (forced all browsers at cloud env), it create elements twice + and move then around.
      // this prevent observer to reinitiate components when same element is added multiple times added to the dom
      if (!node.initialized) {
        node.initialized = true;
        // get the component that needs, will load by attribute
        const componentNames = node.getAttribute(initAttr).split(',');
        componentNames.forEach(name =>
          factory(name, node, initAttr));
      }
    }),
  );
