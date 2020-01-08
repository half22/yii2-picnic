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