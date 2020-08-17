(function(window, $, picnic) {

    'use strict';

    function createButton(input)
    {
        var button = $('<button type="button" class="c-toggle-password-button"></button>');
        button.insertAfter(input);
        return button;
    }

    function onClick(button, input)
    {
        var isPassword = input.is(':password');

        if(isPassword)
        {
            input.prop('type', 'text');
            button.addClass('is-active');
        }
        else
        {
            input.prop('type', 'password');
            button.removeClass('is-active');
        }

        return false;
    }

    $.extend($.fn, {
        picnicTogglePassword: function ()
        {
            return this.each(function (index, domElement) {
                var input = $(domElement);
                if (!input.data('plugin-toggle-password')) {
                    var button = createButton(input);
                    button.on('click', function() { onClick(button, input); });
                    input.data('plugin-toggle-password', true);
                }
            });
        }
    });

    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = $.fn.picnicTogglePassword;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return $.fn.picnicTogglePassword; });
	}

})(window, jQuery, window.picnic || {});
