$(document).ready(function () {

    $('#gear i').click(function () {
        $('.gear-menu').toggle();
        if ($('.gear-menu').css('display') === 'block') {
            $(this).addClass('clicked');
        } else {
            $(this).removeClass('clicked');
        }
    });

    $('#views i').click(function () {
        $('.views-menu').toggle();
        if ($('.views-menu').css('display') === 'block') {
            $(this).addClass('clicked');
            $(this).parent().addClass('active');
        } else {
            $(this).removeClass('clicked');
            $(this).parent().removeClass('active');
        }
    });


    $('.tooltip').tooltipster({
        theme: 'tooltip-theme',
        animation: 'grow',
        position: 'left'
    });

    $('.comment-count').click(function() {
        var comments = $(this).parent().parent().parent().next();
        comments.toggle();
        if (comments.css('display') === 'block') {
            $(this).find('.dropdown-icon').removeClass('fa-chevron-down').addClass('fa-chevron-up');
        } else {
            $(this).find('.dropdown-icon').removeClass('fa-chevron-up').addClass('fa-chevron-down');
        }
    });
    
    $('.add-comment').click(function() {
       // $(this).parent().parent().next().toggle();
    });

});