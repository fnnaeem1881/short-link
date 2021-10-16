var modal = (function(){
    var
    method = {},
    overlay,
    modal,
    modalContent,
    modalClose;

    // Center the modal in the viewport
    method.center = function (relTop) {
        var top, left;

        if (relTop == undefined) {
            top = Math.abs($(window).height() - modal.outerHeight()) / 2;
        }  else {
            top = relTop;
        }

        left = Math.abs($(window).width() - modal.outerWidth()) / 2;

        modal.css({
            top: top+'px',
            left: left+'px'
        });
    };

    // Open the modal
    method.open = function (settings) {
        $('body').addClass('modal-open');

        modalContent.html(settings.content);

        modal.css({
            width: settings.width || 'auto',
            height: settings.height || 'auto'
        });

        method.center(settings.top);

        $(window).bind('resize.modal', method.center);

        modal.show();
        overlay.show();
    };

    // Close the modal
    method.close = function () {
        $('body').removeClass('modal-open');

        modal.hide();
        overlay.hide();
        modalContent.empty();
        $(window).unbind('resize.modal');
    };

    // Generate the HTML and add it to the document
    overlay = $('<div id="overlay"></div>');
    modal = $('<div id="modal"></div>');
    modalContent = $('<div id="modalContent"></div>');
    modalClose = $('<a id="modalClose" href="#">close</a>');

    modal.hide();
    overlay.hide();
    modal.append(modalContent, modalClose);

    $(document).ready(function(){
        $('body').append(overlay, modal);
    });

    modalClose.click(function(e){
        e.preventDefault();
        method.close();
    });

    return method;
}());

var closeModal = function() {
  modal.close();
}

function showError(obj, message){
    if ($('#errorDiv').length > 0) {
        $('#errorDiv').html(message);
    } else {

        $('<div id="errorDiv">')
            .css({
                'top': (obj.offset().top + obj.outerHeight()) + 'px',
                'left': obj.offset().left + 'px'
            })
            .html(message)
            .appendTo('body')
            .fadeIn('fast')
            .animate({opacity: 1.0}, 2000)
            .fadeOut('fast', function() {
                $(this).remove();
            });
    }
}


$(document).ready(function(){
    $(document).delegate('a.popup', 'click', function(e){
        e.preventDefault();

        var link = $(this);
        var top = link.attr('top');

        $.get(link.attr('href'), function(data){
            try {
                var jsonData = $.parseJSON(data);
                showError(link, jsonData.error);
            }
            catch(e) {
                modal.close();
                modal.open({content: data, top: top});
            }
        });
    });

    if (mtv.userState == 'guest') {
        $("a.validate").each(function(){
            $(this).attr('href', mtv.baseUrl+'login.html?redirect=' + $(this).attr('href')).removeClass('validate');
        });
    }
});