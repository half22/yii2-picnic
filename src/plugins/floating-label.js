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
    function onSelect2Open(element, select2Input)
    {
        element.addClass('is-focused');
    }

    function onSelect2Close(element, select2Input)
    {
        element.removeClass('is-focused');
    }

    function onSelect2Toggle(element, select2Input)
    {
        element.removeClass('is-floated');
        if(select2Input.select2('data').length > 0)
        {
            var value = select2Input.select2('data')[0];
            if(value.id)
            {
                element.addClass('is-floated');
            }
        }
    }

    //select2 multiple
    function onSelect2MultipleOpen(element, select2Input)
    {
        element.addClass('is-floated');
        element.addClass('is-focused');
    }

    function onSelect2MultipleClose(element, select2Input)
    {
        element.removeClass('is-focused');
        onSelect2MultipleToggle(element, select2Input);
    }

    function onSelect2MultipleToggle(element, select2Input)
    {
        element.removeClass('is-floated');
        if(select2Input.select2('data').length > 0)
        {
            element.addClass('is-floated');
        }
    }

    $.extend($.fn, {
        picnicFloatingLabel: function ()
        {
            return this.each(function (index, domElement) {
                var element = $(domElement);
                if (!element.data('plugin-floating-label'))
                {
                    setTimeout(function () {
                        var input = element.find('input[type=text], input[type=email], input[type=tel], input[type=password], select, textarea');

                        //select2
                        if(input.data('select2-id'))
                        {
                            var searchInput = element.find('input[type=search]');
                            if(searchInput.length)
                            {
                                input.on('select2:open', function () { onSelect2MultipleOpen(element, input); });
                                input.on('select2:close', function () { onSelect2MultipleClose(element, input); });
                                input.on('select2:select', function () { onSelect2MultipleToggle(element, input); });
                                input.on('select2:clear', function () { onSelect2MultipleToggle(element, input); });
                                onSelect2MultipleToggle(element, input);
                            }
                            else
                            {
                                input.on('select2:open', function () { onSelect2Open(element, input); });
                                input.on('select2:close', function () { onSelect2Close(element, input); });
                                input.on('select2:select', function () { onSelect2Toggle(element, input); });
                                input.on('select2:clear', function () { onSelect2Toggle(element, input); });
                                onSelect2Toggle(element, input);

                                // on first focus (bubbles up to document), open the menu
                                $(document).on('focus', '.select2-selection.select2-selection--single', function (e) {
                                    $(this).closest(".select2-container").siblings('select:enabled').select2('open');
                                });

                                // steal focus during close - only capture once and stop propogation
                                $('select.select2').on('select2:closing', function (e) {
                                    $(e.target).data("select2").$selection.one('focus focusin', function (e) {
                                        e.stopPropagation();
                                    });
                                });
                            }
                        }

                        //normal input
                        else
                        {
                            //datepicker
                            if(input.data('datepicker'))
                            {
                                input.datepicker().on('changeDate', function () { toggle(element, input); });
                            }
                            input.on('focus blur change', function() { toggle(element, input); });
                            toggle(element, input);
                        }

                        element.addClass('is-initialized');
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
