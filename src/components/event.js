(function (window, document, $, picnic) {

    'use strict';

    function logTrigger(eventName, target, params)
    {
        if(picnic.event.debug)
        {
            console.log('-- picnic.event.trigger --');
            console.log(eventName);
            console.log(target);
            console.log(params);
        }
    }

    function logDispatch(target, params)
    {
        if(picnic.event.debug)
        {
            console.log('-- picnic.event.dispatch --');
            console.log(target);
            console.log(params);
        }
    }

    var PicnicEvent = function(eventName, target, callback)
    {
        this.eventName = eventName;
        this.target = target;
        this.callback = callback;
    };

    $.extend(PicnicEvent.prototype,
    {
        bind: function (once)
        {
            if(this.bindedDispatch) return;

            once = once || false;
            this.bindedDispatch = this.dispatch.bind(this);

            if(once)
            {
                this.target.one(this.eventName, this.bindedDispatch);
            }
            else
            {
                this.target.on(this.eventName, this.bindedDispatch);
            }
        },

        unbind: function ()
        {
            this.target.off(this.eventName, this.bindedDispatch);
        },

        dispatch: function(event, params, arg1, arg2)
        {
            logDispatch(this.target, arguments);
            this.callback(event, params, arg1, arg2);
            event.preventDefault();
        }
    });

    function createPicnicEvent(eventName, target, callback)
    {
        if(isUndefined(target)) return null;
        if(isUndefined(callback))
        {
            callback = target;
            target = $(document);
        }

        return new PicnicEvent(eventName, target, callback);
    }

    var event = {

        debug: false,

        trigger: function(eventName, target, params)
        {
            if(isDefined(target) && !target.html)
            {
                params = target;
                target = null;
            }
            target = target || $(document);
            params = params || {};


            logTrigger(eventName, target, params);
            target.trigger(eventName, [params]);
        },

        on: function(eventName, target, callback)
        {
            var picnicEvent = createPicnicEvent(eventName, target, callback);
            if(picnicEvent)
            {
                picnicEvent.bind();
            }

            return picnicEvent;
        },

        one: function(eventName, target, callback)
        {
            var picnicEvent = createPicnicEvent(eventName, target, callback);
            if(picnicEvent)
            {
                picnicEvent.bind(true);
            }

            return picnicEvent;
        }
    };

    picnic.event = event;
    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = picnic.event;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return picnic.event; });
	}

}(window, document, jQuery, window.picnic || {}));