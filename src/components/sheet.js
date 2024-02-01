(function(window, $, picnic) {

    picnic.activeLayers['sheet'] = $();

    var sheet = function()
    {
        picnic.layer.call(this);
    };

    $.extend(sheet.prototype, picnic.layer.prototype,
    {
        type: 'sheet',
        backdropCssModifier: 'sheet'
    });

    picnic.sheet = sheet;
    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = picnic.sheet;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return picnic.sheet; });
	}

}(window, jQuery, window.picnic || {}));