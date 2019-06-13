(function(window, $, picnic) {

    'use strict';

    function onClick(event)
    {
        var target = $(event.currentTarget);
        target.get(0).disabled = true;
        target.parents("form").submit();
    }

    $.extend($.fn, {
        formSubmitButton: function ()
        {
            return this.each(function (index, domElement) {
                var element = $(domElement);
                if (!element.data('plugin-form-submit-button')) {
                    element.on('click', onClick);
                    element.data('plugin-form-submit-button', true);
                }
            });
        }
    });

    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = $.fn.formSubmitButton;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return $.fn.formSubmitButton; });
	}

})(window, jQuery, window.picnic || {});
