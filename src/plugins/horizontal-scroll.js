(function(window, $, picnic) {

    'use strict';

    $.extend($.fn, {
        picnicHorizontalScroll: function ()
        {
            var elements = this;
            elements.each(function (index, domElement) {
                var element = $(domElement);
                var activeElement = element.find('.is-active,.active').first();
                if(activeElement.length)
                {
                    element.scrollLeft(0).scrollLeft(activeElement.offset().left - element.width() / 2);
                }
            });

            return elements;
        }
    });

    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = $.fn.picnicHorizontalScroll;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return $.fn.picnicHorizontalScroll; });
	}

})(window, jQuery, window.picnic || {});
