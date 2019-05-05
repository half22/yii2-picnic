(function(window, $, picnic) {

    'use strict';

    function init(element)
    {
        var offsetTop = element.offset().top;
        element.data('offset-top', offsetTop);
        element.data('width', element.width());
    }

    function createPlaceholder(element)
    {
        if(!element.data('no-placeholder'))
        {
            if(!element.data('placeholder'))
            {
                var placeholder = $('<div/>');
                placeholder.hide();
                placeholder.height(element.outerHeight());
                element.after(placeholder);
                element.data('placeholder', placeholder);
            }
        }
    }

    function onScroll(scrollElement, element)
    {
        var scrollTop = scrollElement.scrollTop();
        var scrollLimit = parseInt(element.data('scroll-limit') || 0);
        var topAnchor = parseInt(element.data('top-anchor') || 0);
        var offsetTop = element.data('offset-top') - topAnchor;

        if(element.height() < $(window).height())
        {
            if (scrollLimit)
            {
                if(scrollTop >= scrollLimit)
                {
                    activate(element);
                    return;
                }
            }
            else
            {
                if(offsetTop <= scrollTop)
                {
                    activate(element);
                    return;
                }
            }
        }

        deactivate(element);
    }

    function activate(element)
    {
        var top = 0;
        if(element.data('top-anchor'))
        {
            top = element.data('top-anchor');
        }

        if(element.data('bottom-barrier'))
        {
            var barrier = $('.' + element.data('bottom-barrier'));
            if(barrier.length)
            {
                if(top + element.outerHeight() > barrier.offset().top - $(window).scrollTop())
                {
                    top -= (top + element.outerHeight()) - (barrier.offset().top - $(window).scrollTop());
                }
            }
        }

        element.css('position' , 'fixed');
        element.css('z-index' , 500);
        element.css('top' , top);
        element.width(element.data('width'));
        element.addClass('is-sticky');
        element.data('placeholder').show();
    }

    function deactivate(element)
    {
        element.data('placeholder').hide();
        element.attr('style' , '');
        element.removeClass('is-sticky');
    }

    var sticky = function(elements)
	{
	    return elements.each(function (index, domElement)
        {
            var element = $(domElement);
            if(!element.data('plugin-sticky'))
            {
                init(element);
                createPlaceholder(element);

                var scrollElement = element.data('scroll-element') ? element.closest(element.data('scroll-element')) : $(window);
                scrollElement.on('scroll', function () {
                    onScroll(element);
                });
                onScroll(scrollElement, element);

                element.data('plugin-sticky', true);
            }
        });
	};

    picnic.plugins.sticky = sticky;
    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = picnic.plugins.sticky;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return picnic.plugins.sticky; });
	}

})(window, jQuery, window.picnic || {});
