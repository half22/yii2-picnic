(function(window, $, picnic) {

    picnic.activeModals = $();

    var modal = function()
    {
        picnic.controller.call(this);

        this.elements = ['content', 'closeButton', 'preloader', 'preloaderText'];
        this.attributes = ['disableBackdropClose', 'ajaxUrl', 'ajaxTriggers'];
    };

    $.extend(modal.prototype, picnic.controller.prototype,
    {
        isLoading: false,
        isActive: false,

        init: function ()
        {
            this.transitionEndEvent = getTransitionEndEvent(this.root);
            this.triggers = $('*[data-modal=' + this.root.prop('id') + ']');
        },

        bindEvents: function()
        {
            this.on('click', this.triggers, this.open);
            this.on('click', this.elements.closeButton, this.forceClose);
            this.on('picnic.backdrop.closed', this.close);

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
                picnic.event.trigger('picnic.modal.loaded', this.root);
            }
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

        load: function(triggerUrl)
        {
            if(this.isLoading) return;

            var url = null;
            if(this.attributes.ajaxUrl)
            {
                url = this.attributes.ajaxUrl;
            }
            if(this.attributes.ajaxTriggers && triggerUrl)
            {
                url = triggerUrl;
            }
            if(!url) return;

            this.showLoading(true);

            $.ajax( {
                url: url,
                type: 'GET',
                success: this.onLoaded.bind(this),
                complete: this.hideLoading.bind(this)
            });
        },

        open: function(event)
        {
            if(this.isActive) return;
            this.isActive = true;

            this.root.addClass('is-active');
            picnic.backdrop.open({cssModifier: 'modal', disableClose: this.attributes.disableBackdropClose});

            var target = $(event.currentTarget);
            this.load(target.attr('href'));

            picnic.activeModals = picnic.activeModals.add(this.root);
            picnic.event.trigger('picnic.modal.open', this.root);
            if(!this.transitionEndEvent)
            {
                picnic.event.trigger('picnic.modal.opened', this.root);
            }
        },

        close: function()
        {
            if(this.isLoading) return;
            if(!this.isActive) return;
            this.isActive = false;

            this.root.removeClass('is-active');

            picnic.activeModals = picnic.activeModals.not(this.root);
            picnic.event.trigger('picnic.modal.close', this.root);
            if(!this.transitionEndEvent)
            {
                picnic.event.trigger('picnic.modal.closed', this.root);
            }

            this.afterClose();
        },

        forceClose: function ()
        {
            picnic.backdrop.enableClose();
            this.close();
        },

        afterClose: function()
        {
            if(!picnic.activeModals.length)
            {
                picnic.backdrop.close();
            }
        },

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