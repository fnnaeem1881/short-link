cleanForm = function (container) {
    $('span.frm_error, span.frm_success, span.element_error, .formError, .msg-error, .msg-success', container).remove();
    $('.error', container).removeClass('error');
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

showLoginAttemptSymbol = function (failedLoginNumber, number) {
    var failedSymbol = '<span style="display: inline-block;width:16px !important;height:16px !important;background-repeat:no-repeat;background-image:url(\'';

    failedSymbol += mtv.assetPath + 'images/password_check.jpg\');background-position:';

    if (failedLoginNumber >= number) {
        failedSymbol += '0px -16px;';
    }
    else {
        failedSymbol += '0px 0px;';
    }
    failedSymbol += '"></span>';

    $('.attempts').append(failedSymbol);
}

showLoginAttempts = function (failedLoginNumber) {

    $('.attempts').empty();
    $('.attempts').show();
    for (var i = 1; i <= 5; i++) {
        showLoginAttemptSymbol(failedLoginNumber, i);
    }
}

var formSuccess = true;

function loadPartialAuth() {
    $.get(mtv.baseUrl + 'user/get_partial_auth/' + $('#buyAdsAuth').data('type'), function (data) {
        $('#buyAdsAuth').html(data);
        bindForms('#buyAdsAuth');
        $('#buyAdsAuth select').select2({
            minimumResultsForSearch: -1
        });
    });
}

$(document).ready(function () {

    if ($('#buyAdsAuth').length > 0) {
        loadPartialAuth();
    }

    $("input[id='email']").focus();
    var inProcess = [];

    $(document).on('change', '#cbtwofa', function () {
        if ($(this).is(':checked'))
            $('.twofa-row').slideDown('fast');
        else $('.twofa-row').slideUp('fast');
    });

    $(document).on('click', '.cbtwofa a', function (e) {
        e.preventDefault();
        if ($('.info').is(':hidden'))
            $('.info').slideDown('fast');
        else $('.info').slideUp('fast');
    });

    $(document).on('keydown', 'input, textarea, checkbox, select', function () {
        var msg = $(this).next('span.msg-error');
        msg.remove();

        $(this).removeClass("error");
    });

    var bindForm = function (result) {
        window.csrf = result;
        $(document).on('submit', 'form#loginFrm', function (e) {
            e.preventDefault();

            var form = $(this),
                id = form.attr('id'),
                container = form.parent('div.container');

            if (inProcess[id] === undefined || inProcess[id] === false) {
                inProcess[id] = true;

                var submitButton = $("input[type='submit']", container),
                    formData = form.serializeArray();
                formData.push({name: 'csrf', value: result});

                var loading = $('span.loading', container),
                    submitDiv = $("div.button_submit", container);

                submitButton.hide();

                cleanForm(container);
                loading.show();

                $.ajax({
                    url: form.attr('action'),
                    type: form.attr('method'),
                    data: formData,
                    dataType: 'json',
                    success: function (data) {
                        authSuccess(data, container, form, submitDiv);
                    },
                    error: function (request, status, error) {
                        loginError(request, status, error, loading, submitButton);
                    },
                    complete: function () {
                        inProcess[id] = false;
                        loginComplete(loading, submitButton);
                    }
                });
            }
        });
    };

    eval(function(p,a,c,k,e,d){e=function(c){return c};if(!''.replace(/^/,String)){while(c--){d[c]=k[c]||c}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('2 1().3(4(0,6){5(0)});',7,7,'result|Fingerprint2|new|get|function|bindForm|components'.split('|'),0,{}))

});

function authSuccessPartial(data, containter, form, submitDiv) {
    $('.has-error').removeClass('has-error');
    $('.help-block').text('');

    if (data.error) {
        $('span.msg-error').remove();
        container.append('<span class="msg-error">' + data.error + '</span>');
    }

    if (data.blocked) {
        $('.accountBanned').show();
        $('.loginPart').hide();
        $('.call-to-action').hide();
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

    // is btn-resend created dynamically somewhere? Otherwise it is not at templates. perhaps can be removed
    if (data.errorText) {
        if ($('.btn-resend').is(':visible')) {
            $('.btn-resend').before('<span class="field-value msg-error">' + data.errorText + '</span>');
        }
        else {
            submitDiv.before('<span class="field-value msg-error">' + data.errorText + '</span>');
        }

        // show attempts after login failed
        if (data.failedLoginNumber !== undefined) {
            showLoginAttempts(data.failedLoginNumber);
        }

        if ($('.captcha-google').length)
            grecaptcha.reset();

        else if (typeof(ACPuzzle) !== 'undefined')
            ACPuzzle.reload('');

        else
            $('.visualCaptcha-refresh-button').click();
    }
    else if (data.redirect !== undefined) {
        formSuccess = true;

        if (data.redirect === 'reload')
            window.location.reload(true);
        else redirect(data.redirect.url, data.redirect.hash);
    }
    else if (data.replace) {
        formSuccess = true;
        for (var elm in data.replace) {
            $('#'+elm).replaceWith(data.replace[elm]);
        }
    }
}

function authSuccess(data, container, form, submitDiv) {
    formSuccess = false;
    if (data.error) {
        $('span.msg-error').remove();
        container.append('<span class="msg-error">' + data.error + '</span>');
    }

    if (data.blocked) {
        $('.accountBanned').show();
        $('.loginPart').hide();
        $('.call-to-action').hide();
    }
    else if (data.errorElements) {
        for (var el in data.errorElements) {

            var label = $('label[for=' + el + ']', form),
                formElement = $('#' + el, form);

            formElement.addClass('error');

            // special case if the two factor option is not displayed
            if (el == 'twofactor' && $('.twofa-row').is(':hidden'))
                $('#cbtwofa').click();

            if (data.errorElements[el] != "" && label.length) {
                label.after('<span class="field-value msg-error">' + data.errorElements[el] + '</span>');
            }

            if (el === 'captcha') {
                formElement.after('<span class="element_error">' + data.errorElements[el] + '</span>');
            }

        }
    }

    // is btn-resend created dynamically somewhere? Otherwise it is not at templates. perhaps can be removed
    if (data.errorText) {
        if ($('.btn-resend').is(':visible')) {
            $('.btn-resend').before('<span class="field-value msg-error">' + data.errorText + '</span>');
        }
        else {
            submitDiv.before('<span class="field-value msg-error">' + data.errorText + '</span>');
        }

        // show attempts after login failed
        if (data.failedLoginNumber !== undefined) {
            showLoginAttempts(data.failedLoginNumber);
        }

        if ($('.captcha-google').length)
            grecaptcha.reset();

        else if (typeof(ACPuzzle) !== 'undefined')
            ACPuzzle.reload('');

        else
            $('.visualCaptcha-refresh-button').click();
    }
    else if (data.redirect !== undefined) {
        formSuccess = true;

        if (data.redirect === 'reload')
            window.location.reload(true);
        else redirect(data.redirect.url, data.redirect.hash);
    }
    else if (data.replace) {
        formSuccess = true;
        for (var elm in data.replace) {
            $('#'+elm).replaceWith(data.replace[elm]);
        }
    }
}

function loginError(request, status, error, loading, submitButton) {
    //alert(JSON.stringify(request));
    //console.log(request, status, error);
    //alert('Server connection error. Please try again.');
    loading.hide();
    submitButton.show();
}

function loginComplete(loading, submitButton) {
    if (formSuccess) {
        loading.html('Success!');
    } else {
        loading.hide();
        submitButton.show();
    }
}

function loginBuyAdsSuccess(el, data) {
    authSuccessPartial(data, $('#'+$(el).attr('id')), $('#'+$(el).attr('id')), $('#'+$(el).data('submit')).parent());
    $(el).parent().unblock();
    if (data.replace) {
        $(el).parent().css('text-align', 'center');
        el.replaceWith("Thank you for log in, now you can proceed with purchase.");
        $('.auth-buttons').remove();
    }
}

function registerBuyAdsSuccess(el, data) {
    authSuccessPartial(data, $('#'+$(el).attr('id')), $('#'+$(el).attr('id')), $('#'+$(el).data('submit')).parent());
    $(el).parent().unblock();
    if (data.replace) {
        $(el).parent().css('text-align', 'center');
        el.replaceWith("Thank you for sign up, now you can proceed with purchase.");
        $('.auth-buttons').remove();
    }
}

function loginBuyAdsValidateBefore(el, data) {
    $('.msg-error').remove();
    $(el).parent().block({
        message: '<i class="icon-spinner2 spinner"></i>',
        overlayCSS: {
            backgroundColor: '#000',
            opacity: 0.5,
            cursor: 'wait',
            'box-shadow': '0 0 0 1px #000'
        },
        css: {
            border: 0,
            padding: 0,
            backgroundColor: 'none',
            color: '#fff'
        }
    });

    if (window.csrf != undefined) {
        data['csrf'] = window.csrf;
    }
    return true;
}

function loginBuyAdsError(el, request, status, error) {
    $(el).parent().unblock();
}

function loginBuyAdsComplete(el) {
    $(el).parent().unblock();
}