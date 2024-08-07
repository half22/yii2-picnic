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

            var matrix = this.css('transform').match(/^matrix\((.+)\)$/);
            if(matrix)
            {
                var values = matrix[1].split(',');
                for(var i = 0; i < values.length; i++)
                {
                    values[i] = Math.round(values[i]);
                }
                this.css('transform', 'matrix(' + values.join(', ') + ')');
            }

            var matrix3d = this.css('transform').match(/^matrix3d\((.+)\)$/);
            if(matrix3d)
            {
                var values3d = matrix3d[1].split(',');
                for(var j = 0; j < values3d.length; j++)
                {
                    values3d[j] = Math.round(values3d[j]);
                }
                this.css('transform', 'matrix3d(' + values3d.join(', ') + ')');
            }
        }
    };

    var originalVal = $.fn.val;
    $.fn.val = function()
    {
        //This will trigger "change" event when "val(new_val)" called
        //with value different than the current one
        var prev;
        if(arguments.length > 0)
        {
            prev = originalVal.apply(this,[]);
        }
        var result =originalVal.apply(this,arguments);
        if(arguments.length>0 && prev!=originalVal.apply(this,[]))
        {
            $(this).change();
        }
        return result;
    };

    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    $.fn.size = function() {
        return this.length;
    };

    var uniqueId = 1;
    $.fn.geenerateId = function() {
        this.prop('id', 'id_' + (uniqueId++));
        return this;
    };

}(window, jQuery));