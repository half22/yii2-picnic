(function(window, $, picnic) {

    'use strict';

    var defaultOptions = {
        parent: $(document),
        cssClassName: 'c-backdrop',
        disableClose: false,
        cssModifier: null
    };


    function createElement()
    {
        return $('<div>').appendTo('body');
    }

    function keyDown(event)
    {
        var code = event.charCode || event.keyCode;
        if(code === 27)
        {
            picnic.backdrop.triggerCloseEvent();
        }
    }
    $(window).on('keydown', keyDown);

    var backdrop = {
        element: null,
        isActive: false,
        options: null,
        optionsStack: [],

        open: function(options)
        {
            if(!this.element)
            {
                this.element = createElement();
                this.element.on('click', this.triggerCloseEvent.bind(this));
            }

            if(this.options)
            {
                this.optionsStack.push(this.options);
            }
            this.options = $.extend({}, defaultOptions, options || {});

            this.element.removeClass();
            this.element.addClass(this.options.cssClassName);
            if(this.options.cssModifier)
            {
                this.element.addClass(this.options.cssModifier);
            }
            this.element.addClass('is-active');

            if(this.isActive) return;
            this.isActive = true;

            picnic.event.trigger('picnic.backdrop.opened');
        },

        close: function()
        {
            if(!this.isActive) return;
            this.isActive = false;

            if(this.options.disableClose) return;

            this.options = null;
            this.optionsStack = [];

            this.element.removeClass();
            this.element.addClass(defaultOptions.cssClassName);
            picnic.event.trigger('picnic.backdrop.closed');
        },

        enableClose: function ()
        {
            this.options.disableClose = false;
        },

        disableClose: function ()
        {
            this.options.disableClose = true;
        },

        triggerCloseEvent: function ()
        {
            if(!this.isActive) return;
            if(this.options.disableClose) return;

            picnic.event.trigger('picnic.backdrop.closeEventTriggered', this.options.parent);
        },

        isStackEmpty: function ()
        {
            return this.optionsStack.length == 0;
        },

        previous: function ()
        {
            this.options = null;
            var previousOptions = this.optionsStack.pop();
            this.open(previousOptions);
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