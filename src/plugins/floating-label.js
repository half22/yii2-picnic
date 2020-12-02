(function(window, $, picnic) {

    'use strict';

    //normal input
    function toggle(element, input)
    {
        var isFocused = input.is(':focus');
        var isFloated = input.val() && input.val().length > 0 || isFocused;
        element.toggleClass('is-floated', isFloated);
        element.toggleClass('is-focused', isFocused);
    }

    //select2
    function onSelect2Open(element)
    {
        element.addClass('is-focused');
    }

    function onSelect2Close(element)
    {
        element.removeClass('is-focused');
    }

    function onSelect2Selected(element)
    {
        element.addClass('is-floated');
    }

    function onSelect2Cleared(element)
    {
        element.removeClass('is-floated');
    }

    //select2 multiple
    function onSelect2MultipleOpen(element)
    {
        element.addClass('is-floated');
        element.addClass('is-focused');
    }

    function onSelect2MultipleClose(element, select2Input)
    {
        if(select2Input.select2('data').length == 0)
        {
            element.removeClass('is-floated');
        }
        element.removeClass('is-focused');
    }

    $.extend($.fn, {
        picnicFloatingLabel: function ()
        {
            return this.each(function (index, domElement) {
                var element = $(domElement);
                if (!element.data('plugin-floating-label'))
                {
                    var input = element.find('input[type=text], select, textarea');
                    setTimeout(function () {

                        //select2
                        if(input.data('select2-id'))
                        {
                            var searchInput = element.find('input[type=search]');
                            if(searchInput.length)
                            {
                                input.on('select2:open', function () { onSelect2MultipleOpen(element, input); });
                                input.on('select2:close', function () { onSelect2MultipleClose(element, input); });
                            }
                            else
                            {
                                input.on('select2:open', function () { onSelect2Open(element, input); });
                                input.on('select2:close', function () { onSelect2Close(element, input); });
                                input.on('select2:select', function () { onSelect2Selected(element, input); });
                                input.on('select2:clear', function () { onSelect2Cleared(element, input); });
                            }
                        }

                        //normal input
                        else
                        {
                            input.on('focus blur', function() { toggle(element, input); });
                            toggle(element, input);
                        }
                    }, 0);

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
