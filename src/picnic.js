(function(window, $) {

    'use strict';

    $.extend($.fn, {
        getController: function ()
        {
            return this.data('_controller');
        },

        findController: function (name, selector)
        {
            return this.find('*[data-controller~=' + name + ']' + (selector || ''));
        },

        findElement: function (name, selector)
        {
            return this.find('*[data-element~=' + name + ']' + (selector || ''));
        },

        closestElement: function (name, selector)
        {
            return this.closest('*[data-element~=' + name + ']' + (selector || ''));
        },

        initController: function()
        {
            var previousController = this.getController();
            if(previousController)
            {
                previousController.refresh();
                return previousController;
            }

            var classNames = [
                this.data('controller'),
                ucfirst(this.data('controller')),
                camelCase(this.data('controller'))
            ];

            var controller = null;
            for(var i = 0; i < classNames.length; i++)
            {
                var className = classNames[i];
                if(window[className])
                {
                    controller = new window[className]();
                    break;
                }
            }

            if(controller)
            {
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
            else
            {
                console.error('PICNIC: Controller "' + this.data('controller') + '" does not exist.');
            }
            return null;
        }
    });

    var picnic = {
        controllers: {},

        start: function ()
        {
            this.initPlugins();
            this.initControllers();
        },

        initControllers: function()
        {
            $('*[data-controller]').each(function(index, domElement)
            {
                $(domElement).initController();

            }.bind(this));
        },

        initPlugins: function()
        {
            $('*[data-plugin]').each(function(index, domElement)
            {
                var element = $(domElement);
                var plugins = element.data('plugin').split(',');
                $.each(plugins, function (index, plugin) {
                    var picnicPluginName = 'picnic' + ucfirst(plugin.trim());
                    var customPluginName = plugin.trim();
                    if(element[picnicPluginName])
                    {
                        element[picnicPluginName]();
                    }
                    else if(element[customPluginName])
                    {
                        element[customPluginName]();
                    }
                    else
                    {
                        console.error('PICNIC: Plugin "' + customPluginName + '" does not exist.');
                    }
                });
            }.bind(this));
        }
    };

    window.picnic = picnic;

}(typeof window !== 'undefined' ? window : this, jQuery));


