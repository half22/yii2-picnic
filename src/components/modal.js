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
            if(this.root.css('transform'))
            {
                this.root.css({transform: ''});

                var matrix = this.root.css('transform').match(/^matrix\((.+)\)$/)[1];
                if(matrix)
                {
                    var values = matrix.split(',');
                    this.root.css('transform', 'matrix(' + values[0] + ', ' + values[1] + ', ' + values[2] + ', ' + values[3] + ', ' + Math.round(values[4]) + ', ' + Math.round(values[5]) + ')');
                }
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