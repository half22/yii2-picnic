(function(window, $) {

    'use strict';

    $.extend($.fn, {
        getController: function ()
        {
            return this.data('_controller');
        },

        findController: function (name, selector)
        {
            return this.find('*[data-controller=' + name + ']' + (selector || '')).getController();
        },

        findElement: function (name, selector)
        {
            return this.find('*[data-element=' + name + ']' + (selector || ''));
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
                var className = ucfirst(root.data('controller'));
                var controller = new window[className]();
                this.initController(controller, root);
            }.bind(this));
        },

        initController: function(controller, root)
        {
            controller.root = root;
            controller.initAttributes();
            controller.initElements();
            root.data('_controller', controller);
            this.controllers.push(controller);

            setTimeout(function ()
            {
                controller.init();
                controller.bindEvents();
            }, 0);
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


