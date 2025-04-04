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
        componentNames.forEach((name) => {
          const isLazy = node.getAttribute(lazyAttr) === 'lazy';
          if (isLazy) {
            const observerSettings = { rootMargin: '50px 0px', threshold: 0.01 };
            const observer = new IntersectionObserver((entries) => {
              entries.forEach((entry) => {
                if (entry.intersectionRatio > 0) {
                  observer.unobserve(node);
                  factory(name, node, initAttr);
                }
              });
            }, observerSettings);

            observer.observe(node);
            return null;
          }
          return factory(name, node, initAttr);
        });
      }
    })
  );
