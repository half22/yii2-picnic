(function(window, $) {

    'use strict';

    $.extend($.fn, {
        getController: function ()
        {
            return this.data('_controller');
        },

        getControllerName: function ()
        {
            return this.data('controller');
        },

        findController: function (name, selector)
        {
            if(name && name.length)
            {
                return this.find('*[data-controller~=' + name + ']' + (selector || ''));
            }
            return this.find('*[data-controller]' + (selector || ''));
        },

        findElement: function (name, selector)
        {
            return this.find('*[data-element~=' + name + ']' + (selector || ''));
        },

        findElementsWithListener: function (listener, selector)
        {
            return this.find('*[data-\\' + listener + ']' + (selector || ''));
        },

        closestElement: function (name, selector)
        {
            return this.closest('*[data-element~=' + name + ']' + (selector || ''));
        },

        closestController: function (name, selector)
        {
            return this.closest('*[data-controller~=' + name + ']' + (selector || ''));
        },

        destroyChildrenControllers: function()
        {
            $.each(this.findController(), function (index, domElement) {
                var element = $(domElement);
                var controller = element.getController();
                if(controller)
                {
                    controller.destroy();
                }
            });
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
                ucfirst(this.data('controller')),
                camelCase(this.data('controller')),
                ucfirst(camelCase(this.data('controller'))),
                this.data('controller'),
            ];

            var controller = null;
            for(var i = 0; i < classNames.length; i++)
            {
                var className = classNames[i];
                if(isFunction(window[className]))
                {
                    controller = new window[className]();
                    break;
                }
            }

            if(controller)
            {
                controller.register(this);
                controller.initAttributes();
                controller.initElements();
                controller.initListeners();

                setTimeout(function ()
                {
                    controller.init();
                    controller.bindEvents();

                    afterControllerInit();
                }, 0);

                return controller;
            }
            else
            {
                console.error('PICNIC: Controller "' + this.data('controller') + '" does not exist.');
            }
            return null;
        },

        initPlugins: function ()
        {
            var element = $(this);
            if(element.data('plugin'))
            {
                var plugins = element.data('plugin').split(',');
                $.each(plugins, function (index, plugin)
                {
                    plugin = plugin.trim();
                    var pluginNames = [
                        //picnic plugin
                        'picnic' + ucfirst(plugin),

                        //custom plugins
                        plugin,
                        ucfirst(plugin),
                        camelCase(plugin),
                        ucfirst(camelCase(plugin))
                    ];

                    var pluginFound = false;
                    for (var i = 0; i < pluginNames.length; i++)
                    {
                        var pluginName = pluginNames[i];
                        if (element[pluginName])
                        {
                            element[pluginName]();
                            pluginFound = true;
                            break;
                        }
                    }

                    if (!pluginFound)
                    {
                        console.error('PICNIC: Plugin "' + plugin + '" does not exist.');
                    }
                });
            }
        }
    });

    var initializedControllersCount = 0;
    function afterControllerInit()
    {
        initializedControllersCount++;
        if(initializedControllersCount == Object.keys(picnic.controllers).length)
        {
            $.each(picnic.controllers, function (id, controller) {
                controller.afterInit();
            });
        }
    }

    var picnic = {
        controllers: {},

        start: function ()
        {
            this.stop();
            this.initPlugins();
            this.initControllers();
        },

        stop: function ()
        {
            $.each(this.controllers, function(key, controller)
            {
                controller.destroy();
            });
            this.controllers = {};
            initializedControllersCount = 0;
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
                $(domElement).initPlugins();
            }.bind(this));
        }
    };

    window.picnic = picnic;

}(typeof window !== 'undefined' ? window : this, jQuery));


