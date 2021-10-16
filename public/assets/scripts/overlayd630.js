overlay = (function(){

    var _overlay = $('<div id="objOverlay"><img src="' + mtv.assetPath + 'images/loading_big.gif"></div>'),

    init = function(){
        $('body').append(_overlay);
    },

    show = function(obj){
        if (!obj) return;

        // Set the overlay to the specified object's coordinates
        _overlay.css({
            opacity: 0.65,
            top    : obj.offset().top,
            left   : obj.offset().left,
            width  : obj.outerWidth(true),
            height : obj.outerHeight(true)
        });

        // Place the loading image right in the center
        _overlay.find('img').css({
            position: 'absolute',
            top     : (obj.outerHeight(true) / 2),
            left    : (obj.outerWidth(true) / 2) - 16
        });

        // Display the overlay
        _overlay.fadeIn('fast');
    },

    hide = function(){
        // Remove the overlay
        _overlay.fadeOut('fast');
    };

    $(init);

    return {
        show: show,
        hide: hide
    };
})();