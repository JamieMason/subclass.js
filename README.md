# subclass.js

> Inherit, extend, decorate, and override JavaScript Classes and Instances.

[![NPM version](http://img.shields.io/npm/v/subclass.svg?style=flat-square)](https://www.npmjs.com/package/subclass)
[![NPM downloads](http://img.shields.io/npm/dm/subclass.svg?style=flat-square)](https://www.npmjs.com/package/subclass)
[![Build Status](http://img.shields.io/travis/JamieMason/subclass.js/master.svg?style=flat-square)](https://travis-ci.org/JamieMason/subclass.js)
[![Maintainability](https://api.codeclimate.com/v1/badges/TODO_TODO_TODO/maintainability)](https://codeclimate.com/github/JamieMason/subclass.js/maintainability)
[![Gitter Chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/JamieMason/subclass.js)
[![Donate via PayPal](https://img.shields.io/badge/donate-paypal-blue.svg)](https://www.paypal.me/foldleft)
[![Backers](https://opencollective.com/fold_left/backers/badge.svg)](https://opencollective.com/fold_left#backer)
[![Sponsors](https://opencollective.com/fold_left/sponsors/badge.svg)](https://opencollective.com/fold_left#sponsors)
[![Analytics](https://ga-beacon.appspot.com/UA-45466560-5/subclass.js?flat&useReferer)](https://github.com/igrigorik/ga-beacon)
[![Follow JamieMason on GitHub](https://img.shields.io/github/followers/JamieMason.svg?style=social&label=Follow)](https://github.com/JamieMason)
[![Follow fold_left on Twitter](https://img.shields.io/twitter/follow/fold_left.svg?style=social&label=Follow)](https://twitter.com/fold_left)

## Small Size

349 bytes (minified and gzipped).

## Simple API

Subclass `Extendable` to create your first class.

```js
var Car = Extendable.extend(function(options) {
  /* constructor */
})
  .shared({
    /* prototype members */
  })
  .statics({
    /* static members */
  });
```

Which itself can be subclassed.

```js
const Audi = Car.extend(/* ... */);
const Toyota = Car.extend(/* ... */);
```

And whose subclasses can also be subclassed.

```js
const AudiHatchback = Audi.extend(/* ... */);
const ToyotaHatchback = Toyota.extend(/* ... */);
```
