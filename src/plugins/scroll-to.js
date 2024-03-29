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

            if(target.data('container'))
            {
                var scrollContainer = $('#' + target.data('container'));
                position = element.offset().top - scrollContainer.offset().top + scrollContainer.scrollTop();
            }

            if(isMobile() && target.data('mobile-offset'))
            {
                offset = target.data('mobile-offset');
            }
            else if(target.data('offset'))
            {
                offset = target.data('offset');
            }
            else if(target.data('offset-from-element-height'))
            {
                offset = $('#' + target.data('offset-from-element-height')).height();
            }
            else if(isMobile() && element.data('mobile-offset'))
            {
                offset = element.data('mobile-offset');
            }
            else if(element.data('offset'))
            {
                offset = element.data('offset');
            }
            else if(element.data('offset-from-element-height'))
            {
                offset = $('#' + element.data('offset-from-element-height')).height();
            }

            var container = target.data('container') ? $('#' + target.data('container')) : $('html, body');
            animateScroll(container, position - offset, function ()
            {
                if(!target.data('dont-replace-hash'))
                {
                    picnic.url.replaceHash(hash);
                }
            });
        }

        return false;
    }

    function animateScroll(container, top, callback)
    {
        container.animate({scrollTop: Math.max(0, top)}, 'fast', null, callback);
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