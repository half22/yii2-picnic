(function(window, $) {

    $.fn.shake = function shake(interval, distance, times)
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
    }

}(window, jQuery));