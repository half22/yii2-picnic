(function(window) {

    window.ucfirst = function(string)
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    window.isUndefined = function(value)
    {
        return typeof value === 'undefined' || value === null;
    };

    window.isDefined = function(value)
    {
        return !isUndefined(value);
    };

    window.isFunction = function(value)
    {
        return typeof value === 'function';
    };

    window.camelCase = function(string)
    {
        return string.replace(/^([A-Z])|[\s-_](\w)/g, function (match, p1, p2, offset)
        {
            if (p2) return p2.toUpperCase();
            return p1.toLowerCase();
        });
    };

    window.getTransitionEndEvent = function(element)
    {
        var transitions = {
            'transition' : 'transitionend',
            'WebkitTransition' : 'webkitTransitionEnd',
            'MozTransition' : 'transitionend',
            'OTransition' : 'oTransitionEnd otransitionend'
        };
        var domElement = element.get(0);

        for(var t in transitions)
        {
            if(domElement.style[t] !== undefined)
            {
                return transitions[t];
            }
        }
    };

    window.isMobile = function()
    {
        return ('ontouchstart' in document.documentElement);
    };

    window.isIOS = function ()
    {
        return false;
        return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    };

}(window));