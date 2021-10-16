var website_ok = false;

$(document).ready(function ()
{
    renew();
    calc_adpacks();

    $(document).delegate('#reuse', 'change', function (e){
        var sel = $("#reuse option:selected").val();
        if(sel != -1)
        {
            redirect(mtv.baseUrl + 'member/buy_' + sel + '.html');
        }
    });

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires + "; domain="+mtv.cookieDomain;
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
        }
        return "";
    }

    $('#test_url').click(function() {
        var link = $('#url').val().toLowerCase();

        if(link.length == 0) return;

        if(link.indexOf('http://') == - 1 && link.indexOf('https://') == - 1)
        {
            link = 'http://' + link;
            $('#url').val(link);
        }

        $('#test_url').hide();
        $('#test_url_loading').attr('src', mtv.assetPath + 'images/loading.gif').show();

        setCookie('website_ok', 0, 1);

        interval = setInterval(verify_ad, 500);

        window.open(mtv.nonSslBaseUrl + 'member/verify_ad.html?url=' + btoa($('#url').val()), '_blank');
    });

    function verify_ad()
    {
        var status = getCookie('website_ok');
        if(status == 1)
        {
            $('#test_url_loading').attr('src', mtv.assetPath + 'images/icons/positive.png').show();
            clearInterval(interval);
            website_ok = true;
            setCookie('website_ok', 0, 1);
            $("#verifyWarning").hide();
        }
        else
        {
            if (website_ok == true)
            {
                clearInterval(interval);
                return;
            }

            $('#test_url_loading').attr('src', mtv.assetPath + 'images/icons/negative.png').show();
            website_ok = false;
            $("#verifyWarning").show();
        }
    }

    $('#url').on('input', function() {
        $('#test_url_loading').hide();
        $('#test_url').show();
        website_ok = false;
    });

    $("#adpacks_number").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    }).on('keyup mouseup', function(e) {
            if(!$("#generic").is(':checked'))
                calc_adpacks();
            if($("#payment_method option:selected").val() != '--')
                calc_adpacks();
    });

    $('input[name=adpack_type]:radio').change(function(e) {
        calc_adpacks();
    });

    $("#payment_method").change(function() {
        calc_adpacks();
    });

    $('#submit_form').click(function(e) {
        e.preventDefault();

        var errors = '';

        if(!website_ok) {
            errors += '- Please test website URL<br/>';
        }

        if(errors.length > 0)
        {
            $('#submit_info').html('<div class="alert alert-danger"><strong>Errors:</strong> ' + errors.slice(0,-5) + '</div>');
        }
        else
        {
            $('#url_info').html('');
            $('#submit_info').html('');
            $('#text1_info').html('');

            $("input, select").css('border', '');
            $(".validation-error-label").remove();

            var formSuccess = false;
            var form = $('#newCampaignFrm');
            var formData = form.serializeArray();

            $('#submit_form').hide();
            $('#submit_image_loading').show();

            form.block({
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

            $.ajax({
                url: form.attr('action'),
                type: form.attr('method'),
                data: formData,
                dataType: 'json',
                success: function(data) {
                    if(data.errors)
                    {
                        formSuccess = false;
                        $('#submit_info').html('<div class="alert alert-danger">Errors are marked in red, please correct the input data.</div>');

                        for (var el in data.errors)
                        {
                            $('#' + el, form).addClass('error');
                            $('a[href$="#'+$('#' + el, form).parents('fieldset').prev('h6').attr('id')+'"]').parent().addClass('error');
                            $('a[href$="#'+$('#' + el, form).parents('fieldset').prev('h6').attr('id')+'"]').parent().removeClass('done');
                            if(data.errors[el])
                            {
                                $('#' + el, form).after('<label class="validation-error-label">'+data.errors[el]+'</label>');
                            }
                        }
                    }
                    else if(data.error)
                    {
                        formSuccess = false;
                        $('#submit_info').html('<div class="alert alert-danger"><strong>Error:</strong> ' + data.error + '</div>');
                    }
                    else
                    {
                        formSuccess = true;
                        if (data.html !== undefined)
                        {
                            $('#submit_info_redirect').html(data.html);
                        }
                        else if (data.redirect !== undefined)
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
                error: function(data) {
                    alert(JSON.stringify(data));
                    $('#submit_info').html('Server connection error. Please try again.');

                    $('#submit_form').show();
                    form.unblock();
                },
                complete: function() {
                    $('#submit_form').show();
                    form.unblock();
                }
            });
        }
    });

    $("input, select").click(function() {
        $(this).css('border', '');
    });

    $("#text1").on("change paste keyup", function()
    {
        var src = $(this).val();
        var fix = src.replace(/ +(?= )/g,'');
        $(this).val(fix);
    });

    $('#forced_view').on('change', (function () {
        calc_adpacks();
    }));
});

function renew()
{
    if(renewId == -1) return;

    $('#test_url').hide();
    $('#test_url_loading').attr('src', mtv.assetPath + 'images/icons/positive.png').show();
    website_ok = true;
}

function calc_adpacks()
{
    var ads = 0;
    var forcedViewCost = 0;

    if('small' == $('input[name=adpack_type]:checked').val())
    {
        var count = Number($("#adpacks_number").val());

        $('#visits').text(count * visitsSmall);

        ads = roundToTwo(count * costSmall);

        if ($('#forced_view').prop('checked')) {
            forcedViewCost = Number(visitsSmall * count * costForced);
        }
    }
    else
    {
        var count = 1;

        $('#visits').text(count * visitsBig);

        ads = roundToTwo(count * costBig);

        if ($('#forced_view').prop('checked')) {
            forcedViewCost = parseInt(visitsBig * count * costForced);
        }
    }

    calc_fees(ads + forcedViewCost);
}

function calc_fees(ads)
{
    var sel = $("#payment_method option:selected");

    if(sel.val() == '--') return;

    $('#payment_info').show();
    $('#method').text(sel.attr("title"));
    $('#payment').text(sel.attr("method"));

    $("#generic").attr("checked", false);

    if(sel.attr("max") > 0)
    {
        $('#limit_min').text(sel.attr("min"));
        $('#limit_max').text(sel.attr("max"));
        $('#limit_period').text(sel.attr("period"));
        $('#limit').text(sel.attr("limit"));
        $('#limits').show();
    }
    else
    {
        $('#limits').hide();
    }

    var fee = 0;

    if(sel.attr("fee") != 0)
    {
        var fixed = 0, percent = 0;
        if(sel.attr("percent").length > 0) percent = Number(sel.attr("percent"));
        if(sel.attr("fixed").length > 0) fixed = Number(sel.attr("fixed"));

        fee = roundUp(ads * percent / 100 + fixed);
    }

    $('#fee').text(roundToTwo(fee).toFixed(2));
    $('#total_cost').text(roundToTwo(ads + fee).toFixed(2));
}

function roundUp(num) {
    return Math.ceil(num * 100)/100;
}

function roundToTwo(num) {
    return Math.round(num * 100)/100;
}

function redirect(url, hash) {
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
}
