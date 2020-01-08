(function(window, $, picnic) {

    picnic.activeLayers['modal'] = $();

    var modal = function()
    {
        picnic.layer.call(this);
    };

    $.extend(modal.prototype, picnic.layer.prototype,
    {
        type: 'modal',
        backdropCssModifier: 'modal',

        adjustPixelPerfectSize: function()
        {
            this.root.css({
                width: null,
                height: null
            });
            if(this.root.outerWidth() % 2 != 0)
            {
                this.root.css('width', Math.round(this.root.outerWidth() / 2) * 2);
            }
            if(this.root.outerHeight() % 2 != 0)
            {
                this.root.css('height', Math.round(this.root.outerHeight() / 2) * 2);
            }
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