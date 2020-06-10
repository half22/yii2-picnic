(function (window)
{

    window.ucfirst = function (string)
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    window.isUndefined = function (value)
    {
        return typeof value === 'undefined' || value === null;
    };

    window.isDefined = function (value)
    {
        return !isUndefined(value);
    };

    window.isFunction = function (value)
    {
        return typeof value === 'function';
    };

    window.camelCase = function (string)
    {
        return string.replace(/^([A-Z])|[\s-_](\w)/g, function (match, p1, p2, offset)
        {
            if (p2) return p2.toUpperCase();
            return p1.toLowerCase();
        });
    };

    window.getTransitionEndEvent = function (element)
    {
        var transitions = {
            'transition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd otransitionend'
        };
        var domElement = element.get(0);

        for (var t in transitions)
        {
            if (domElement.style[t] !== undefined)
            {
                return transitions[t];
            }
        }
    };

    window.getAnimationEndEvent = function (element)
    {
        var animations = {
            'animation': 'animationend',
            'WebkitAnimation': 'webkitAnimationEnd',
            'MozAnimation': 'animationend',
            'OAnimation': 'oAnimationEnd MSAnimationEnd'
        };
        var domElement = element.get(0);

        for (var a in animations)
        {
            if (domElement.style[a] !== undefined)
            {
                return animations[a];
            }
        }
    };

    window.isMobile = function ()
    {
        return ('ontouchstart' in document.documentElement);
    };

    window.isIOS = function ()
    {
        return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    };

    window.isWebpSupported = function ()
    {
        var elem = document.createElement('canvas');

        if (!!(elem.getContext && elem.getContext('2d')))
        {
            return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
        }

        return false;
    };

    //IE polyfill
    if (!Array.prototype.find)
    {
        Object.defineProperty(Array.prototype, 'find', {
            value: function (predicate)
            {
                // 1. Let O be ? ToObject(this value).
                if (this == null)
                {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this);

                // 2. Let len be ? ToLength(? Get(O, "length")).
                var len = o.length >>> 0;

                // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                if (typeof predicate !== 'function')
                {
                    throw new TypeError('predicate must be a function');
                }

                // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                var thisArg = arguments[1];

                // 5. Let k be 0.
                var k = 0;

                // 6. Repeat, while k < len
                while (k < len)
                {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                    // d. If testResult is true, return kValue.
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o))
                    {
                        return kValue;
                    }
                    // e. Increase k by 1.
                    k++;
                }

                // 7. Return undefined.
                return undefined;
            }
        });
    }


}(window));