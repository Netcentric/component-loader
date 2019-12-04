# Change Log

## Unreleased


### v.0.1.11 (HECORE-48)
- add multilevel support for same name components
- fix runComponent selector

### v.0.1.10 (NPMNC-98)
- Same API kept 
- Split functionalities to be used stand alone 
- runComponent (splitted) for running one component scan and initialisation
- scan (splitted) for scanning the DOM
- factory (splitted) for actually factoring the components
- domReady (new) for cases where scripts are not deferred.


### Added
- Multiple component support and params fixes

## [0.1.4] - 2018-10-05
### Added
- Async problem when node_modules is transpiled error is:
`Uncaught ReferenceError: regeneratorRuntime is not defined`
Solution was add some very expensive babel polyfills, return to timeout

## [0.1.3] - 2018-10-05
### Added
- Fix on transpilations

## [0.1.2] - 2018-10-05
### Added
- Component loader deconstructed into functions
