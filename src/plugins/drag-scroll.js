(function(window, $, picnic) {

    'use strict';

    var pushed;
    var lastClientX;
    var lastClientY;


    function onMouseDown(event)
    {
        var element = $(event.currentTarget);
        if (document.elementFromPoint(event.pageX, event.pageY) == element)
        {
            pushed = 1;
            lastClientX = event.clientX;
            lastClientY = event.clientY;

            event.preventDefault();
        }
    }

    function onMouseUp(event)
    {
        pushed = 0;
    }

    function onMouseMove(event)
    {
        var element = $(event.currentTarget);
        if (pushed)
        {
            var newScrollX = - lastClientX + event.clientX;
            lastClientX = event.clientX;

            var newScrollY = - lastClientY + event.clientY;
            lastClientY = event.clientY;

            element.scrollLeft -= newScrollX;
            element.scrollTop -= newScrollY;
        }
    }

    function dragScroll(element)
    {
        element.on('mousedown', onMouseDown);
        element.on('mouseup', onMouseUp);
        element.on('mousemove', onMouseMove);
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
