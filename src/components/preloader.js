(function(window, $, picnic) {

    'use strict';

    function createElement()
    {
        return $('<div>').appendTo('body');
    }

    var preloader = {
        element: null,
        isActive: false,

        defaultOptions: {
            cssClassName: 'c-preloader',
            cssModifier: null,
            backdropCssModifier: 'preloader'
        },
        actualOptions: {},

        open: function(options)
        {
            if(!this.element)
            {
                this.element = createElement();
            }

            if(this.isActive) return;
            this.isActive = true;
            this.actualOptions = $.extend({}, this.defaultOptions, options || {});

            picnic.scrollbar.disable();

            var backdropCssModifier = this.actualOptions.backdropCssModifier;
            picnic.backdrop.open({cssModifier: backdropCssModifier, disableClose: true});

            this.element.removeClass();
            this.element.addClass(this.actualOptions.cssClassName);
            if(this.actualOptions.cssModifier)
            {
                this.element.addClass(this.actualOptions.cssModifier);
            }
            this.element.addClass('is-active');
            picnic.event.trigger('picnic.preloader.opened');
        },

        close: function()
        {
            if(!this.isActive) return;
            this.isActive = false;

            picnic.scrollbar.enable();
            picnic.backdrop.enableClose();
            picnic.backdrop.close();

            this.element.removeClass('is-active');
            picnic.event.trigger('picnic.preloader.closed');
        }
    };

    picnic.preloader = preloader;
    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = picnic.preloader;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return picnic.preloader; });
	}

}(window, jQuery, window.picnic || {}));