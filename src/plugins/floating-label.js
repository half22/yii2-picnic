(function(window, $, picnic) {

    'use strict';

    function toggle(input)
    {
        var label;
        if(input.closest('label').length)
        {
            label = input.closest('label');
        }
        else if(input.prop('id'))
        {
            label = $('label[for=' + input.prop('id') + ']');
        }

        var isFocused = input.is(':focus');
        var isFloated = input.val().length > 0 || isFloated;
        input.toggleClass('is-floated', isFloated);
        label.toggleClass('is-floated', isFloated);
        input.toggleClass('is-focused', isFocused);
        label.toggleClass('is-focused', isFocused);
    }

    $.extend($.fn, {
        picnicFloatingLabel: function ()
        {
            return this.each(function (index, domElement) {
                var input = $(domElement);
                if (!input.data('plugin-floating-label')) {
                    input.on('focus blur', function() { toggle(input); });
                    input.data('plugin-floating-label', true);
                    toggle(input);
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
