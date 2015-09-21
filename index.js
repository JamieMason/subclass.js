'use strict';

/**
 * @class
 * @classdesc
 * Extendable is a small and simple way to inherit, extend, decorate, and override JavaScript classes
 * and instances in an efficient and convenient manner.
 */

function Extendable() {

}

/**
 * Copies every member of source onto the instance object.<br><br>
 *
 * For members that are Objects or Functions; a live reference will point to the original, but
 * simple primitives will be literally copied, occupying more memory.<br><br>
 *
 * As a general rule, data (or “state”) should be stored on instances with functions (or
 * “behaviour”) being shared between instances on the prototype.<br><br>
 *
 * If your application is regularly decorating multiple instances with the same behaviour — for
 * better memory management — consider moving that behaviour into a class and sharing it between
 * those instances instead.
 *
 * @method
 * @memberof Extendable.prototype
 * @param {Object} source
 */

var decorate = Extendable.prototype.decorate = function(source) {
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            this[key] = source[key];
        }
    }
};

/**
 * Decorates the supplied constructor function with the {@link Extendable.extend} static method.
 * The decorated function is bound to ParentClass and creates subclasses of ParentClass.
 *
 * @memberOf Extendable
 * @inner
 * @param {Function} ParentClass
 * @return {Function} ParentClass
 */

function extendable(ParentClass) {

    /**
     * Decorates the supplied constructor function to create subclasses of this class.<br>
     * It is possible to repeatedly create subclasses of subclasses in exactly the same way.
     *
     * @name Extendable.extend
     * @param {Function} ChildClass
     * @return {Function} ChildClass
     */

    ParentClass.extend = function(_ChildClass) {

        var ChildClass = _ChildClass || function() {};

        /**
         * ParentClass.prototype is a single object shared by every single instance created by that
         * class, or any of it's subclasses. For this reason it's important that if we need to change
         * anything to better suit our new class or any of it's instances, that we don't actually modify
         * the ParentClass.prototype object itself — as this would result in that value being changed
         * for every other object using it.<br><br>
         *
         * Instead we use Object.create, which creates an new empty object with ParentClass.prototype
         * sitting behind it. What this does is allows values to be read from ParentClass.prototype as
         * normal, but any writes are made to the empty object instead — leaving ParentClass.prototype
         * intact.<br><br>
         *
         * This applies if you are replacing entire values on this object, if you change a property
         * which is an object then what you are doing is making a direct change to that object which you
         * have a live reference to, not a copy — so your changes will be picked up by every other part
         * of your application which also has a live reference to that same object.
         *
         * @name Extendable.prototype
         * @type {Object}
         */

        var prototype = ChildClass.prototype = Object.create(ParentClass.prototype);

        /**
         * Through having replaced the entire prototype object above, we should reinstate the
         * constructor property to reference the correct constructor all instances are created from.
         *
         * @name Extendable.prototype.constructor
         * @type {Function}
         */

        prototype.constructor = ChildClass;

        /**
         * Helper to create a decorator for statics and prototype members which is chainable.
         *
         * @private
         * @param {Object} target
         * @return {Function} Extendable
         */

        function decorator(target) {
            return decorateTarget;

            function decorateTarget(source) {
                decorate.call(target, source);
                return ChildClass;
            }
        }

        /**
         * Decorate your new subclass's constructor with the supplied static methods and properties.
         *
         * @method
         * @name Extendable.statics
         * @param {Object} source
         * @return {Function} The Extendable Constructor.
         */

        ChildClass.statics = decorator(ChildClass);

        /**
         * Share the supplied methods and properties between every instance created by your new
         * subclass.
         *
         * @method
         * @name Extendable.shared
         * @param {Object} source
         * @return {Function} The Extendable Constructor.
         */

        ChildClass.shared = decorator(prototype);

        /**
         * Create a new instance of your subclass. The default behaviour is to pass an options object to
         * the constructor, this can be overridden using {@link Extendable.factory}.
         *
         * @method
         * @name Extendable.create
         * @param {Object} [options]
         * @return {Object} A new instance of Extendable.
         */

        ChildClass.create = ParentClass.create || extendableClassFactory;

        // Allow the new subclass to itself be extended further still, by repeating this process with
        // ChildClass as the ParentClass.
        extendable(ChildClass);

        return ChildClass;

        function extendableClassFactory(options) {
            return new this(options || {});
        }

    };

    return ParentClass;

}

// On it's own, Extendable is a normal constructor with a single decorate method on it's prototype.
// It's the recursive extendable mixin which does the work. Extendable is used as a starting point to
// create your other classes from.
extendable(Extendable);

module.exports = Extendable;
