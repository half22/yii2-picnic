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

        bindEvents: function ()
        {
            picnic.layer.prototype.bindEvents.call(this);
        },

        beforeOpen: function ()
        {
            picnic.layer.prototype.beforeOpen.call(this);

            picnic.activeLayers.modal.each(function (index, domElement) {
                $(domElement).hide();
            });
        },

        afterClose: function ()
        {
            picnic.layer.prototype.afterClose.call(this);

            if(picnic.activeLayers.modal.length)
            {
                picnic.activeLayers.modal.last().show();
            }
        },

        adjustPixelPerfectPosition: function()
        {
            this.root.roundTransformationMatrixValues();
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