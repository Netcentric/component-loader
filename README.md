# Component loader

## Table of Changes

| Problem                                           | Solution                              |
|---------------------------------------------------|---------------------------------------|
| components asynchronous, not blocking event loop  | async function                        |
| singleton vs static class vs function exports     | splitted into functions                |
| Registering syntax                                | ```loaderRegister({ component })```   |
| Used named exports vs export default              | Named exports                         |
| configurable data attribute?                      | function param defaults               |
| Object for component list vs Set with name inside | Object for component list             |
| Mutation Observer vs AEM edit Iframe Postmessage  | Mutation Observer                     |
| Iteration over nodes instead of components        | Nodes define with components to init  |


# how to use it on your project


### Installation

1 - Make sure you have your `.npmrc` file setup (see ["How can I install an NPM-NC package globally for my local user's account?"](https://projects.netcentric.biz/wiki/display/FRONTEND/Netcentric%27s+NPM+Repository+-+NPM-NC) )

2 - Run ```npm install --save @nc/component-loader```

#### important! babel

This module is not transpiled. If your project is excluding `node_modules` you will have to update regex to include this module.

Eg:

```javascript
// webpack babel-loader config
module.exports = {
  test: /\.js$/,
  exclude: /node_modules\/(?!@nc)/,
  loader: 'babel-loader',
  options: {
    presets: '@babel/preset-env'
  }
};
```

Here we are excluding node_modules, except the ones under node_modules/@nc/*


### Usage

1. Register component:
```javascript
register({ componentName: ComponentClass });
```
2. Initialize component
```javascript
runComponent('componentName');
```
or initialize all components
```javascript
run();
```
3. Bind component to DOM
```html
<div data-nc="componentName"
     data-nc-params-componentName="{}"></div>
```

### Example

#### at the component `.entry.` file you should register your component

```javascript
import { register } from '@nc/component-loader';
import { text } from './text.component';

// register your component to be loaded
register({ text });
// if you want to run just this component, eg if you are using http2
// runComponent(text.name or 'text');
```

#### At your main entry file you should run all registered components

```javascript
import {
  observe,
  run
} from '@nc/component-loader';

// Run all registered component - used usually with http1
run();
// Optional: Use observe to initialize new components which  are added to the DOM after initial run.
observe();
```

## API and examples

This version uses standalone functions to allow tree shaking and to only use necessary parts.


### adding it to HTML

Adding one component

```
<div data-nc="Component1"
     data-nc-params-Component1="{}"></div>
```


Adding more than one component

```
<div data-nc="Component1,Component2"
     data-nc-params-Component1="{}"
     data-nc-params-Component2="{}"></div>
```

### register

This method will register components constructor in loaderComponents
You can register individual component, or list

#### Parameters

```
/**
 * Constant with a object that contain collection of components classes.
 * 
 * @param {object} newComponents - Components collection { name: definition }
 * @param {number} [level] - level of inheritance
 */
  const register = (newComponents, level) => {}
```

#### Examples

```javascript

import { register } from '@nc/component-loader';
import { title } from 'components/title';
import { text } from 'components/text';

// Add 2 components named title, and text
register({ title, text });

```
Or you can register several components based on proper named exports

```javascript

import { register } from '@nc/component-loader';
import * as components from 'components';

// register all components exported as proper named exports on components/index.js

register({ components });

```

Level is used in multilevel inheritance, eg if you have one base project with component HTML, 
and want to override just JS part in sub project

1. Base project

```javascript
import { register } from '@nc/component-loader';

class Title {
  init() {
    console.log('level 0 Title');
  }
}

register({ Title }, 0);
```

2. Sub project

```javascript
import { register, components } from '@nc/component-loader';

class Title extends components[0].Title {
  init() {
    console.log('level 1 Title');
  }
}

register({ Title }, 1);
```

### run

This will run the loader on previously registered components.

#### Parameters

```
/**
 *  Run the loader on a element to get all attributes that corresponds to a component
 *  @param {HTMLElement} [element] root element
 *  @param {string} [initAttr] attribut name
 */
  const run = (element = window.document, initAttr = 'data-nc') => {}
```

#### Examples

```javascript

import {
  register,
  run
} from '@nc/component-loader';

// eg components
import { title } from 'components/title';
import { text } from 'components/text';

// Add 2 components named title, and text
register({ title, text });
// then you run so it will create if any HTMLelement with a default attribute have any component to start
run();

// Or load components only on a specific element and search a different attribute like `data-components`
const main = document.querySelector('main');
run(main, 'data-components');
```

### components

Here is just a constant to store the available constructors (functions or classes) of components.
We store it on its own file so it can be imported into separated files and without having to import the other components logic.

If you want to access all components constructors you can just import it in any file like:

```javascript

import { components } from '@nc/component-loader';

```

### instances

This object will store all instances of components separated by [className][instanceId].
We store it on its own file so it can be imported into separated files and without having to import the other components logic.

If you want to access all the instances of components you can just import it in any file like:

```javascript

import { instances } from '@nc/component-loader';

const howManyTitles = instances.title.length;

// eg of querying title components by uuid
const getTitleByUUID = (uuid) => instances.title.filter(instance => instance.el.uuid === uuid);
const mytitle = getTitleByUUID('a8c405b5-1928-46ed-afa1-5a0a3f4dde6c');

```
