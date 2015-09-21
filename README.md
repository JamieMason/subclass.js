# subclass.js

> A small and simple way to inherit, extend, decorate, and override JavaScript classes and instances in an efficient and convenient manner.

## Small Size

349 bytes (minified and gzipped).

## Simple API

Subclass `Extendable` to create your first class.

```javascript
var Car = Extendable.extend(function(options) {
  // ... constructor
}).shared({
  // ... prototype members
}).statics({
  // ... static members
});
```

Which itself can be subclassed.

```javascript
var Audi = Car.extend( /* ... */ );
var Toyota = Car.extend( /* ... */ );
```

And whose subclasses can also be subclassed.

```javascript
var AudiHatchback = Audi.extend( /* ... */ );
var ToyotaHatchback = Toyota.extend( /* ... */ );
```
