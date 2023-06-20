(function(window, $, picnic) {

    'use strict';

    function initAll(elements)
    {
        elements.each(function (index, domElement) {
            var element = $(domElement);
            if (!element.data('plugin-sticky'))
            {
                if(element.is(':visible'))
                {
                    init(element);
                    createPlaceholder(element);

                    var scrollElement = element.data('scroll-element') ? element.closest(element.data('scroll-element')) : $(window);
                    scrollElement.on('scroll', function ()
                    {
                        onScroll(scrollElement, element);
                    });
                    setTimeout(function ()
                    {
                        onScroll(scrollElement, element);
                    }, 100);

                    element.data('plugin-sticky', true);
                }
            }
        });
    }

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
                element.after(placeholder);
                placeholder.height(element.outerHeight());
                element.data('placeholder', placeholder);
            }
        }
    }

    function showPlaceholder(element)
    {
        var placeholder = element.data('placeholder');
        if(placeholder && placeholder.length)
        {
            if(!element.hasClass('is-sticky'))
            {
                placeholder.height(element.outerHeight());
            }

            placeholder.show();
        }
    }

    function hidePlaceholder(element)
    {
        var placeholder = element.data('placeholder');
        if(placeholder && placeholder.length)
        {
            placeholder.hide();
        }
    }

    function onScroll(scrollElement, element)
    {
        var scrollTop = scrollElement.scrollTop();
        var topBoundary = parseInt(element.data('top-boundary') || 0);
        var offsetTop = element.data('offset-top') - topBoundary;

        console.log('EH: ' + element.height());
        console.log('WH: ' + $(window).height());
        console.log('OT: ' + offsetTop);
        console.log('ST: ' + scrollTop);
        if(element.height() < $(window).height())
        {
            if(offsetTop <= scrollTop)
            {
                activate(element);
                return;
            }
        }

        deactivate(element);
    }

    function activate(element)
    {
        showPlaceholder(element);

        var activation = false;
        if(!element.hasClass('is-sticky'))
        {
            activation = true;
            picnic.event.trigger('picnic.sticky.activate', element);
        }

        var top = 0;
        if(element.data('top-boundary'))
        {
            top = element.data('top-boundary');
        }

        if(element.data('bottom-barrier'))
        {
            var barrier = $(element.data('bottom-barrier'));
            if(barrier.length)
            {
                if(top + element.outerHeight(true) > barrier.offset().top - $(window).scrollTop())
                {
                    top -= (top + element.outerHeight(true)) - (barrier.offset().top - $(window).scrollTop());
                }
            }
        }

        element.css('position' , 'fixed');
        element.css('z-index' , 500);
        element.css('top' , top);
        element.width(element.data('width'));
        element.addClass('is-sticky');

        if(activation)
        {
            picnic.event.trigger('picnic.sticky.activated', element);
        }
    }

    function deactivate(element)
    {
        var deactivation = false;
        if(element.hasClass('is-sticky'))
        {
            deactivation = true;
            picnic.event.trigger('picnic.sticky.deactivate', element);
        }

        element.attr('style' , '');
        element.removeClass('is-sticky');

        hidePlaceholder(element);

        if(deactivation)
        {
            picnic.event.trigger('picnic.sticky.deactivated', element);
        }
    }

    $.extend($.fn, {
        picnicSticky: function ()
        {
            var domElements = this;
            $(window).on('resize', function() { initAll(domElements); });
            initAll(domElements);
            return domElements;
        }
    });

    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = $.fn.picnicSticky;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return $.fn.picnicSticky; });
	}

})(window, jQuery, window.picnic || {});