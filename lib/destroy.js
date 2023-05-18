import { instances } from './instances';
import { scan } from './scan';

/**
 *  Run the loader on a element to get all attributes that corresponds to a component
 *  @param {HTMLElement} [element] root element
 *  @param {string} [initAttr] attribut name
 */

export const destroy = (element = window.document, initAttr = 'data-nc') =>
  scan(element, initAttr).forEach(
    node => setTimeout(() => {
      // get the component that needs, will load by attribute, then destroy if inicialized and call disconnectedCallback
        const componentNames = node.getAttribute(initAttr).split(',');
        componentNames.forEach(name => {
            if(instances[name]) {
                instances[name].forEach(instance => {
                    if (node.uuid === instance.el.uuid && node.initialized) {
                        node.initialized = false;
                        if (instance.disconnectedCallback) {
                            instance.disconnectedCallback();
                        }
                    }
                })
            }
        });
    }),
  );
