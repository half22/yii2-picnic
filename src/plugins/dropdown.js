(function(window, $, picnic) {

    'use strict';

    function cloneLayer(layer)
    {
        var layerClone = layer.clone();
        $('body').append(layerClone);

        return layerClone;
    }

    function show(layer, layerClone)
    {
        layer.addClass('is-active');
        layerClone.css('position', 'absolute');
        layerClone.css('top', layer.offset().top);
        layerClone.css('left', layer.offset().left);
        layerClone.css('z-index', 1100);
        layerClone.addClass('is-active');
        layer.removeClass('is-active');

        return false;
    }

    function hide(event, button, layer)
    {
        var target = $(event.target);
        if (!target.closest(button).length && !target.closest(layer).length)
        {
            layer.removeClass('is-active');
        }
    }

    function setValue(event, element, button, layer)
    {
        var target = $(event.currentTarget);
        var item = target.closestElement('item');

        var value = button.findElement('value');
        var icon = button.findElement('icon');

        var valueHtml = target.html();
        if(target.findElement('value').length > 0)
        {
            valueHtml = target.findElement('value').html();
        }
        if(target.data('value'))
        {
            valueHtml = target.data('value');
        }

        if(value.length)
        {
            value.html(valueHtml);
        }

        if(icon.length)
        {
            icon.html(target.findElement('icon').html());
        }

        item.siblings().removeClass('is-active');
        item.addClass('is-active');
        layer.removeClass('is-active');

        picnic.event.trigger('picnic.dropdown.changed', element, {value: valueHtml});

        if(target.attr('href') == '#')
        {
            return false;
        }
    }

    $.extend($.fn, {
        picnicDropdown: function ()
        {
            return this.each(function (index, domElement) {
                var element = $(domElement);
                if (!element.data('plugin-dropdown')) {
                    var button = element.findElement('button');
                    var layer = element.findElement('layer');
                    var layerClone = cloneLayer(layer);
                    var valueLink = layerClone.findElement('valueLink');

                    button.on('click', function () {
                        show(layer, layerClone);
                    });

                    $('body').on('click', function (event) {
                        hide(event, button, layerClone);
                    });

                    valueLink.on('click', function (event) {
                        setValue(event, element, button, layerClone);
                    });

                    element.data('plugin-dropdown', true);
                }
            });
        }
    });

    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = $.fn.picnicDropdown;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return $.fn.picnicDropdown; });
	}

})(window, jQuery, window.picnic || {});

