/**
 * Create a component and pass parameters if set
 */

export const loaderCreateComponent = (Component, name, el, paramsAttr = 'data-nc-params') => {
  const params = el.getAttribute(`${paramsAttr}`);
  let options = {};
  // check if it can parse its params
  try {
    options = JSON.parse(params);
  } catch (e) {
    const errorTitle = `${name} ERROR:`;
    const errorText = `parsing '${paramsAttr}'. It should be a correct JSON string`;
    const errorEx = `(i.e. ${this.attribute}-${name}='{ "foo": "bar" }')`;
    console.error(errorTitle, el, options, `${errorText} ${errorEx}`);
  }

  try {
    const instance = new Component(el, options, name);
    instance.init();
    console.log(`${name} initialised`, el, options);
  } catch (error) {
    console.error(`${name}(${el.uuid}) ERROR:`, el, options, error);
  }
};
