(function (window, $, picnic) {

    'use strict';

    var url = {

        base: function ()
        {
            return window.location.pathname;
        },

        current: function (params)
        {
            var url = this.base();
            var queryString = $.extend(this.queryStringToJson(), params);
            $.each(params, function (key, value)
            {
                if(value === null)
                {
                    delete queryString[key];
                }
            });
            return url + (jQuery.isEmptyObject(queryString) ? '' : ('?' + $.param(queryString)));
        },

        queryStringToJson: function()
        {
            var query = window.location.search;
            if (query.length == 0) return {};
        
            query = query.substring(query.indexOf('?') + 1);
        
            var re = /([^&=]+)=?([^&]*)/g;
            var decodeRE = /\+/g;
        
            var decode = function (str)
            {
                return decodeURIComponent(str.replace(decodeRE, " "));
            };
        
            var params = {}, e;
            while (e = re.exec(query))
            {
                var k = decode(e[1]), v = decode(e[2]);
                if (k.substring(k.length - 2) === '[]')
                {
                    k = k.substring(0, k.length - 2);
                    (params[k] || (params[k] = [])).push(v);
                }
                else params[k] = v;
            }
        
            var assign = function (obj, keyPath, value)
            {
                var lastKeyIndex = keyPath.length - 1;
                for (var i = 0; i < lastKeyIndex; ++i)
                {
                    var key = keyPath[i];
                    if (!(key in obj))
                        obj[key] = {};
                    obj = obj[key];
                }
                obj[keyPath[lastKeyIndex]] = value;
            };
        
            for (var prop in params)
            {
                var structure = prop.split('[');
                if (structure.length > 1)
                {
                    var levels = [];
                    structure.forEach(function (item, i)
                    {
                        var key = item.replace(/[?[\]\\ ]/g, '');
                        levels.push(key);
                    });
                    assign(params, levels, params[prop]);
                    delete(params[prop]);
                }
            }
            return params;
        },

        replaceHash: function (newhash)
        {
            if ('replaceState' in history)
            {
                if ((''+newhash).charAt(0) !== '#') newhash = '#' + newhash;
                history.replaceState('', '', newhash);
            }
            else
            {
                var hash = location.hash;
                if (location.hash !== hash) history.back();
                location.hash = newhash;
            }
        }
    };

    picnic.url = url;
    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = picnic.url;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return picnic.url; });
	}

}(window, jQuery, window.picnic || {}));

