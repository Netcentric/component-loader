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


## API and examples

This version is setup to use standalone functions to improve its use and allow better tree shaking and use of its parts.


### loaderComponents

Here is just a constant to store the available constructors (functions or classes) of components.
We store it on its own file so it can be imported into separeted files and witout having to import the other components logic.

If you want to access all components constructors you can just import it in any file like:

```javascript

import { loaderComponents } from @nc/component-loader/loaderComponents

```

### loaderInstances

This constant will store all instances of components separated by [className][instanceId]
We store it on its own file so it can be imported into separeted files and witout having to import the other components logic.

If you want to access all Intances of components you can just import it in any file like:

```javascript

import { loaderInstances } from @nc/component-loader/loaderInstances

const howManyTitles = loaderInstances.title.length;

// eg of querying title components by uuid
const getTitleByUUID = (uuid) => loaderInstances.title.filter(instance => instance.el.uuid === uuid);
const mytitle = getTitleByUUID('a8c405b5-1928-46ed-afa1-5a0a3f4dde6c');

```

### loaderRegister

This method will register componets constructor in loaderComponents
You can register individual components

```javascript

import { loaderRegister } from @nc/component-loader/loaderRegister
import { title } from 'components/title'
import { text } from 'components/text'

// Add 2 components named title, and text
loaderRegister({ title, text });

```
Or you can register several components based on proper named exports

```javascript

import { loaderRegister } from @nc/component-loader/loaderInstances
import * as components from 'components'
import { text } from 'components/text'

// register all components exported as proper named exports on components/index.js

loaderRegister({ components });

```

### loaderRun

This will run the loader on previous register components

```javascript

import { loaderRegister } from @nc/component-loader/loaderRegister
import { loaderRun } from @nc/component-loader/loaderRun
// eg components
import { title } from 'components/title'
import { text } from 'components/text'

// Add 2 components named title, and text
loaderRegister({ title, text });
// then you run so it will create if any HTMLelement with a default attribute have any component to start
loaderRun();

```
Or you can register several components based on proper named exports

```javascript

import { loaderRegister } from @nc/component-loader/loaderRegister
import { loaderRun } from @nc/component-loader/loaderRun
// eg components
import * as components from 'components'

// register all components exported as proper named exports on components/index.js
loaderRegister({ components });
// load only on a specific element and search a diferent attribute like `data-component`
const main = document.querySelector('main');
loaderRun(main, 'data-component');

```


