import { run as loaderRun } from './run';
import { destroy } from './destroy';

/**
 * Run the loader on a element to get all attributes that corresponds to a component
 */
window.ncObservers = window.ncObservers || {};
export const observe = (element = window.document, initAttr = 'data-nc') => {
  if (!window.ncObservers[initAttr]) {
    // if there is already a listener its should be unique
    // create observer and check for new nodes added
    window.ncObservers[initAttr] = new MutationObserver(
      mutations => mutations.forEach((mutation) => {
        // define actions for each mutation type
        const nodeActions = {
          removedNodes: destroy,
          addedNodes: loaderRun
        }
        // for each mutation type
        Object.keys(nodeActions).forEach((type) => {
          // only if there are new nodes in the mutation type
          if (mutation[type].length > 0) {
            // should be a array of 1 lenght always.
            Array.prototype.slice.call(mutation[type])
              .forEach((node) => {
                if (node.querySelector) {
                  // run or destroy etcs.
                  nodeActions[type](node, initAttr);
                }
              });
          }
        })
      }),
    );

    window.ncObservers[initAttr].observe(element, {
      subtree: true,
      childList: true,
    });
  }
};
