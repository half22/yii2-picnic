(function(window, $, picnic) {

    'use strict';

    function toggle(element, input, label)
    {
        var isFocused = input.is(':focus');
        var isFloated = input.val().length > 0 || isFocused;
        element.toggleClass('is-floated', isFloated);
        element.toggleClass('is-focused', isFocused);
    }

    $.extend($.fn, {
        picnicFloatingLabel: function ()
        {
            return this.each(function (index, domElement) {
                var element = $(domElement);
                if (!element.data('plugin-floating-label'))
                {
                    var input = element.find('input, select, textarea');
                    var label = element.find('label');

                    input.on('focus blur', function() { toggle(element, input, label); });
                    element.data('plugin-floating-label', true);
                    toggle(element, input, label);
                }
            });
        }
    });

    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = $.fn.picnicFloatingLabel;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return $.fn.picnicFloatingLabel; });
	}

})(window, jQuery, window.picnic || {});
