(function(window, $, picnic) {

    'use strict';

    function onClick(event)
    {
        event.stopImmediatePropagation();

        var target = $(event.currentTarget);
        target.addClass('is-clicked');

        var timeout = isUndefined(target.data('click-timeout')) ? 400 : target.data('click-timeout');
        setTimeout(function ()
        {
            target.off(event);
            target.get(0).click();
            target.on('click', onClick);
        }, timeout);

        return false;
    }

    $.extend($.fn, {
        picnicClicked: function ()
        {
            return this.each(function (index, domElement) {
                var element = $(domElement);
                if (!element.data('plugin-clicked')) {
                    element.on('click', onClick);
                    element.data('plugin-clicked', true);
                }
            });
        }
    });

    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = $.fn.picnicClicked;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return $.fn.picnicClicked; });
	}

})(window, jQuery, window.picnic || {});
