(function(window, $, picnic) {

    picnic.activeLayers = picnic.activeLayers || {};
    picnic.activeLayers['panel'] = $();

    var panel = function()
    {
        picnic.layer.call(this);
    };

    $.extend(panel.prototype, picnic.layer.prototype,
    {
        type: 'panel',
        backdropCssModifier: 'panel'
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