(function(window, $, picnic) {

    'use strict';

    function onClick(event)
    {
        var target = $(event.currentTarget);
        target.get(0).disabled = true;
        target.parents("form").submit();
    }

    var formSubmitButton = function (elements)
    {
        return elements.each(function (index, domElement)
        {
            var element = $(domElement);
            if(!element.data('plugin-form-submit-button'))
            {
                element.on('click', onClick);
                element.data('plugin-form-submit-button', true);
            }
        });
    };

    picnic.plugins.formSubmitButton = formSubmitButton;
    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = picnic.plugins.formSubmitButton;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return picnic.plugins.formSubmitButton; });
	}

})(window, jQuery, window.picnic || {});
