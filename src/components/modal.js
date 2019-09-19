(function(window, $, picnic) {

    picnic.activeModals = $();

    var modal = function()
    {
        picnic.controller.call(this);

        this.elements = ['content', 'closeButton', 'preloader', 'preloaderText'];
        this.attributes = ['disableBackdropClose', 'backdropCssModifier', 'ajaxUrl', 'ajaxTriggers'];
    };

    $.extend(modal.prototype, picnic.controller.prototype,
    {
        isLoading: false,
        isActive: false,
        backdropCssModifier: 'modal',

        init: function ()
        {
            this.transitionEndEvent = getTransitionEndEvent(this.root);

            //triggers
            $('body').on('click', '*[data-modal=' + this.root.prop('id') + ']', this.onTriggerClick.bind(this));
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
                picnic.event.trigger('picnic.modal.loaded', this.root);
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

            var backdropCssModifier = this.attributes.backdropCssModifier ? this.attributes.backdropCssModifier : this.backdropCssModifier;
            picnic.backdrop.open({cssModifier: backdropCssModifier, disableClose: this.attributes.disableBackdropClose});

            this.root.addClass('is-active');

            if(url = url ? url : this.attributes.ajaxUrl)
            {
                this.load(url);
            }

            picnic.activeModals = picnic.activeModals.add(this.root);
            picnic.event.trigger('picnic.modal.open', this.root);
            if(!this.transitionEndEvent)
            {
                picnic.event.trigger('picnic.modal.opened', this.root);
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

            picnic.activeModals = picnic.activeModals.not(this.root);
            picnic.event.trigger('picnic.modal.close', this.root);
            if(!this.transitionEndEvent)
            {
                picnic.event.trigger('picnic.modal.closed', this.root);
            }

            if(!picnic.activeModals.length)
            {
                picnic.backdrop.close();
            }
        },


        onClosed: function()
        {},

        onTransitionEnd: function(event)
        {
            if(event.target !== event.currentTarget) return;

            var eventName = this.isActive ? 'picnic.modal.opened' : 'picnic.modal.closed';
            picnic.event.trigger(eventName, this.root);
        }
    });

    picnic.modal = modal;
    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = picnic.modal;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return picnic.modal; });
	}

}(window, jQuery, window.picnic || {}));