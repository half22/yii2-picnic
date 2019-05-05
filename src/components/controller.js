(function(window, $, picnic) {

    var controller = function()
    {
        this.root = null;
        this.elements = [];
        this.attributes = [];
        this.events = [];
    };

    $.extend(controller.prototype,
    {
        init: function () {},
        bindEvents: function () {},

        on: function (eventName, target, callback)
        {
            if(isUndefined(target)) return;
            if(isUndefined(callback))
            {
                target = target.bind(this);
            }
            else
            {
                callback = callback.bind(this);
            }
            var event = picnic.event.on(eventName, target, callback);
            this.events.push(event);

            return event;
        },

        one: function (eventName, target, callback)
        {
            if(isUndefined(target)) return;
            if(isUndefined(callback))
            {
                target = target.bind(this);
            }
            else
            {
                callback = callback.bind(this);
            }
            var event = picnic.event.one(eventName, target, callback);
            this.events.push(event);

            return event;
        },

        unbindEvents: function ()
        {
            $.each(this.events, function (index, event)
            {
                event.unbind();
            });
            this.events = [];
        },

        initElements: function()
        {
            var elements = {};

            $.each(this.elements, function (index, value)
            {
                var name = $.isArray(this.elements) ? value: index;
                var element = this.root.findElement(name);
                elements[name] = element.length ? element : null;
            }.bind(this));

            this.elements = elements;
        },

        initAttributes: function()
        {
            var attributes = {};

            $.each(this.attributes, function (index, value)
            {
                var name = $.isArray(this.attributes) ? value: index;
                var attribute = this.root.data(name);
                if(isDefined(attribute))
                {
                    attributes[name] = attribute;
                }
            }.bind(this));

            this.attributes = attributes;
        },

        refresh: function ()
        {
            this.initAttributes();
            this.initElements();

            this.unbindEvents();
            this.bindEvents();

            picnic.initPlugins(this.root);
        },

        destroy: function ()
        {
            this.unbindEvents();
        }
    });

    picnic.controller = controller;
    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = picnic.controller;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return picnic.controller; });
	}

}(window, jQuery, window.picnic || {}));