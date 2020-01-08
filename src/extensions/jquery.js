(function(window, $) {

    $.fn.shake = function(interval, distance, times)
    {
        interval = interval || 100;
        distance = distance || 10;
        times = times || 4;

        this.css({position: 'relative'});
        for(var i = 0; i < (times + 1) ; i++)
        {
            this.animate({left: ((i % 2 == 0 ? distance : distance * -1))}, interval);
        }
        this.animate({left: 0}, interval);
    };
    
    $.fn.roundTransformationMatrixValues = function()
    {
        if(this.css('transform'))
        {
            this.css({transform: ''});

            var matrix = this.css('transform').match(/^matrix\((.+)\)$/)[1] || this.css('transform').match(/^matrix3d\((.+)\)$/)[1];
            if(matrix)
            {
                var values = matrix.split(',');
                for(var i = 0; i <= values.length; i++)
                {
                    values[i] = Math.round(values[i]);
                }
                this.css('transform', 'matrix(' + values.join(', ') + ')');
            }
        }
    };

}(window, jQuery));