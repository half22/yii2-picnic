(function(window, $, picnic) {

    'use strict';

    function onClick(event)
    {
        var target = $(event.currentTarget);
        if(target.data('preloader'))
        {
            picnic.preloader.open();
        }
        target.get(0).disabled = true;
        setTimeout(function () {
            target.closest("form").submit();
        }, 10);
    }

    $.extend($.fn, {
        picnicFormSubmitButton: function ()
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
		module.exports = $.fn.picnicFormSubmitButton;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return $.fn.picnicFormSubmitButton; });
	}

})(window, jQuery, window.picnic || {});
