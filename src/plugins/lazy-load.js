(function(window, $, picnic) {

    'use strict';

    function load(element, source, updateCallback)
    {
        var image = new Image();

        image.onload = function ()
        {
            updateCallback(element, source);
            element.addClass('is-image-loaded');

            picnic.event.trigger('picnic.lazyLoad.loaded', element);
        };
        image.src = source;
    }

    function updateSrc(element, source)
    {
        element.attr('src', source);
    }

    function updateBackground(element, source)
    {
        element.css('background-image', 'url(' + source + ')');
    }

    $.extend($.fn, {
        lazyLoad: function ()
        {
            return this.each(function (index, domElement) {
                var element = $(domElement);
                if (!element.data('plugin-lazy-load')) {
                    if (element.data('src')) {
                        load(element, element.data('src'), updateSrc);
                    } else if (element.data('background')) {
                        load(element, element.data('background'), updateBackground);
                    }

                    element.data('plugin-lazy-load', true);
                }

            });
        }
    });

    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = $.fn.lazyLoad;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return $.fn.lazyLoad; });
	}

})(window, jQuery, window.picnic || {});