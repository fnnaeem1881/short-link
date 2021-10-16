var website_ok = false, small_opt_out = false, cost=0, interval;

$(document).ready(function ()
{
    renew();
    calc_costs();
    add_uploaders();

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

    $(document).delegate('#reuse', 'change', function (e){
        var sel = $("#reuse option:selected").val();
        if(sel != -1)
        {
            redirect(mtv.baseUrl + 'member/buy_' + sel + '.html');
        }
    });

    $(document).delegate('#test_url','click', function (e) {
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
                calc_costs();
            if($("#payment_method option:selected").val() != '--') calc_fees();
    });

    $('#opt_out').click(function() {
        small_opt_out = !small_opt_out;
        if(small_opt_out)
        {
            $('#banner_grid_preview').attr('src', mtv.assetPath + 'images/test.png');
            $('#opt_out').text('Add banner');
            $('#banner_grid_upload').hide();
            $('#displays').hide();
            $('#opt_out_info').html('You can add 409*409 banner image<br>and get your free banner impressions.');
            $('#banner_grid_url').val('--');
            $('#banner').hide();

            $('#add_125').hide();

            calc_costs();
        }
        else
        {
            $('#banner_grid_preview').attr('src', mtv.assetPath + 'images/test.png');
            $('#opt_out').text('Opt out');
            $('#banner_grid_upload').show();
            $('#displays').show();
            $('#opt_out_info').html('If you do not have a 409*409 banner image.<br>You can opt out of your free banner impressions.');
            $('#banner_grid_url').val('--');
            $('#banner').show();

            $('#add_125').show();
        }
    });

    $("#payment_method").change(function() {
        calc_fees();
    });

    $('#generic').click(function () {
        if($("#generic").is(':checked'))
        {
            $("#generic").val(1);
            $("#limits").hide();
            $('#method').text('PV Earnings Balance');
            $('#payment').text('Account Balance');

            var fee = 0;
            var total = 0;

            $('#fee').text(roundToTwo(fee).toFixed(2));
            $('#total_cost').text(roundToTwo(total).toFixed(2));
        }
        else
        {
            $("#generic").val(0);
            $("#limits").show();
            calc_fees();
        }
    });

    $("input[name='variant']").change(function() {
        calc_costs();
    });

    $('#submit_form').click(function(e) {
        e.preventDefault();

        var errors = '';

        if(!website_ok) errors += '- Please test website URL<br/>';
        if(!small_opt_out && $('#banner_grid_url').val() == '--') errors += '- Please upload your 409*409 Banner Image<br/>';
        //if(!big_opt_out && $('#banner_grid_big_url').val() == '--') errors += '- Please upload your 728*90 Banner Image or opt out<br/>';
        if($('#generic').val() == 1 && ($('#banner_grid_url').val() == '--' )) errors += '- Generic campaign: please upload banners<br/>';

        if(errors.length > 0)
        {
            $('#submit_info').html('<div class="alert alert-danger"><strong>Errors:</strong> ' + errors.slice(0,-5) + '</div>');
        }
        else
        {
            $('#url_info').html('');
            $('#submit_info').html('');
            $('#text1_info').html('');
            $('#text2_info').html('');
            $('#text3_info').html('');

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
                    $('#submit_image_loading').hide();
                    $('#submit_form').show();
                    form.unblock();
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
                    }
                    form.unblock();
                }
            });
        }
    });

    $("input, select").click(function() {
        $(this).css('border', '');
    });

    $("#text1, #text2, #text3").on("change paste keyup", function()
    {
        var src = $(this).val();
        var fix = src.replace(/ +(?= )/g,'');
        $(this).val(fix);
    });
});

function renew()
{
    if(renewId == -1) return;

    $('#test_url').hide();
    $('#test_url_loading').attr('src', mtv.assetPath + 'images/icons/positive.png').show();
    website_ok = true;

    if($('#banner_grid_preview').attr('src').indexOf('125_default') > -1)
    {
        small_opt_out = true;
        $('#banner_grid_preview').attr('src', mtv.assetPath + 'images/test.png');
        $('#opt_out').text('Add banner');
        $('#banner_grid_upload').hide();
        $('#displays').hide();
        $('#opt_out_info').html('You can add 409*409 banner image<br>and get your free banner impressions.');
        $('#banner_grid_url').val('--');
        $('#banner').hide();
        $('#add_125').hide();
    }
    else
    {
        $('#banner_grid_url').val($('#banner_grid_preview').attr('src').split('/').pop());
    }
}

function calc_costs()
{
    if ($("input[name='variant']:checked").length == 0) return;

    cost = Number($("input[name='variant']:checked").val());

    var currentTimestamp = Math.round($.now() / 1000);
    if (Object.keys(discountGeneral).length > 0 && discountGeneral.percent > 0 && currentTimestamp >= discountGeneral.start && currentTimestamp <= discountGeneral.end) {
        cost = Number(cost * ((100 - discountGeneral.percent) / 100.0));
    }

    var total = cost + Number($('#processor_fee').text());
    $('#total_cost').text(roundToTwo(total).toFixed(2));
    calc_fees();
}

function calc_fees()
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

    $("#variant option:selected").each(function() {
        cost = Number($(this).val());
    });

    if(sel.attr("fee") == 0)
    {
        $('#fee').text(roundToTwo(fee).toFixed(2));
    }
    else
    {
        var fixed = 0, percent = 0;
        if(sel.attr("percent").length > 0) percent = Number(sel.attr("percent"));
        if(sel.attr("fixed").length > 0) fixed = Number(sel.attr("fixed"));

        fee = cost * percent / 100 + fixed;
        $('#fee').text(fee.toFixed(3));
    }

    var total = cost + fee;
    $('#total_cost').text(roundToTwo(total).toFixed(2));
}

function add_uploaders()
{
    new AjaxUpload('banner_grid_upload', {
        action: mtv.baseUrl + 'member/upload/grid.html',
        name: 'banner_grid',
        responseType: 'json',
        onSubmit: function(file, extension)
        {
            $('#banner_grid_upload').hide();
            $('#banner_grid_upload_loading').show();
            $('#banner_grid_upload_info').text('');
        },
        onComplete: function(file, response)
        {
            if (response.error)
            {
                $('#banner_grid_upload_info').text(response.error);
                $('#banner_grid_url').val('--');
            }
            else
            {
                $('#banner_grid_preview').attr('src', response.banner);
                $('#banner_grid_url').val(response.file);
            }

            $('#banner_grid_upload_loading').hide();
            $('#banner_grid_upload').show();
        }
    });

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