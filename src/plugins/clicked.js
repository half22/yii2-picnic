(function(window, $, picnic) {

    'use strict';

    function onClick(event)
    {
        var target = $(event.currentTarget);
        if (!target.hasClass('is-clicked'))
        {
            target.addClass('is-clicked');

            var timeout = isUndefined(target.data('click-timeout')) ? 400 : target.data('click-timeout');
            setTimeout(function ()
            {
                target.off(event).get(0).click();
            }, timeout);

            return false;
        }
    }

    var clicked = function (elements)
    {
        return elements.each(function (index, domElement)
        {
            var element = $(domElement);
            if(!element.data('plugin-clicked'))
            {
                element.on('click', onClick);
                element.data('plugin-clicked', true);
            }
        });
    };

    picnic.plugins.clicked = clicked;
    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = picnic.plugins.clicked;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return picnic.plugins.clicked; });
	}

})(window, jQuery, window.picnic || {});
