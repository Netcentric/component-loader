import { run as loaderRun } from './run';

/**
 * Run the loader on a element to get all attributes that corresponds to a component
 */
window.ncComponentObserver = window.ncComponentObserver || false;
export const observe = (element = window.document, initAttr = 'data-nc') => {
  if (!window.ncComponentObserver) {
    // if there is already a listener its should be unique
    // create observer and check for new nodes added
    window.ncComponentObserver = new MutationObserver(
      mutations => mutations.forEach((mutation) => {
        // only if there are new nodes added
        if (mutation.addedNodes.length > 0) {
          // should be a array of 1 lenght always.
          Array.prototype.slice.call(mutation.addedNodes)
            .forEach((node) => {
              if (node.querySelector) {
                loaderRun(node, initAttr);
              }
            });
        }
      }),
  );
    window.ncComponentObserver.observe(element, {
      subtree: true,
      childList: true,
    });
  }
};
