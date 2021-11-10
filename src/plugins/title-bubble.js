(function(window, $, picnic) {

    'use strict';

    function convertContentToTitle(element)
    {
        element.prop('title', element.html());
        element.empty();
    }

    function updateTitle(element, bubble, bubbleClone)
    {
        var title = element.prop('title');
        if(element.data('title') && element.data('title').length)
        {
            title = element.data('title');
        }

        bubble.html(title);
        bubbleClone.html(title);

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

    function cloneBubble(bubble)
    {
        var bubbleClone = bubble.clone();
        $('body').append(bubbleClone);

        return bubbleClone;
    }

    function show(element, bubble, bubbleClone)
    {
        updateTitle(element, bubble, bubbleClone);

        bubble.show();
        bubbleClone.css('position', 'absolute');
        bubbleClone.css('transform', '');
        bubbleClone.css('-ms-transform', '');
        bubbleClone.css('-webkit-transform', '');
        bubbleClone.css('top', bubble.offset().top);
        bubbleClone.css('left', bubble.offset().left);
        bubbleClone.css('z-index', 1100);
        bubbleClone.show();
        bubble.hide();

        adjustPixelPerfectPosition(bubbleClone);
    }

    function hide(element, bubble, bubbleClone)
    {
        bubbleClone.hide();
    }

    function adjustPixelPerfectPosition(bubble)
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
                    if(element.data('convert-content-to-title'))
                    {
                        convertContentToTitle(element);
                    }

                    var bubble = getBubble(element);
                    var bubbleClone = cloneBubble(bubble);

                    element.on('titleChanged', function () {
                        updateTitle(element, bubble, bubbleClone);
                    });
                    element.on('mouseover', function () {
                        show(element, bubble, bubbleClone);
                    });
                    element.on('mouseout', function () {
                        hide(element, bubble, bubbleClone);
                    });
                    element.addClass('has-title-bubble');
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