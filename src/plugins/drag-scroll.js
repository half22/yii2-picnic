(function(window, $, picnic) {

    'use strict';

    function onMouseDown(event, element)
    {
        element.data('dragScrollActive', 1);
        element.data('lastClientX', event.clientX);
        element.data('lastClientY', event.clientY);

        event.preventDefault();
    }

    function onMouseUp(event, element)
    {
        element.data('dragScrollActive', 0);
        picnic.event.trigger('picnic.dragScroll.end', element);
    }

    function onMouseMove(event, element)
    {
        if (element.data('dragScrollActive'))
        {
            var newScrollX = - element.data('lastClientX') + event.clientX;
            element.data('lastClientX', event.clientX);

            var newScrollY = - element.data('lastClientY') + event.clientY;
            element.data('lastClientY', event.clientY)

            element.get(0).scrollLeft -= newScrollX;
            element.get(0).scrollTop -= newScrollY;
        }
    }

    function dragScroll(element)
    {
        element.on('mousedown', function(event) { onMouseDown(event, element); });
        $(window).on('mouseup', function(event) { onMouseUp(event, element); });
        $(window).on('mousemove', function(event) { onMouseMove(event, element); });
    }

    $.extend($.fn, {
        picnicDragScroll: function ()
        {
            return this.each(function (index, domElement) {
                var element = $(domElement);
                if (!element.data('plugin-drag-scroll')) {
                    dragScroll(element);
                    element.data('plugin-drag-scroll', true);
                }
            });
        }
    });

    window.picnic = picnic;

    if(typeof exports === 'object')
    {
        module.exports = $.fn.picnicClicked;
    }
    else if(typeof define === 'function' && define.amd)
    {
        define(function() { return $.fn.picnicClicked; });
    }

})(window, jQuery, window.picnic || {});
