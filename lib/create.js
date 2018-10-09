/**
 * Create a component and pass parameters if set
 */

export const create = (Component, name, el, paramsAttr = 'data-nc-params') => {
  const params = el.getAttribute(`${paramsAttr}`);
  let options = {};
  // check if it can parse its params
  try {
    options = JSON.parse(params);
  } catch (error) {
    const errorTitle = `ERROR (${name} component): parsing '${paramsAttr}'`;
    const errorText = `The following JSON '${params}' is not a valid JSON string`;
    const errorEx = `(i.e. ${paramsAttr}-${name}='{ "foo": "bar" }')`;
    console.error(errorTitle, `${errorText} ${errorEx}`, el);
    return error;
  }

  try {
    const instance = new Component(el, options, name);
    return instance;
  } catch (error) {
    console.error(`${name}(${el.uuid}) ERROR:`, el, options, error);
    return error;
  }
};
