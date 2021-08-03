(function(window, $, picnic) {

    'use strict';

    function onClick(event)
    {
        $('html, body').animate({scrollTop: 0}, 'fast');

        return false;
    }

    $.extend($.fn, {
        picnicScrollTop: function ()
        {
            return this.each(function (index, domElement) {
                var element = $(domElement);
                if (!element.data('plugin-scroll-top')) {
                    element.on('click', onClick);
                    element.data('plugin-scroll-top', true);
                }
            });
        }
    });

    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = $.fn.picnicScrollTop;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return $.fn.picnicScrollTop; });
	}

})(window, jQuery, window.picnic || {});