cleanForm = function (container) {
    $('span.frm_error, span.frm_success, span.element_error, .formError', container).remove();
    $('.error', container).removeClass('error');
};


$(document).ready(function ()
{
    $('#submit_form').click(function(e) {
        e.preventDefault();

        var formSuccess = false;
        var form = $('#supportFrm');
        var formData = form.serializeArray();
        var container = $('div.container');

        $('#submit_info').html('');
        $('#submit_form').hide();
        $('#submit_image_loading').show();

        cleanForm(container);

        $.ajax({
            url: form.attr('action'),
            type: form.attr('method'),
            data: formData,
            dataType: 'json',
            success: function(data) {
                if(data.errors)
                {
                    formSuccess = false;
                    $('#submit_info').html('Errors are marked in red, please correct the input data.');

                    for (var el in data.errors)
                    {
                        $('#' + el, form).css('border', '2px solid red');
                    }
                }
                else if(data.error)
                {
                    formSuccess = false;
                    $('#submit_info').html('Error: ' + data.error);
                }
                else if (data.errorElements)
                {
                    formSuccess = false;
                    for (var el in data.errorElements) {

                        var label = $('label[for=' + el + ']', form),
                            formElement = $('#' + el, form);

                        formElement.addClass('error');
                        
                        if (data.errorElements[el] != "" && label.length) {
                            label.after('<span class="field-value msg-error">' + data.errorElements[el] + '</span>');
                        }

                        if (el === 'captcha') {
                            formElement.after('<span class="element_error">' + data.errorElements[el] + '</span>');
                        }

                    }
                }
                else
                {
                    formSuccess = true;
                    if (data.html !== undefined) {
                        container.html(data.html);
                    }
                    if (data.redirect !== undefined)
                    {
                        if (data.redirect === 'reload')
                        {
                            window.location.reload(true);
                        }
                        else
                        {
                            redirect(data.redirect.url, data.redirect.hash);
                        }
                    }
                }
            },
            error: function(request, status, error) {
                $('#submit_image_loading').hide();
                $('#submit_form').show();
            },
            complete: function() {
                if (formSuccess)
                {
                    $('#submit_form_loading').html('Success!');
                }
                else
                {
                    $('#submit_image_loading').hide();
                    $('#submit_form').show();
                    if (typeof grecaptcha !== 'undefined') {
                        grecaptcha.reset();
                    }
                }
            }
        });
    });

    $("input, select, textarea").click(function() {
        $(this).css('border', '');
    });
});

redirect = function (url, hash) {
    var curUrl = window.location.href,
        curHash = window.location.hash;

    if (curHash)
        curUrl = curUrl.substr(0, curUrl.indexOf(curHash));

    if (hash !== undefined && curUrl == url) {
        window.location.hash = hash;
        window.location.reload(true);
        return;
    }

    window.location.href = url + (hash !== undefined ? hash : '');
};