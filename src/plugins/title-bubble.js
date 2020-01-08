(function(window, $, picnic) {

    'use strict';

    function titleChanged(event)
    {
        var target = $(event.currentTarget);
        var bubble = getBubble(target);
        updateTitle(target, bubble);
    }

    function updateTitle(element, bubble)
    {
        var title = element.prop('title');
        if(element.data('title') && element.data('title').length)
        {
            title = element.data('title');
        }

        bubble.html(title);

        element.prop('title', '');
        element.data('title', title);
    }

    function getBubble(element)
    {
        var bubble = element.findElement('bubble');
        if(!bubble.length)
        {
            bubble = $('<span class="c-title-bubble" data-element="bubble"></span>');
            element.append(bubble);
            bubble.hide();
        }

        return bubble;
    }

    function show(event)
    {
        var target = $(event.currentTarget);
        var bubble = getBubble(target);
        updateTitle(target, bubble);

        bubble.show();
        adjustPixelPerfectSize(bubble);
    }

    function hide()
    {
        var target = $(event.currentTarget);
        var bubble = getBubble(target);
        bubble.hide();
    }

    function adjustPixelPerfectSize(bubble)
    {
        bubble.roundTransformationMatrixValues();
    }

    $.extend($.fn, {
        picnicTitleBubble: function ()
        {
            return this.each(function (index, domElement) {
                var element = $(domElement);
                if (!element.data('plugin-title-bubble'))
                {
                    element.on('titleChanged', titleChanged);
                    element.on('mouseover', show);
                    element.on('mouseout', hide);
                    element.data('plugin-title-bubble', true);
                }
            });
        }
    });

    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = $.fn.picnicTitleBubble;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return $.fn.picnicTitleBubble; });
	}

})(window, jQuery, window.picnic || {});