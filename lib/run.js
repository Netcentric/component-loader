import { factory } from './factory';
import { scan } from './scan';

/**
 * Run the loader on a element to get all attributes that corresponds to a component
 */

export const run = (element = window.document, initAttr = 'data-nc') =>
  scan(element, initAttr).forEach(
    node => setTimeout(() => {
    // get the component that needs, will load by attribute
      const componentNames = node.getAttribute(initAttr).split(',');
      componentNames.forEach(name =>
        factory(name, node, initAttr));
    }),
  );
