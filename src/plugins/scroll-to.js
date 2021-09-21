(function(window, $, picnic) {

    'use strict';

    function onClick(event)
    {
        var target = $(event.currentTarget);
        var hash = target.attr('href').replace('#', '');
        var element = $("a[name='" + hash + "']");
        if(element.length)
        {
            var position = element.offset().top;
            var offset = 0;
            if(target.data('offset'))
            {
                offset = target.data('offset');
            }
            else if(target.data('offset-from-element-height'))
            {
                offset = $('#' + target.data('offset-from-element-height')).height();
            }
            else if(element.data('offset'))
            {
                offset = element.data('offset');
            }
            else if(element.data('offset-from-element-height'))
            {
                offset = $('#' + element.data('offset-from-element-height')).height();
            }
            if(target.data('container'))
            {
                position += $('#' + target.data('container')).scrollTop();
            }
            if (position != offset)
            {
                var container = target.data('container') ? $('#' + target.data('container')) : $('html, body');
                animateScroll(container, position - offset, function ()
                {
                    if(!target.data('dont-replace-hash'))
                    {
                        picnic.url.replaceHash(hash);
                    }
                });
            }
        }

        return false;
    }

    function animateScroll(container, top, callback)
    {
        container.animate({scrollTop: top}, 'fast', null, callback);
    }

    $.extend($.fn, {
        picnicScrollTo: function ()
        {
            return this.each(function (index, domElement) {
                var element = $(domElement);
                if (!element.data('plugin-scroll-to')) {
                    element.on('click', onClick);
                    element.data('plugin-scroll-to', true);
                }
            });
        }
    });

    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = $.fn.picnicScrollTo;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return $.fn.picnicScrollTo; });
	}

})(window, jQuery, window.picnic || {});