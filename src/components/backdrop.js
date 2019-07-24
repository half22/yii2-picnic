(function(window, $, picnic) {

    'use strict';

    function createElement()
    {
        return $('<div>').appendTo('body');
    }

    function keyDown(event)
    {
        var code = event.charCode || event.keyCode;
        if(code === 27)
        {
            picnic.backdrop.close();
        }
    }
    $(window).on('keydown', keyDown);

    var backdrop = {
        element: null,
        isActive: false,

        defaultOptions: {
            cssClassName: 'c-backdrop',
            disableClose: false,
            cssModifier: null
        },
        actualOptions: {},

        open: function(options)
        {
            if(!this.element)
            {
                this.element = createElement();
                this.element.on('click', this.close.bind(this));
            }

            if(this.isActive) return;
            this.isActive = true;

            this.actualOptions = $.extend({}, this.defaultOptions, options || {});

            this.element.removeClass();
            this.element.addClass(this.actualOptions.cssClassName);
            if(this.actualOptions.cssModifier)
            {
                this.element.addClass(this.actualOptions.cssClassName + '--' + this.actualOptions.cssModifier);
            }
            this.element.addClass('is-active');

            picnic.event.trigger('picnic.backdrop.opened');
        },

        close: function()
        {
            if(this.actualOptions.disableClose) return;

            if(!this.isActive) return;
            this.isActive = false;

            this.element.removeClass('is-active');

            picnic.event.trigger('picnic.backdrop.closed');
        },

        enableClose: function ()
        {
            this.actualOptions.disableClose = false;
        },

        disableClose: function ()
        {
            this.actualOptions.disableClose = true;
        }
    };

    picnic.backdrop = backdrop;
    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = picnic.backdrop;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return picnic.backdrop; });
	}

}(window, jQuery, window.picnic || {}));