$(document).ready(function() {

    $(".section").click(function() {
        var id = parseInt(($(this).attr("id")).replace(/[A-Za-z$-]/g, ""));
        $(".bottom").addClass('hidden');
        $(".questions").val(0);
        $("#display_form").html('');
        $(".support_section:visible").slideUp();
        $("#support_section" + id.toString()).slideDown();
        return false;
    });

    $('body').on('click', 'a.other_sug', function() {
        $(this).parent().html($(".other_template").html());
        $(".bottom").removeClass('hidden');
        return false;
    });
})

