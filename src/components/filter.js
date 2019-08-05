(function(window, $, picnic) {

    var filter = function()
    {
        picnic.controller.call(this);

        this.elements = ['checkboxes', 'input', 'submitButton', 'resetButton'];
        this.attributes = ['autoSubmit', 'autoReload', 'ajaxUrl'];
    };

    $.extend(filter.prototype, picnic.controller.prototype,
    {
        init: function ()
        {

        },

        bindEvents: function()
        {
            this.on('change', this.elements.input, this.onInputChange);
            this.on('click', this.elements.submitButton, this.submit);
            this.on('click', this.elements.resetButton, this.reset);
        },

        onInputChange: function()
        {
            this.autoReload();
            this.autoSubmit();
        },

        reset: function()
        {
            this.elements.input.prop('checked', false);
            this.submit();
        },

        autoSubmit: function()
        {
            if(this.attributes.autoSubmit)
            {
                if (this.submitTimer)
                {
                    clearTimeout(this.submitTimer);
                    this.submitTimer = null;
                }
                var timeout = this.attributes.autoSubmitTimeout || 1000;
                this.submitTimer = setTimeout(this.submit.bind(this), timeout);
            }
        },

        autoReload: function()
        {
            if(this.attributes.autoReload && this.attributes.ajaxUrl)
            {
                this.disableTimeout = setTimeout($.proxy(this.showLoading, this), 200);
                this.isLoading = true;

                $.ajax( {
                    url: this.attributes.ajaxUrl,
                    type: 'GET',
                    data: this.root.serializeArray(),
                    success: this.onLoaded.bind(this),
                    complete: this.hideLoading.bind(this)
                });
            }
        },

        onLoaded: function (data)
        {
            if (this.disableTimeout)
            {
                clearTimeout(this.disableTimeout);
                this.disableTimeout = null;
            }

            if (data.html)
            {
                this.form.html(data.html);
                picnic.event.trigger('picnic.filter.loaded', this.root);
            }
        },

        disableUnusedCheckboxes: function ()
        {
            this.elements.checkboxes.each(function(index, domElement) {
                var checkboxes = $(domElement);
                if(checkboxes.findElement('input', ':enabled').length == checkboxes.findElement('input', ':checked').length || checkboxes.findElement('input', ':checked').length == 0)
                {
                    checkboxes.findElement('input').attr('disabled', 'disabled');
                }

            }.bind(this));
        },

        submit: function()
        {
            this.disableUnusedCheckboxes();
            setTimeout(this.root.submit.bind(this.root), 0);
            picnic.event.trigger('picnic.filter.submit', this.root);
        },

        hideLoading: function()
        {
            this.isLoading = false;
            this.root.removeClass('is-loading');
        },

        showLoading: function()
        {
            this.isLoading = true;
            this.root.addClass('is-loading');
        }
    });

    picnic.filter = filter;
    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = picnic.filter;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return picnic.filter; });
	}

}(window, jQuery, window.picnic || {}));