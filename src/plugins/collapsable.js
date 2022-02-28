(function(window, $, picnic) {

    'use strict';

    function toggle(event, element, button)
    {
        element.toggleClass('is-collapsed');
        return false;
    }

    $.extend($.fn, {
        picnicCollapsable: function ()
        {
            return this.each(function (index, domElement) {
                var element = $(domElement);
                if (!element.data('plugin-collapsable')) {
                    var button = element.findElement('collapseButton');

                    button.on('click', function (event) {
                        toggle(event, element, button);
                    });

                    element.data('plugin-collapsable', true);
                }
            });
        }
    });

    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = $.fn.picnicCollapsable;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return $.fn.picnicCollapsable; });
	}

})(window, jQuery, window.picnic || {});

