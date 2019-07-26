(function(window, $, picnic) {

    'use strict';

    function show(event)
    {
        var target = $(event.currentTarget);

        var bubble = target.findElement('bubble');
        if(!bubble.length)
        {
            bubble = '<span class="c-title-bubble" data-element="bubble"></span>';
            target.append(bubble);
        }

        var title = target.prop('title');
        if(target.data('title') && target.data('title').length)
        {
            title = target.data('title');
        }
        bubble.html(title);
        bubble.show();

        target.prop('title', '');
        target.data('title', title);
    }

    function hide()
    {
        var target = $(event.currentTarget);
        var bubble = target.findElement('bubble');
        bubble.hide();
    }

    $.extend($.fn, {
        picnicTitleBubble: function ()
        {
            return this.each(function (index, domElement) {
                var element = $(domElement);
                if (!element.data('plugin-title-bubble'))
                {
                    element.on('mouseover titleChanged', show);
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