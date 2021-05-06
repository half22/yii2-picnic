(function(window, $, picnic) {

    'use strict';

    var defaultOptions = {
        cssClassName: 'c-preloader',
        cssModifier: null,
        backdropCssModifier: 'preloader c-backdrop--preloader'
    };

    function createElement()
    {
        var root = $('<div>')
        root.append($('<div>'));
        root.appendTo('body');

        return root;
    }

    var preloader = {
        element: null,
        isActive: false,
        options: {},

        open: function(options)
        {
            if(!this.element)
            {
                this.element = createElement();
            }

            if(this.isActive) return;
            this.isActive = true;
            this.options = $.extend({}, defaultOptions, options || {});

            picnic.scrollbar.disable();

            var backdropCssModifier = this.options.backdropCssModifier;
            picnic.backdrop.open({parent: this.element, cssModifier: backdropCssModifier, disableClose: true});

            this.element.removeClass();
            this.element.addClass(this.options.cssClassName);
            if(this.options.cssModifier)
            {
                this.element.addClass(this.options.cssModifier);
            }
            this.element.addClass('is-active');
            picnic.event.trigger('picnic.preloader.opened');
        },

        close: function()
        {
            if(!this.isActive) return;
            this.isActive = false;

            this.element.removeClass();
            this.element.addClass(defaultOptions.cssClassName);
            picnic.event.trigger('picnic.preloader.closed');

            if(picnic.backdrop.isStackEmpty())
            {
                picnic.backdrop.enableClose();
                picnic.scrollbar.enable();
                picnic.backdrop.close();
            }
            else
            {
                picnic.backdrop.previous();
            }
        }
    };

    picnic.preloader = preloader;
    window.picnic = picnic;

    //triggers
    $('body').on('click', '*[data-preloader=1]', function ()
    {
        picnic.preloader.open();
    });

    if(typeof exports === 'object')
    {
		module.exports = picnic.preloader;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return picnic.preloader; });
	}

}(window, jQuery, window.picnic || {}));