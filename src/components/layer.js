(function(window, $, picnic) {

    picnic.activeLayers = {
        totalCount: 0
    };

    picnic.layers = {
        get: function (id)
        {
            return picnic.layers[id];
        }
    };

    var layer = function()
    {
        picnic.controller.call(this);

        this.elements = ['title', 'header', 'content', 'backButton', 'closeButton', 'closeAllButton', 'preloader', 'preloaderText'];
        this.attributes = ['id', 'disableBackdropClose', 'backdropCssModifier', 'ajaxUrl', 'ajaxTriggers', 'clearContentWhenLoading', 'showNestedCloseButton'];
    };

    $.extend(layer.prototype, picnic.controller.prototype,
    {
        type: null,
        isLoading: false,
        clearContentWhenLoading: true,
        isActive: false,
        onTriggerClickCallback: null,
        ajaxUrl: null,
        isBeforeOpenProcedureRunning: false,
        isNested: false,
        showNestedCloseButton: true,
        nestedCssClasses: ['is-secondary', 'is-tertiary'],

        //backdrop
        backdropCssModifier: '',
        disableBackdropClose: false,

        //primary/nested close event
        primaryCloseEvent: null,
        nestedCloseEvent: null,

        init: function ()
        {
            this.initTransitionEndEvent();

            if(isDefined(this.attributes.clearContentWhenLoading))
            {
                this.clearContentWhenLoading = this.attributes.clearContentWhenLoading;
            }

            if(isDefined(this.attributes.showNestedCloseButton))
            {
                this.showNestedCloseButton = this.attributes.showNestedCloseButton;
            }

            if(isDefined(this.attributes.id))
            {
                picnic.layers[this.attributes.id] = this;
            }
        },

        initTransitionEndEvent: function ()
        {
            if(this.root.css('transition-duration') !== "0s")
            {
                this.transitionEndEvent = getTransitionEndEvent(this.root);
            }
        },

        getTriggersSelector: function ()
        {
            var id = this.root.prop('id');
            if(id)
            {
                return '*[data-' + this.type + '=' + this.root.prop('id') + ']';
            }
            return null;
        },

        bindTriggers: function ()
        {
            this.onTriggerClickCallback = this.onTriggerClick.bind(this);

            var triggerSelector = this.getTriggersSelector();
            if(triggerSelector)
            {
                $('body').on('click', triggerSelector, this.onTriggerClickCallback);
            }
        },

        unbindTriggers: function ()
        {
            if(this.onTriggerClickCallback)
            {
                var triggerSelector = this.getTriggersSelector();
                if(triggerSelector)
                {
                    $('body').off('click', triggerSelector, this.onTriggerClickCallback);
                }
            }
        },

        bindEvents: function()
        {
            this.bindTriggers();
            this.bindCloseEvent();

            this.on('click', this.elements.closeAllButton, this.closeAll);
            this.on('click', this.elements.backButton, this.close);

            this.on('picnic.backdrop.closeEventTriggered', this.root, this.close);
            this.on('picnic.' + this.type + '.opened', this.root, this.onOpened);
            this.on('picnic.' + this.type + '.opened', this.root, this.afterOpen);
            this.on('picnic.' + this.type + '.closed', this.root, this.onClosed);
            this.on('picnic.' + this.type + '.closed', this.root, this.afterClose);

            if(this.transitionEndEvent)
            {
                this.on(this.transitionEndEvent, this.root, this.onTransitionEnd);
            }
        },

        unbindEvents: function ()
        {
            this.unbindTriggers();
            picnic.controller.prototype.unbindEvents.call(this);
        },

        bindCloseEvent: function ()
        {
            if(this.primaryCloseEvent)
            {
                this.primaryCloseEvent.unbind();
                this.primaryCloseEvent = null;
            }
            if(this.nestedCloseEvent)
            {
                this.nestedCloseEvent.unbind();
                this.nestedCloseEvent = null;
            }

            if(!this.isNested)
            {
                this.primaryCloseEvent = this.on('click', this.elements.closeButton, this.forceClose);
            }
            else
            {
                this.nestedCloseEvent = this.on('click', this.elements.closeButton, this.closeAll);
            }
        },

        onTriggerClick: function (event)
        {
            var target = $(event.currentTarget);
            var url = null;
            if(this.attributes.ajaxTriggers)
            {
                if(target.data('ajax-url') && target.data('ajax-url').indexOf('function()') !== -1)
                {
                    var urlFunction = null;
                    eval('urlFunction = ' + target.data('ajax-url'));
                    url = urlFunction.call(target);
                }
                else
                {
                    url = target.attr('href') || target.data('ajax-url');
                }
                this.ajaxUrl = url;
            }

            this.trigger = target;
            this.open(url);

            if(target.data('eventStopPropagation'))
            {
                event.stopImmediatePropagation();
            }

            return false;
        },

        onLoaded: function(data)
        {
            this.updateContent(data);
            picnic.event.trigger('picnic.' + this.type + '.loaded', this.root);

            this.afterLoaded();
        },

        getAjaxUrl: function()
        {
            return this.attributes.ajaxUrl ? this.attributes.ajaxUrl : this.ajaxUrl;
        },

        updateContent: function (data)
        {
            if(this.elements.content.length)
            {
                if(data.html)
                {
                    this.elements.content.destroyChildrenControllers();
                    this.elements.content.empty();
                    this.elements.content.html(data.html);
                }
                if(data.content)
                {
                    this.elements.content.destroyChildrenControllers();
                    this.elements.content.empty();
                    this.elements.content.html(data.content);
                }
            }

            if(this.elements.title.length && data.title)
            {
                this.elements.title.destroyChildrenControllers();
                this.elements.title.html(data.title);
            }

            this.adjustPixelPerfectPosition();
            this.refresh();
        },

        showLoading: function(withText)
        {
            this.isLoading = true;
            this.root.addClass('is-loading');

            if(this.clearContentWhenLoading)
            {
                this.elements.content.destroyChildrenControllers();
                this.elements.content.empty();
            }

            if(this.elements.preloaderText.length)
            {
                this.elements.preloaderText.toggle(withText);
            }
            if(this.elements.preloader.length)
            {
                this.elements.preloader.show();
            }

            this.adjustPixelPerfectPosition();
        },

        hideLoading: function()
        {
            this.isLoading = false;
            this.root.removeClass('is-loading');

            if(this.elements.preloader.length)
            {
                this.elements.preloader.hide();
            }

            this.adjustPixelPerfectPosition();
        },

        load: function(url)
        {
            if(this.isLoading) return;
            this.showLoading(true);

            $.ajax( {
                url: url,
                type: 'GET',
                success: this.onLoaded.bind(this),
                error: this.onLoadError.bind(this),
                complete: this.hideLoading.bind(this)
            });
        },

        getBackdropOptions: function ()
        {
            return {
                parent: this.root,
                cssModifier: this.attributes.backdropCssModifier ? this.attributes.backdropCssModifier : this.backdropCssModifier,
                disableClose: this.attributes.disableBackdropClose ? this.attributes.disableBackdropClose : this.disableBackdropClose
            };
        },

        registerLayer: function ()
        {
            picnic.activeLayers[this.type] = picnic.activeLayers[this.type].add(this.root);
            picnic.activeLayers.totalCount++;
        },

        unregisterLayer: function ()
        {
            picnic.activeLayers[this.type] = picnic.activeLayers[this.type].not(this.root);
            picnic.activeLayers.totalCount--;
        },

        open: function(url)
        {
            if(this.isActive) return;
            this.isActive = true;

            picnic.scrollbar.disable();
            picnic.backdrop.open(this.getBackdropOptions());

            this.isBeforeOpenProcedureRunning = true;
            this.root.css('display', 'block');
            this.beforeOpen();
            this.root.css({'display': ''});
            this.isBeforeOpenProcedureRunning = false;

            this.updateNestedLayer();
            this.root.addClass('is-active');

            this.registerLayer();
            this.hideLoading();
            this.adjustPixelPerfectPosition();

            if(url = url ? url : this.getAjaxUrl())
            {
                this.load(url);
            }

            picnic.event.trigger('picnic.' + this.type + '.open');
            picnic.event.trigger('picnic.' + this.type + '.open', this.root);
            if(!this.transitionEndEvent)
            {
                picnic.event.trigger('picnic.' + this.type + '.opened');
                picnic.event.trigger('picnic.' + this.type + '.opened', this.root);
            }
        },

        updateNestedLayer: function ()
        {
            this.isNested = picnic.activeLayers[this.type].length > 0;

            //root
            this.root.removeClass(this.nestedCssClasses);
            if(this.isNested)
            {
                var cssClass = this.nestedCssClasses[picnic.activeLayers[this.type].length - 1];
                this.root.addClass(cssClass);
            }

            //back button
            this.elements.backButton.toggleClass('is-hidden', !this.isNested);

            //close button
            this.elements.closeButton.removeClass('is-hidden');
            if(this.isNested && !this.showNestedCloseButton)
            {
                this.elements.closeButton.addClass('is-hidden');
            }

            this.bindCloseEvent();
        },

        forceClose: function ()
        {
            picnic.backdrop.enableClose();
            this.close();
        },

        close: function()
        {
            if(!this.isActive) return;
            this.isActive = false;

            this.beforeClose();
            this.root.removeClass('is-active');
            this.unregisterLayer();

            picnic.event.trigger('picnic.' + this.type + '.close');
            picnic.event.trigger('picnic.' + this.type + '.close', this.root);
            if(!this.transitionEndEvent)
            {
                picnic.event.trigger('picnic.' + this.type + '.closed');
                picnic.event.trigger('picnic.' + this.type + '.closed', this.root);
            }

            if(picnic.backdrop.isStackEmpty())
            {
                picnic.scrollbar.enable();
                picnic.backdrop.close();
            }
            else
            {
                picnic.backdrop.previous();
            }
        },

        closeAll: function ()
        {
            picnic.activeLayers[this.type].each(function (index, domElement) {
                $(domElement).getController().close();
            })
        },

        onOpened: function ()
        {},

        onClosed: function()
        {},

        beforeOpen: function ()
        {},

        afterOpen: function ()
        {},

        beforeClose: function ()
        {},

        afterClose: function()
        {},

        afterLoaded: function()
        {},

        onLoadError: function ()
        {},

        onTransitionEnd: function(event)
        {
            if(event.target !== event.currentTarget) return;
            if(this.isBeforeOpenProcedureRunning) return;

            var eventName = this.isActive ? 'picnic.' + this.type + '.opened' : 'picnic.' + this.type + '.closed';
            picnic.event.trigger(eventName);
            picnic.event.trigger(eventName, this.root);
        },

        adjustPixelPerfectPosition: function()
        {
            //overridden by children if needed (ie. modal)
        },

        destroy: function ()
        {
            picnic.controller.prototype.destroy.call(this);

            if(isDefined(this.attributes.id))
            {
                delete picnic.layers[this.attributes.id];
            }
        }
    });

    picnic.layer = layer;
    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = picnic.layer;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return picnic.layer; });
	}

}(window, jQuery, window.picnic || {}));