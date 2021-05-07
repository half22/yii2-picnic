(function(window, $, picnic) {

    function bindCallback(callback, scope)
    {
        if($.isArray(callback))
        {
            callback[0] = callback[0].bind(scope);
        }
        else
        {
            callback = callback.bind(scope);
        }
        return callback;
    }

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
        afterInit: function () {},
        bindEvents: function () {},

        on: function (eventName, target, callback, propagateEvent)
        {
            if(!isDefined(target)) return;

            if(isFunction(target))
            {
                target = bindCallback(target, this);
            }
            else
            {
                callback = bindCallback(callback, this);
            }
            var event = picnic.event.on(eventName, target, callback, propagateEvent);
            this.events.push(event);

            return event;
        },

        one: function (eventName, target, callback, propagateEvent)
        {
            if(!isDefined(target)) return;
            if(isFunction(target))
            {
                target = bindCallback(target, this);
            }
            else
            {
                callback = bindCallback(callback, this);
            }
            var event = picnic.event.one(eventName, target, callback, propagateEvent);
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
                elements[name] = this.root.findElement(name);
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

        initListeners: function ()
        {
            var elements = this.root.find('*[data-on]');
            elements.each(function (index, domElement) {
                var element = $(domElement);
                var matches = element.data('on').match(/([^:]+):([^:]+)/);
                var event = matches[1];
                var callback = matches[2];
                var controllerElement = element.closest('*[data-controller]');
                if(controllerElement.length && controllerElement.getControllerName() == this.getControllerName())
                {
                    if (this[callback])
                    {
                        this.on(event, element, function () {
                            this[callback].apply(this, arguments);
                        }.bind(this));
                    }
                    else
                    {
                        console.error('PICNIC: Callback "' + callback + '" does not exist in "' + this.root.data('controller') + '". Listener "' + element.data('on') + '" not bound.');
                    }
                }
            }.bind(this));
        },

        refresh: function ()
        {
            this.initAttributes();
            this.initElements();

            this.unbindEvents();
            this.bindEvents();

            this.initListeners();

            picnic.initPlugins();
        },

        replaceRoot: function(html)
        {
            //destroy old controllers in root
            $.each(this.root.findController(), function (index, domElement) {
                var element = $(domElement);
                var controller = element.getController();
                if(controller)
                {
                    controller.destroy();
                }
            });

            //replace root
            var root = $('*[data-controller=' + this.getControllerName() + ']', '<div>' + html + '</div>');
            this.root.replaceWith(root);
            this.root = root;

            //css, js
            var sources = $('link,script', '<div>' + html + '</div>');
            $('body').append(sources);

            //create new controllers in root
            $.each(this.root.findController(), function (index, domElement) {
                var element = $(domElement);
                element.initController();
            });

            //refresh
            this.refresh();
        },

        register: function(root)
        {
            this.id = Math.random().toString(36).substr(2, 9);
            this.root = root;
            this.root.data('_controller', this);
            picnic.controllers[this.id] = this;
        },

        getControllerName: function ()
        {
            return this.root.getControllerName();
        },

        destroy: function ()
        {
            this.unbindEvents();
            this.root.data('_controller', null);
            delete picnic.controllers[this.id];
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