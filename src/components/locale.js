(function (window, $, picnic) {

    'use strict';

    function getMessage (messages, message, count)
    {
        if(messages[message])
        {
            if($.isArray(messages[message]))
            {
                var index = 0;
                if(count == 0 || count >= 5)
                {
                    index = 2;
                }
                else if(count > 1 && count < 5)
                {
                    index = 1;
                }
                return messages[message][index];
            }
            return messages[message];
        }
        return null;
    }

    var locale = {
        messages: {},

        t: function(message, params)
        {
            if(params && parseInt(params) == params)
            {
                params = {n: params};
            }
            else
            {
                params = $.extend({n: 1}, params || {});
            }

            var translation = getMessage(this.messages, message, params.n);
            if(translation)
            {
                $.each(params, function(key, value) {
                    var pattern = new RegExp('\{' + key + '\}');
                    translation = translation.replace(pattern, value);
                });

                return translation;
            }
            return message;
        }
    };

    picnic.locale = locale;
    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = picnic.locale;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return picnic.locale; });
	}

}(window, jQuery, window.picnic || {}));
