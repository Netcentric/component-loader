import { factory } from './factory';
import { scan } from './scan';

/**
 *  Run the loader on an element to get all attributes that corresponds to a component
 *  @param {HTMLElement|Document} [element] root element
 *  @param {string} [initAttr] attribute name
 */

export const run = (element = window.document, initAttr = 'data-nc', lazyAttr = 'data-nc-loading') =>
  scan(element, initAttr).forEach(
    (node) => setTimeout(() => {
      // when we have coral polyfills (forced all browsers at cloud env), it creates elements twice + and move then around.
      // this prevents observer to reinitialize components when same element is added multiple times added to the dom
      if (!node.initialized) {
        node.initialized = true;
        // get the component that needs, will load by attribute
        const componentNames = node.getAttribute(initAttr).split(',');
        componentNames.forEach((name) =>
          factory(name, node, initAttr, lazyAttr));
      }
    })
  );
