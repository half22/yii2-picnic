(function(window, $, picnic) {

    'use strict';

    var bubbleLayerClone;

    function createLayer(layer)
    {
        removeLayer();

        bubbleLayerClone = layer.clone();
        $('body').append(bubbleLayerClone);

        return bubbleLayerClone;
    }

    function removeLayer()
    {
        if(bubbleLayerClone)
        {
            bubbleLayerClone.remove();
            bubbleLayerClone = null;
        }
    }

    function hide(event, element)
    {
        var target = $(event.relatedTarget);
        if(target.closest(element).length)
        {
           return;
        }

        if(bubbleLayerClone && target.closest(bubbleLayerClone).length)
        {
            return;
        }

        removeLayer();
    }

    function show(element)
    {
        var isSticky = element.data('is-sticky');
        var layer = element.find('*[data-element=layer]');
        var layerClone = createLayer(layer);

        layer.addClass('is-active');
        layerClone.css('position', isSticky ? 'fixed' : 'absolute');
        layerClone.height(layer.height());
        layerClone.css('transform', 'none');
        layerClone.css('top', isSticky ? (layer.offset().top - $(window).scrollTop()): layer.offset().top);
        layerClone.css('left', layer.offset().left);
        layerClone.addClass('is-active');
        layer.removeClass('is-active');

        layerClone.on('mouseout', function (event) {
            hide(event, element);
        });
    }

    $.extend($.fn, {
        picnicBubble: function ()
        {
            return this.each(function (index, domElement) {
                var element = $(domElement);
                if (!element.data('plugin-bubble')) {
                    var mouseoverCallback = function () {
                        show(element);
                    };
                    var mouseoutCallback = function (event) {
                        hide(event, element);
                    };

                    element.on('mouseover', mouseoverCallback);
                    element.on('mouseout', mouseoutCallback);

                    element.data('plugin-bubble-mouseover', mouseoverCallback);
                    element.data('plugin-bubble-mouseout', mouseoutCallback);
                    element.data('plugin-bubble', true);
                }
            });
        },

        picnicBubbleDestroy: function ()
        {
            removeLayer();

            return this.each(function (index, domElement) {
                var element = $(domElement);
                if (element.data('plugin-bubble')) {

                    element.off('mouseover', element.data('plugin-bubble-mouseover'));
                    element.off('mouseout', element.data('plugin-bubble-mouseout'));

                    element.data('plugin-bubble-mouseover', null);
                    element.data('plugin-bubble-mouseout', null);
                    element.data('plugin-bubble', false);
                }
            });
        }
    });

    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = $.fn.picnicBubble;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return $.fn.picnicBubble; });
	}

})(window, jQuery, window.picnic || {});

