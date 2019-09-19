(function(window, $, picnic) {

    picnic.activePanels = $();

    var panel = function()
    {
        picnic.controller.call(this);

        this.elements = ['content', 'closeButton', 'preloader', 'preloaderText'];
        this.attributes = ['disableBackdropClose', 'backdropCssModifier', 'ajaxUrl', 'ajaxTriggers'];
    };

    $.extend(panel.prototype, picnic.controller.prototype,
    {
        isLoading: false,
        isActive: false,
        backdropCssModifier: 'panel',
        areTriggersInitialized: false,

        init: function ()
        {
            this.initTransitionEndEvent();
            this.initTriggers();
        },

        initTransitionEndEvent: function ()
        {
            this.transitionEndEvent = getTransitionEndEvent(this.root);
        },

        initTriggers: function ()
        {
            if(!this.areTriggersInitialized)
            {
                $('body').on('click', '*[data-panel=' + this.root.prop('id') + ']', this.onTriggerClick.bind(this));
                this.areTriggersInitialized = true;
            }
        },

        bindEvents: function()
        {
            this.on('click', this.elements.closeButton, this.forceClose);
            this.on('picnic.backdrop.closed', this.close);
            this.on('picnic.panel.opened', this.onOpened);
            this.on('picnic.panel.closed', this.onClosed);

            if(this.transitionEndEvent)
            {
                this.on(this.transitionEndEvent, this.root, this.onTransitionEnd);
            }
        },

        onTriggerClick: function (event)
        {
            var target = $(event.target);
            var url = this.attributes.ajaxTriggers ? target.attr('href') : null;
            this.open(url);
            return false;
        },

        onLoaded: function(data)
        {
            if(data.html)
            {
                this.updateContent(data.html);
                picnic.event.trigger('picnic.panel.loaded', this.root);
            }
        },

        updateContent: function (html)
        {
            this.elements.content.html(html);
            this.refresh();
        },

        showLoading: function(withText)
        {
            this.isLoading = true;
            this.root.addClass('is-loading');

            if(this.elements.preloaderText.length > 0)
            {
                this.elements.preloaderText.toggle(withText);
            }
        },

        hideLoading: function()
        {
            this.isLoading = false;
            this.root.removeClass('is-loading');
        },

        load: function(url)
        {
            if(this.isLoading) return;
            this.showLoading(true);

            $.ajax( {
                url: url,
                type: 'GET',
                success: this.onLoaded.bind(this),
                complete: this.hideLoading.bind(this)
            });
        },

        open: function(url)
        {
            if(this.isActive) return;
            this.isActive = true;

            picnic.scrollbar.disable();

            var backdropCssModifier = this.attributes.backdropCssModifier ? this.attributes.backdropCssModifier : this.backdropCssModifier;
            picnic.backdrop.open({cssModifier: backdropCssModifier, disableClose: this.attributes.disableBackdropClose});

            this.root.addClass('is-active');

            if(url = url ? url : this.attributes.ajaxUrl)
            {
                this.load(url);
            }

            picnic.activePanels = picnic.activePanels.add(this.root);
            picnic.event.trigger('picnic.panel.open', this.root);
            if(!this.transitionEndEvent)
            {
                picnic.event.trigger('picnic.panel.opened', this.root);
            }
        },

        onOpened: function ()
        {},

        forceClose: function ()
        {
            picnic.backdrop.enableClose();
            this.close();
        },

        close: function()
        {
            if(!this.isActive) return;
            this.isActive = false;

            this.root.removeClass('is-active');

            picnic.activePanels = picnic.activePanels.not(this.root);
            picnic.event.trigger('picnic.panel.close', this.root);
            if(!this.transitionEndEvent)
            {
                picnic.event.trigger('picnic.panel.closed', this.root);
            }

            if(!picnic.activePanels.length)
            {
                picnic.scrollbar.enable();
                picnic.backdrop.close();
            }
        },

        onClosed: function()
        {},

        onTransitionEnd: function(event)
        {
            if(event.target !== event.currentTarget) return;

            var eventName = this.isActive ? 'picnic.panel.opened' : 'picnic.panel.closed';
            picnic.event.trigger(eventName, this.root);
        }
    });

    picnic.panel = panel;
    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = picnic.panel;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return picnic.panel; });
	}

}(window, jQuery, window.picnic || {}));


