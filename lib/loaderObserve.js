import { loaderRun } from './loaderRun';

/**
 * Run the loader on a element to get all attributes that corresponds to a component
 */

export const loaderObserve = (element = window.document, initAttr = 'data-nc') => {
  // create observer and check for new nodes added
  const observer = new MutationObserver(
    mutations => mutations.forEach((mutation) => {
      // only if there are new nodes added
      if (mutation.addedNodes.length > 0) {
        // should be a array of 1 lenght always.
        const node = mutation.addedNodes.forEach((node) => {
          if (node.querySelector) {
            loaderRun(node, initAttr);
          }
        });
      }
    }),
  );

  observer.observe(element, {
    subtree: true,
    childList: true,
  });
};
