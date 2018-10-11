# Component loader ( Version with Functions )

## Table of Changes

| Problem                                           | Solution                              |
|---------------------------------------------------|---------------------------------------|
| components asynchronous, not blocking event loop  | async function                        |
| singleton vs static class vs function exports     | splited into functions                |
| Registering sintax                                | ```loaderRegister({ component })```   |
| Used named exports vs export default              | Named exports                         |
| configurable data attribute?                      | function param defaults               |
| Object for component list vs Set with name inside | Object for component list             |
| Mutation Observer vs AEM edit Iframe Postmessage  | Mutation Observer                     |
| Iteration over nodes instead of components        | Nodes define with components to init  |


# how to use it on your project


### Installation

1 - Make sure you have your ~/.npmrc file setup (see ["How can I install an NPM-NC package globally for my local user's account?"](https://projects.netcentric.biz/wiki/display/FRONTEND/Netcentric%27s+NPM+Repository+-+NPM-NC) )

2 - Run ```npm install --save @nc/component-loader```


### A Regular project setup

#### At your main entry file you should run it

```javascript
import {
  observe as loaderObserve,
  run as loaderRun,
} from '@nc/component-loader';

// do a first run
loaderRun();
// observe if new components are added to the DOM after that.
loaderObserve();

```

#### at the component `.entry.` file you should register your component

```javascript
import { register as loaderRegister } from '@nc/component-loader';
import { text } from './text.component';

// register your component to be loaded
loaderRegister({ text });

```

## API and examples

This version uses standalone functions to allow tree shaking and to only use necessary parts.


### adding it to HTML

Adding one component

```<div data-nc="Component1"
     data-nc-params-Component1="{}"></div>```


Adding more than one component

```<div data-nc="Component1,Component2"
     data-nc-params-Component1="{}"
     data-nc-params-Component2="{}"></div>```


### components

Here is just a constant to store the available constructors (functions or classes) of components.
We store it on its own file so it can be imported into separeted files and witout having to import the other components logic.

If you want to access all components constructors you can just import it in any file like:

```javascript

import { components as loaderComponents } from @nc/component-loader

```

### instances

This object will store all instances of components separated by [className][instanceId].
We store it on its own file so it can be imported into separeted files and witout having to import the other components logic.

If you want to access all the intances of components you can just import it in any file like:

```javascript

import { instances as loaderInstances } from @nc/component-loader;

const howManyTitles = loaderInstances.title.length;

// eg of querying title components by uuid
const getTitleByUUID = (uuid) => loaderInstances.title.filter(instance => instance.el.uuid === uuid);
const mytitle = getTitleByUUID('a8c405b5-1928-46ed-afa1-5a0a3f4dde6c');

```

### register

This method will register componets constructor in loaderComponents
You can register individual components

```javascript

import { register as loaderRegister } from @nc/component-loader
import { title } from 'components/title';
import { text } from 'components/text';

// Add 2 components named title, and text
loaderRegister({ title, text });

```
Or you can register several components based on proper named exports

```javascript

import { register as loaderRegister } from @nc/component-loader
import * as components from 'components';

// register all components exported as proper named exports on components/index.js

loaderRegister({ components });

```

### run

This will run the loader on previous register components

```javascript

import {
  register as loaderRegister,
  run as loaderRun
} from @nc/component-loader;

// eg components
import { title } from 'components/title';
import { text } from 'components/text';

// Add 2 components named title, and text
loaderRegister({ title, text });
// then you run so it will create if any HTMLelement with a default attribute have any component to start
loaderRun();

```
Or you can register several components based on proper named exports

```javascript

import {
  register as loaderRegister,
  run as loaderRun
} from @nc/component-loader;

// eg components
import * as components from 'components';

// register all components exported as proper named exports on components/index.js
loaderRegister({ components });
// load only on a specific element and search a diferent attribute like `data-component`
const main = document.querySelector('main');
loaderRun(main, 'data-component');

```