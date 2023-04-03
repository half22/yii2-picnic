(function(window, $, picnic) {

    'use strict';

    function adjustSource(source)
    {
        if(source.match('webp'))
        {
            if(!isWebpSupported())
            {
                return source.replace('webp', 'jpg');
            }
        }
        return source;
    }

    function canPreload(element)
    {
        return element.data('preload-src') || element.data('preload-background');
    }

    function preload(element)
    {
        if(element.data('is-image-loaded')) return;

        if (element.data('preload-src'))
        {
            preloadSrc(element, element.data('preload-src'), updateSrc);
        }
        else if (element.data('preload-background'))
        {
            preloadSrc(element, element.data('preload-background'), updateBackground);
        }
    }

    function preloadSrc(element, source, updateCallback)
    {
        var image = new Image();
        source = adjustSource(source);
        image.onload = function ()
        {
            updateCallback(element, source);
            load(element);
        };
        image.src = source;
    }

    function load(element)
    {
        if (element.data('src'))
        {
            loadSrc(element, element.data('src'), updateSrc);
        }
        else if (element.data('background'))
        {
            loadSrc(element, element.data('background'), updateBackground);
        }
    }

    function loadSrc(element, source, updateCallback)
    {
        var image = new Image();
        source = adjustSource(source);
        image.onload = function ()
        {
            updateCallback(element, source);
            element.addClass('is-image-loaded');
            element.data('is-image-loaded', 1);

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
        picnicLazyLoad: function ()
        {
            return this.each(function (index, domElement) {
                var element = $(domElement);
                if (!element.data('plugin-lazy-load'))
                {
                    if(canPreload(element))
                    {
                        preload(element);
                    }
                    else
                    {
                        load(element);
                    }

                    element.data('plugin-lazy-load', true);
                }
            });
        }
    });

    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = $.fn.picnicLazyLoad;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return $.fn.picnicLazyLoad; });
	}

})(window, jQuery, window.picnic || {});