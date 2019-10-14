import { components } from "./components";
import { instances } from "./instances";
import { create } from "./create";

/**
 * Run the loader by a component name
 * Removed this feature from run.js function into its own function for separed use
 */

export const runComponentByName = (name) => {
  // if there is a component available with the name
  if (components[name]) {
    if (!instances[name]) {
      instances[name] = [];
    }
    // create a unique ID for the component + node
    node.uuid = uuid();
    // add to the active collection using a unique ID
    instances[name].push(create(
      components[name], // Component Class
      name, // Component Name
      node, // Node
      `${initAttr}-params-${name}`, // params to find components
    ));
    return;
  }
  // no component was found
  return console.error(`loaderRun cannot find a component named "${name}"`);
}
