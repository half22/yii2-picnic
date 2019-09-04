(function(window, $, picnic) {

    picnic.activePanels = $();

    var panel = function()
    {
        picnic.controller.call(this);

        this.elements = ['content', 'closeButton', 'preloader', 'preloaderText'];
        this.attributes = ['disableBackdropClose', 'backdropCssModifier', 'ajaxUrl'];
    };

    $.extend(panel.prototype, picnic.controller.prototype,
    {
        isLoading: false,
        isActive: false,
        backdropCssModifier: 'panel',

        init: function ()
        {
            this.transitionEndEvent = getTransitionEndEvent(this.root);
            this.triggers = $('*[data-panel=' + this.root.prop('id') + ']');
        },

        bindEvents: function()
        {
            this.on('click', this.triggers, this.open);
            this.on('click', this.elements.closeButton, this.forceClose);
            this.on('picnic.backdrop.closed', this.close);
            this.on('picnic.panel.opened', this.onOpened);
            this.on('picnic.panel.closed', this.onClosed);

            if(this.transitionEndEvent)
            {
                this.on(this.transitionEndEvent, this.root, this.onTransitionEnd);
            }
        },

        onLoaded: function(data)
        {
            if(data.html)
            {
                this.elements.content.html(data.html);
                this.refresh();
                picnic.event.trigger('picnic.panel.loaded', this.root);
            }
        },

        showLoading: function(withText)
        {
            this.isLoading = true;
            this.root.addClass('is-loading');
            this.elements.preloaderText.toggle(withText);
        },

        hideLoading: function()
        {
            this.isLoading = false;
            this.root.removeClass('is-loading');
        },

        load: function()
        {
            if(this.isLoading) return;
            if(!this.attributes.ajaxUrl) return;

            this.showLoading(true);

            var url = this.attributes.ajaxUrl;
            $.ajax( {
                url: url,
                type: 'GET',
                success: this.onLoaded.bind(this),
                complete: this.hideLoading.bind(this)
            });
        },

        open: function()
        {
            if(this.isActive) return;
            this.isActive = true;

            this.root.addClass('is-active');
            var backdropCssModifier = this.attributes.backdropCssModifier ? this.attributes.backdropCssModifier : this.backdropCssModifier;

            picnic.backdrop.open({cssModifier: backdropCssModifier, disableClose: this.attributes.disableBackdropClose});

            this.load();

            picnic.activePanels = picnic.activePanels.add(this.root);
            picnic.event.trigger('picnic.panel.open', this.root);
            if(!this.transitionEndEvent)
            {
                picnic.event.trigger('picnic.panel.opened', this.root);
            }
        },

        onOpened: function ()
        {
            if(!this.isActive) return;
            picnic.scrollbar.disable();
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
        {

        },

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


