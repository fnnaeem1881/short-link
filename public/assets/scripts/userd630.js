$(document).ready(function() {
    eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('$(\'#2\').7();6 9().3(5(1){$(\'#4\').8($(\'<g>\').0(\'a\',\'e\').0(\'d\',\'b\').c(1));$(\'#2\').f()});',17,17,'attr|result|submit_form|get|form|function|new|hide|append|Fingerprint2|type|csrf|val|name|hidden|show|input'.split('|'),0,{}))

    $(document).delegate('#changeReferrerFrm', 'submit', function(e) {
        e.preventDefault();

        var formSuccess = false;
        var form = $('#changeReferrerFrm');
        var formData = form.serializeArray();

        $('#submit_referrer_info').html('');
        $('#submit_referrer_form').hide();
        $('#submit_referrer_image_loading').show();

        var username = $('#refname').val();

        $.ajax({
            url: form.attr('action'),
            type: form.attr('method'),
            data: formData,
            dataType: 'json',
            success: function(data) {
                if(data.errors) {
                    formSuccess = false;
                    $('#submit_referrer_info').html('User not found, please try again.');

                    for(var el in data.errors) {
                        $('#' + el, form).css('border', '2px solid red');
                    }
                }
                else if(data.error) {
                    formSuccess = false;
                    $('#submit_referrer_info').html('Error: ' + data.error);
                }
                else {
                    formSuccess = true;
                }
            },
            error: function(request, status, error) {
                $('#submit_referrer_image_loading').hide();
                $('#submit_referrer_form').show();
            },
            complete: function() {
                if(formSuccess) {
                    $('#ref').val(username);
                    $('#referrerName').text(username);
                    $('#submit_referrer_form_loading').html('Success!');
                    $('#modalClose').click();
                }
                else {
                    $('#submit_referrer_image_loading').hide();
                    $('#submit_referrer_form').show();
                }
            }
        });
    });

    $("input, select").click(function() {
        $(this).css('border', '');
        $(this).removeClass('error');
    });

    $(document).delegate('.delete', 'click', function(e) {
        e.preventDefault();

        var link = $(this).attr('href');
        var container = $('div.pageable'), table = container.find('table'), obj = null;

        if(table.length) {
            obj = table;
        }
        else if(container.length) {
            obj = container;
        }

        obj.block({
            message: '<i class="icon-spinner2 spinner"></i>',
            overlayCSS: {
                backgroundColor: '#fff',
                opacity: 0.8,
                cursor: 'wait',
                'box-shadow': '0 0 0 1px #ddd'
            },
            css: {
                border: 0,
                padding: 0,
                backgroundColor: 'none'
            }
        });

        $.get(link, function(data) {
            window.location.reload(true);
            obj.unblock();
        });
    });

    $('.cbEmailSetting').click(function(e) {
        // let's grab all the checkboxes we have in that div and sum up the ones that are ticked
        var total = 0;
        $(".cbEmailSetting:checked").each(function() {
            total += parseInt($(this).val());
        });

        var form = $("#emailsettingsFrm"),
            container = $('#notif_message');

        $('dl').block({
            message: '<i class="icon-spinner2 spinner"></i>',
            overlayCSS: {
                backgroundColor: '#fff',
                opacity: 0.8,
                cursor: 'wait',
                'box-shadow': '0 0 0 1px #ddd'
            },
            css: {
                border: 0,
                padding: 0,
                backgroundColor: 'none'
            }
        });

        $.ajax({
            url: form.attr('action'),
            type: form.attr('method'),
            data: {settings: total},
            dataType: 'json',
            success: function(data) {
                if(data.error) {
                    container.html('<span class="frm_error">' + data.error + '</span>');
                }
                else {
                    if(data.success !== undefined) {
                        container.html(data.success).show();
                        setTimeout(function() {
                            container.fadeOut('fast').html('');
                        }, 2000);
                    }
                }
            },
            complete: function() {
                $('dl').unblock();
            }
        });
    });
});

function redirect(url, hash) {
    var curUrl = window.location.href,
        curHash = window.location.hash;

    if(curHash) {
        curUrl = curUrl.substr(0, curUrl.indexOf(curHash));
    }

    if(hash !== undefined && curUrl == url) {
        window.location.hash = hash;
        window.location.reload(true);
        return;
    }

    window.location.href = url + (hash !== undefined ? hash : '');
}

function cleanForm(container) {
    $('span.frm_error, span.frm_success, span.element_error, .formError', container).remove();
    $('.error', container).removeClass('error');
}