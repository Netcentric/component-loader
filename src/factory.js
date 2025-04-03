import { components } from './components';
import { create } from './create';
import { deferredComponents } from './deferredComponents';
import { instances } from './instances';
import { uuid } from './uuid';

const sortKeys = (list) => Object.keys(list).sort((a, b) => b - a);
const getComponent = (name) => {
  if (components[name]) {
    return components[name];
  }
  // first appearance of component in sorted levels
  const topLevel = sortKeys(components).find((level) => components[level][name]);
  return topLevel ? components[topLevel][name] : null;
};

/**
 * Factory by a component name and node
 * Removed this feature from run.js function into its own function for separate use
 */
export const factory = (name, element, initAttr, lazyAttr) => {
  // if there is a component available with the name
  const component = getComponent(name);
  const isLazy = element.getAttribute(lazyAttr) === 'lazy';

  if (!component) {
    // no component was found
    deferredComponents[name] = deferredComponents[name] || [];
    deferredComponents[name].push({ element, initAttr, lazyAttr });
    // eslint-disable-next-line no-console
    return console.warn(`Deferring initialisation of Component because factory cannot find a class for "${name}"`);
  }

  if (!instances[name]) {
    instances[name] = [];
  }
  // create a unique ID for the component + node
  element.uuid = uuid();

  if (isLazy) {
    const observerSettings = { rootMargin: '50px 0px', threshold: 0.01 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          observer.unobserve(element);
          // add to the active collection using a unique ID
          instances[name].push(
            create(
              component, // Component Class
              name, // Component Name
              element, // Node
              initAttr // params to find components
            )
          );
        }
      });
    }, observerSettings);

    observer.observe(element);
  } else {
    // add to the active collection using a unique ID
    instances[name].push(
      create(
        component, // Component Class
        name, // Component Name
        element, // Node
        initAttr // params to find components
      )
    );
  }

  return null;
};
