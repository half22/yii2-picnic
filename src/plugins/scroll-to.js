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
            var offset = target.data('offset') || 0;
            if (position != offset)
            {
                animateScroll(position - offset, function ()
                {
                    if(hash != 'top')
                    {
                        window.replaceHash(hash);
                    }
                });
            }
        }

        return false;
    }

    function animateScroll(top, callback)
    {
        $('html, body').animate({scrollTop: top}, 'fast', null, callback);
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