(function(window, $, picnic) {

    'use strict';

    function toggle(element, input)
    {
        var isFocused = input.is(':focus');
        var isFloated = input.val() && input.val().length > 0 || isFocused;
        element.toggleClass('is-floated', isFloated);
        element.toggleClass('is-focused', isFocused);
    }

    function onSelect2Open(element)
    {
        element.addClass('is-focused');
    }

    function onSelect2Close(element)
    {
        element.removeClass('is-focused');
    }

    $.extend($.fn, {
        picnicFloatingLabel: function ()
        {
            return this.each(function (index, domElement) {
                var element = $(domElement);
                if (!element.data('plugin-floating-label'))
                {
                    var input = element.find('input, select, textarea');
                    input.on('focus blur', function() { toggle(element, input); });

                    //select2
                    setTimeout(function () {
                        if(input.data('select2-id'))
                        {
                            input.on('select2:open', function() { onSelect2Open(element); });
                            input.on('select2:close', function() { onSelect2Close(element); });
                        }
                    }, 0);

                    toggle(element, input);
                    element.data('plugin-floating-label', true);
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
