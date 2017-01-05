# Angular Progress Pie
A simple pie progress indicator for AngularJS. Written in pure Angular, using SVG to render the progress indicator. Tiny, simple and no external dependencies.

### [Plunker Example](https://plnkr.co/edit/1M7QX2Etd0UGhEtvYIRQ?p=preview)

## Contributing
If you have a feature or fix please submit a pull request! This repo follows JavaScript standard style, please make sure all pull requests comply to this before submitting them.

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

[![Circle CI](https://circleci.com/gh/mishguruorg/angular-progress-pie/tree/master.svg?style=svg&circle-token=2c7afd26d9e20abd32ac9843021525f750eeca55)](https://circleci.com/gh/mishguruorg/angular-progress-pie/tree/master)


# Installation
`bower install angular-progress-pie --save`

# Usage
Make sure you inject the dependency into your project

`angular.module('myApp', ['angular-progress-pie'])`

Then you can use the directive by adding the `progress-pie` element to your HTML.

```
<progress-pie 
  radius="{integer}"
  value="{integer}" 
  min="{integer: optional, defaults to 0}"
  max="{integer: optional, defaults to 100}"
  invert-fill="{boolean: optional, defaults to false}"
  hide-background="{boolean: optional, defaults to false}">
</progress-pie>
```                

## Options
 * `radius`  - Integer specifying the radius of the pie. Defaults to 50px.
 * `value`  - Integer percentage between 0 and 100 of how complete the pie is. (note the limits can be changed by setting `max` and `min`)
 * `min` - Integer lower bound of `value`
 * `max` - Integer upper bound of `value`
 * `invert-fill` - Boolean which determines if the pie builds up to a full pie, or shrinks from a full pie to nothing. Defaults to `false` which means the pie starts as nothing when `value` is zero and becomes full when `value` is 100.
  * `hide-background` - Boolean which toggles the background on and off
 
# Styling
You can style the pie using CSS
```
.progress-pie {
  fill: #EFEEDE
}

.progress-pie-background {
  fill: #FFCC03
}
```

## Author
[Ashok Fernandez](https://github.com/ashokfernandez)
