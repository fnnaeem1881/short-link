cleanForm = function (container) {
    $('#submit_info', container).addClass('hidden');
    $('.help-block', container).text('');
    $('div.form-group', container).removeClass('has-error');
};

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

var formSuccess = true;

$(document).ready(function () {
    var inProcess = [];

    $(document).delegate('form.frm_ajax', 'submit', function (e) {
        e.preventDefault();

        var form = $(this),
            id = form.attr('id'),
            container = form.parent('div');
        
        if (inProcess[id] === undefined || inProcess[id] === false) {
            inProcess[id] = true;

            var formData = form.serializeArray();
            cleanForm(form);

            form.block({
                message: '<i class="icon-spinner2 spinner"></i>',
                overlayCSS: {
                    backgroundColor: '#1B2024',
                    opacity: 0.85,
                    cursor: 'wait'
                },
                css: {
                    border: 0,
                    padding: 0,
                    backgroundColor: 'none',
                    color: '#fff'
                }
            });

            $.ajax({
                url: form.attr('action'),
                type: form.attr('method'),
                data: formData,
                dataType: 'json',
                success: function (data) {
                    form.unblock();

                    if (data.error) {
                        formSuccess = false;
                        $('#submit_info', form).html('Error: ' + data.error).removeClass('hidden');
                    }
                    else if (data.errors) {
                        formSuccess = false;

                        for (var el in data.errors) {

                            var formElement = $('#' + el, form);
                            formElement.parent('div.form-group').addClass('has-error');
                            if (data.errors[el] != '') {
                                formElement.parent('div.form-group').find('.help-block').text(data.errors[el]);
                            }
                        }
                    }
                    else if (data.errorElements) {
                        formSuccess = false;

                        for (var el in data.errorElements) {

                            var formElement = $('#' + el, form);
                            formElement.parents('div.form-group').addClass('has-error');
                            if (data.errorElements[el] != '') {
                                formElement.parents('div.form-group').find('.help-block').text(data.errorElements[el]);
                            }
                        }
                    }
                    else {
                        formSuccess = true;
                        if (data.html !== undefined) {
                            container.html(data.html);
                        }
                        else if (data.success !== undefined && data.redirect === undefined) {
                            container.prepend('<div class="alert alert-success">' + data.success + '</div>');
                        }
                        
                        if (data.replace !== undefined) {
                            for (el in data.replace) {
                                $('#' + el).html(data.replace[el]);
                            }
                        }

                        if (data.redirect !== undefined) {
                            if (data.redirect === 'reload') {
                                window.location.reload(true);
                            }
                            else if (data.redirect.timeout !== undefined) {
                                setTimeout(function () {
                                    redirect(data.redirect.url, data.redirect.hash);
                                }, data.redirect.timeout);
                            }
                            else  {
                                redirect(data.redirect.url, data.redirect.hash);
                            }
                        }

                        if (form.attr('callback') !== undefined) {
                            var func = form.attr('callback');
                            if (typeof window[func] === 'function') {
                                window[func]();
                            }
                        }
                    }
                },
                error: function (request, status, error) {
                    form.unblock();
                },
                complete: function () {
                    inProcess[id] = false;

                    form.unblock();
                }
            });
        }
    });
});