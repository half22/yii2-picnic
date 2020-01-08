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

            var matrix = this.css('transform').match(/^matrix\((.+)\)$/)[1];
            if(matrix)
            {
                var values = matrix.split(',');
                for(var i = 0; i < values.length; i++)
                {
                    values[i] = Math.round(values[i]);
                }
                this.css('transform', 'matrix(' + values.join(', ') + ')');
            }

            var matrix3d = this.css('transform').match(/^matrix3d\((.+)\)$/)[1];
            if(matrix3d)
            {
                var values3d = matrix3d.split(',');
                for(var j = 0; j < values3d.length; j++)
                {
                    values3d[j] = Math.round(values3d[j]);
                }
                this.css('transform', 'matrix3d(' + values3d.join(', ') + ')');
            }
        }
    };

}(window, jQuery));