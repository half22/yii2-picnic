(function (window, $, picnic) {

    'use strict';

    var router = {
        rules: {},

        getUrl: function(route)
        {
            return this.rules[route] ? this.rules[route] : route;
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
