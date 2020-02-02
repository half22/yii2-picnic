(function (window, $, picnic) {

    'use strict';

    var router = {
        rules: {},

        getUrl: function(route, params)
        {
            var url = this.rules[route] ? this.rules[route] : route;
            if(isDefined(params))
            {
                url += '?' + $.param(params);
            }
            return url;
        }
    };

    picnic.router = router;
    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = picnic.router;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return picnic.router; });
	}

}(window, jQuery, window.picnic || {}));
