(function(window, $, picnic) {

    'use strict';

    function cloneLayer(layer)
    {
        var layerClone = layer.clone();
        $('body').append(layerClone);

        return layerClone;
    }

    function hide(event, element, layer)
    {
        var target = $(event.currentTarget);
        if(!target.closest(element).length && !target.closest(layer).length)
        {
            layer.hide();
        }
    }

    function show(layer, layerClone, isSticky)
    {
        layer.addClass('is-active');
        layerClone.css('position', isSticky ? 'fixed' : 'absolute');
        layerClone.height(layer.height());
        layerClone.css('transform', 'none');
        layerClone.css('top', isSticky ? (layer.offset().top - $(window).scrollTop()): layer.offset().top);
        layerClone.css('left', layer.offset().left);
        layerClone.addClass('is-active');
        layer.removeClass('is-active');
    }

    $.extend($.fn, {
        tooltip: function ()
        {
            return this.each(function (index, domElement) {
                var element = $(domElement);
                if (!element.data('plugin-tooltip')) {
                    var isSticky = element.data('is-sticky');
                    var layer = element.find('*[data-element=layer]');
                    var layerClone = cloneLayer(layer);

                    layerClone.on('mouseout', function (event) {
                        hide(event, element, layerClone);
                    });

                    element.on('mouseout', function (event) {
                        hide(event, element, layerClone);
                    });

                    element.on('mouseover', function () {
                        show(layer, layerClone, isSticky);
                    });

                    element.data('plugin-tooltip', true);
                }
            });
        }
    });

    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = $.fn.tooltip;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return $.fn.tooltip; });
	}

})(window, jQuery, window.picnic || {});

