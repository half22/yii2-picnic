(function(window, $) {

    'use strict';

    $.extend($.fn, {
        getController: function ()
        {
            return this.data('_controller');
        },

        findController: function (name, selector)
        {
            return this.find('*[data-controller=' + name + ']' + (selector || ''));
        },

        findElement: function (name, selector)
        {
            return this.find('*[data-element=' + name + ']' + (selector || ''));
        },

        initController: function()
        {
            var previousController = this.getController();
            if(previousController)
            {
                previousController.refresh();
                return previousController;
            }

            var className = ucfirst(this.data('controller'));
            var controller = new window[className]();

            controller.root = this;
            controller.initAttributes();
            controller.initElements();
            this.data('_controller', controller);

            setTimeout(function ()
            {
                controller.init();
                controller.bindEvents();
            }, 0);

            return controller;
        }
    });

    var picnic = {
        plugins: {},
        controllers: [],

        start: function ()
        {
            this.initControllers();
            this.initPlugins();
        },

        destroyControllers: function ()
        {
            $.each(this.controllers, function (index, controller)
            {
                controller.destroy();
            }, this);
            this.controllers = [];
        },

        initControllers: function()
        {
            this.destroyControllers();
            $('*[data-controller]').each(function(index, domElement) {
                var root = $(domElement);
                var controller = root.initController();
                this.controllers.push(controller);
            }.bind(this));
        },

        initPlugins: function(element)
        {
            element = element || $('body');
            $.each(this.plugins, function (name, plugin)
            {
                plugin(element.find('*[data-plugin*=' + name + ']'));
            }, this);
        }
    };

    window.picnic = picnic;

}(typeof window !== 'undefined' ? window : this, jQuery));


