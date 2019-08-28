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
                'margin-right': ''
            });

            if(isMobile())
            {
                $('body').css({
                    'position': '',
                    'margin-top': ''
                });
                $(document).scrollTop(this.scrollTop);
            }
        },

        disable: function()
        {
            if(this.isDisabled) return;
            this.isDisabled = true;

            $('body').css({
                'overflow': 'hidden',
                'margin-right': getScrollbarWidth()
            });

            if(isMobile())
            {
                this.scrollTop = $(document).scrollTop();
                $('body').css({
                    'position': 'fixed',
                    'margin-top': (this.scrollTop * -1) + 'px'
                });
            }
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