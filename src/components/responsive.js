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

    var responsive = {
        resolutions: {},

        is: function(resolution)
        {
            if(this.resolutions[resolution])
            {
                var dimension = this.resolutions[resolution][2] == 'height' ? $(window).height() : $(window).width();
                if(dimension <= this.resolutions[resolution][1] && dimension >= this.resolutions[resolution][0])
                {
                    return true;
                }
            }
            return false;
        },

        onScroll: function ()
        {
            $.each(this.resolutions, function (key, value)
            {
                $('body').toggleClass(key, this.is(key));
            }.bind(this))
        },

        run: function ()
        {
            this.onScroll();
            $(window).on('scroll', this.onScroll.bind(this));
        }
    };

    picnic.responsive = responsive;
    window.picnic = picnic;

    if(typeof exports === 'object')
    {
        module.exports = picnic.responsive;
    }
    else if(typeof define === 'function' && define.amd)
    {
        define(function() { return picnic.responsive; });
    }

}(window, jQuery, window.picnic || {}));
