(function (window, document, $, picnic) {

    'use strict';

    function getScrollbarWidth()
    {
        const rect = document.body.getBoundingClientRect();
        if(rect.left + rect.right >= window.innerWidth)
            return 0;

        var div = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');
        // Append our div, do our calculation and then remove it
        $('body').append(div);
        var w1 = $('div', div).innerWidth();
        div.css('overflow-y', 'scroll');
        var w2 = $('div', div).innerWidth();
        $(div).remove();
        return (w1 - w2);
    }

    var scrollbar = {
        isDisabled: false,
        scrollTop: null,

        enable: function()
        {
            if(!this.isDisabled) return;
            this.isDisabled = false;

            $('body').css({
                'overflow': '',
                'position': '',
                'margin-right': ''
            });

            $('body').scrollTop(this.scrollTop);
        },

        disable: function()
        {
            if(this.isDisabled) return;
            this.isDisabled = true;

            this.scrollTop = $('body').scrollTop();
            $('body').css({
                'overflow': 'hidden',
                'position': 'fixed',
                'margin-right': getScrollbarWidth()
            });
        }
    };

    picnic.scrollbar = scrollbar;
    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = picnic.scrollbar;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return picnic.scrollbar; });
	}

}(window, document, jQuery, window.picnic || {}));