$(document).ready(function () {

    $('.hide_proof_link').hide();

    $(document).on('click', '.hide_proof_link', function(e){
        e.preventDefault();

        $(this).hide();

        // remove whole tr with presented image
        $(this).parent().parent().next('tr').hide('slow');

        // show 'view' button
        $(this).parent().find('.view_proof_link').show();

    });

    $(document).on('click', '.view_proof_link', function(e){
        e.preventDefault();

        $(this).hide();

        // view image under the entry within new row
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var img = document.createElement("img");
        $(td).attr('colspan',6).css('text-align','center');

        // create copy of hidden image and show it to the world
        $(img).attr('src', $(this).siblings('img').attr('src')).attr('width','300px');

        $(img).on('click', function(e){
            window.open($(this).attr('src'), '_blank');
        });

        $(td).append(img);
        $(tr).append(td);
        $(tr).hide();
        $(tr).insertAfter($(this).parent().parent()).fadeIn(1400);
        // show 'hide' button

        $(this).parent().find('.hide_proof_link').show();

    });

});
