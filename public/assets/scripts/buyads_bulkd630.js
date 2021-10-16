var website_ok = false, big_opt_out = false, small_opt_out = false, interval;
var adpack_cost = 0, timer_cost = 0;
var timerCosts = {};

$(document).ready(function ()
{
    adpack_cost = settings['adpack'];
    timerCosts = {5:parseFloat(settings['visit']['5']), 15:parseFloat(settings['visit']['15']), 30:parseFloat(settings['visit']['30'])};

    renew();
    calc_adpacks();
    add_uploaders();

    $(document).delegate('#splash', 'change', function (e){
        var sel = $("#splash option:selected").val();
        $("#splash option[value=0]").prop('disabled',true);
        $('#url').val(sel);

        $('#test_url').hide();
        $('#test_url_loading').attr('src', mtv.assetPath + 'images/icons/positive.png').show();
        website_ok = true;
        setCookie('website_ok', 0, 1);
        $("#verifyWarning").hide();
    });

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
            if($("#payment_method option:selected").val() != '--') calc_fees();
    });

    $('#opt_out_small').click(function() {
        small_opt_out = !small_opt_out;
        if(small_opt_out)
        {
            $('#banner_small_preview').attr('src', mtv.assetPath + 'images/125_optout.jpg');
            $('#opt_out_small').text('Add banner');
            $('#banner_small_upload').hide();
            $('#displays_small').hide();
            $('#opt_out_small_info').html('You can add 125*125 banner image<br>and get your free banner impressions.');
            $('#banner_small_url').val('--');
            $('#banner_small').hide();

            $(".add_125 > input[type='checkbox']:checked").each(function(){ $(this).attr('checked', false) });
            $('.add_125').hide();

            calc_adpacks();
        }
        else
        {
            $('#banner_small_preview').attr('src', mtv.assetPath + 'images/125_default.jpg');
            $('#opt_out_small').text('Opt out');
            $('#banner_small_upload').show();
            $('#displays_small').show();
            $('#opt_out_small_info').html('If you do not have a 125*125 banner image.<br>You can opt out of your free banner impressions.');
            $('#banner_small_url').val('--');
            $('#banner_small').show();

            $('.add_125').show();
        }
    });

    $('#opt_out_big').click(function() {
        big_opt_out = !big_opt_out;
        if(big_opt_out)
        {
            $('#banner_big_preview').attr('src', mtv.assetPath + 'images/728_optout.jpg');
            $('#opt_out_big').text('Add banner');
            $('#banner_big_upload').hide();
            $('#displays_big').hide();
            $('#opt_out_big_info').html('You can add 728*90 or 468*60 banner image<br>and get your free banner impressions.');
            $('#banner_big_url').val('--');
            $('#banner_big').hide();

            $(".add_728 > input[type='checkbox']:checked").each(function(){ $(this).attr('checked', false) });
            $('.add_728').hide();

            calc_adpacks();
        }
        else
        {
            $('#banner_big_preview').attr('src', mtv.assetPath + 'images/728_default.jpg');
            $('#opt_out_big').text('Opt out');
            $('#banner_big_upload').show();
            $('#displays_big').show();
            $('#opt_out_big_info').html('If you do not have a 728*90 or 468*60 banner image.<br>You can opt out of your free banner impressions.');
            $('#banner_big_url').val('--');
            $('#banner_big').show();

            $('.add_728').show();
        }
    });

    $("#payment_method").change(function() {
        calc_adpacks();
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
            calc_adpacks();
        }
    });

    $('#forced_view').on('change', (function () {
        calc_adpacks();
    }));

    $(".add_125 > input[type=checkbox]").on("click", calc_adpacks);
    $(".add_728 > input[type=checkbox]").on("click", calc_adpacks);

    $('#submit_form').click(function(e) {
        e.preventDefault();

        var errors = '';

        if(!website_ok) errors += '- Please test website URL<br/>';
        if(!small_opt_out && $('#banner_small_url').val() == '--') errors += '- Please upload your 125*125 Banner Image or opt out<br/>';
        if(!big_opt_out && $('#banner_big_url').val() == '--') errors += '- Please upload your 728*90 or 468*60 Banner Image or opt out<br/>';
        if($('#generic').val() == 1 && ($('#banner_small_url').val() == '--' || $('#banner_big_url').val() == '--')) errors += '- Generic campaign: please upload banners<br/>';

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
                    $('#submit_info').html('<div class="alert alert-danger">Server connection error. Please try again.</div>');
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

    $("#timer").on('change',function(){
        var timer = $(this).val();
        timer_cost = timerCosts[timer];
        $('.how-many').hide();
        $('#how-many-' + timer.toString() + 's').show();
        $('span#timer').html(timer.toString());
        calc_adpacks();
    });

    $("a.cc_instructions").on('click', function() {
        if ($("#modal").is(":visible")) {
            $("#modal").slideUp();
        } else {
            $("#modal").slideDown();
        }
       return false;
    });

    $("body").on('click', function() {
       if ($("#modal").is(":visible")) {
           $("#modal").hide();
       }
    });

});

function renew()
{
    if(renewId == -1) return;

    $('#test_url').hide();
    $('#test_url_loading').attr('src', mtv.assetPath + 'images/icons/positive.png').show();
    website_ok = true;

    if($('#banner_small_preview').attr('src').indexOf('125_default') > -1)
{
    small_opt_out = true;
    $('#banner_small_preview').attr('src', mtv.assetPath + 'images/125_optout.jpg');
    $('#opt_out_small').text('Add banner');
    $('#banner_small_upload').hide();
    $('#displays_small').hide();
    $('#opt_out_small_info').html('You can add 125*125 banner image<br>and get your free banner impressions.');
    $('#banner_small_url').val('--');
    $('#banner_small').hide();
    $('.add_125').hide();
}
else
{
    $('#banner_small_url').val($('#banner_small_preview').attr('src').split('/').pop());
}

    if($('#banner_big_preview').attr('src').indexOf('728_default') > -1)
    {
        big_opt_out = true;
        $('#banner_big_preview').attr('src', mtv.assetPath + 'images/728_optout.jpg');
        $('#opt_out_big').text('Add banner');
        $('#banner_big_upload').hide();
        $('#displays_big').hide();
        $('#opt_out_big_info').html('You can add 728*90 or 468*60 banner image<br>and get your free banner impressions.');
        $('#banner_big_url').val('--');
        $('#banner_big').hide();
        $('.add_728').hide();
    }
    else
    {
        $('#banner_big_url').val($('#banner_big_preview').attr('src').split('/').pop());
    }
}

function calc_adpacks()
{
    var count = Number($("#adpacks_number").val());
    var imp_cost = 0;
    var imp125 = 0;
    var imp728 = 0;

    $(".add_125 > input[type='checkbox']:checked").each(function() {
        switch (Number($(this).val()))
        {
            case 1:
                imp125 += 20000;
                imp_cost += parseFloat(settings['banner']['125']['20000']);
                break;
            case 2:
                imp125 += 100000;
                imp_cost += parseFloat(settings['banner']['125']['100000']);
                break;
            case 3:
                imp125 += 1000000;
                imp_cost += parseFloat(settings['banner']['125']['1000000']);
                break;
            case 4:
                imp125 += 10000000;
                imp_cost += parseFloat(settings['banner']['125']['10000000']);
                break;
            case 5:
                imp125 += 50000000;
                imp_cost += parseFloat(settings['banner']['125']['50000000']);
                break;
        }
    });

    $(".add_728 > input[type='checkbox']:checked").each(function() {
        switch (Number($(this).val()))
        {
            case 1:
                imp728 += 10000;
                imp_cost += parseFloat(settings['banner']['728']['10000']);
                break;
            case 2:
                imp728 += 50000;
                imp_cost += parseFloat(settings['banner']['728']['50000']);
                break;
            case 3:
                imp728 += 500000;
                imp_cost += parseFloat(settings['banner']['728']['500000']);
                break;
            case 4:
                imp728 += 5000000;
                imp_cost += parseFloat(settings['banner']['728']['5000000']);
                break;
            case 5:
                imp728 += 15000000;
                imp_cost += parseFloat(settings['banner']['728']['15000000']);
                break;
            case 6:
                imp728 += 1000;
                imp_cost += parseFloat(settings['banner']['728']['1000']);
                break;
        }
    });

    var currentTimestamp = Math.round($.now() / 1000);
    if (Object.keys(discountImpressions).length > 0 && discountImpressions.percent > 0 && currentTimestamp >= discountImpressions.start && currentTimestamp <= discountImpressions.end) {
        imp_cost = Number(imp_cost * ((100 - discountImpressions.percent) / 100.0));
    }

    $('#displays_728').text(count * displays_728 + imp728);
    $('#displays_125').text(count * displays_125 + imp125);
    $('#visits').text(count * visits);
    $('#baps').text(count * baps);

    calc_bonus();

    var forcedViewCost = 0;

    if ($('#forced_view').prop('checked')) {
        forcedViewCost = visits * count * parseFloat(settings['forced']);
    }

    var total = count * adpack_cost + Number($('#processor_fee').text()) + imp_cost + count * timer_cost + forcedViewCost;
    $('#total_cost').text(roundToTwo(total).toFixed(2));

    calc_fees();
}

function calc_bonus() {
    var currentTimestamp = Math.round($.now() / 1000);
    var count = Number($("#adpacks_number").val());
    var payment = $("#payment_method option:selected");

    var isBapBonusForBAactive = false;
    var isBapBonusForCryptoActive = false;

    if (Object.keys(bapsBonusForBA).length > 0 && bapsBonusForBA.percent > 0 && currentTimestamp >= bapsBonusForBA.start && currentTimestamp <= bapsBonusForBA.end) {
        isBapBonusForBAactive = true;
    }

    if (Object.keys(bapsBonusForCrypto).length > 0 && bapsBonusForCrypto.percent > 0 && currentTimestamp >= bapsBonusForCrypto.start && currentTimestamp <= bapsBonusForCrypto.end) {
        if (payment.val() === 'direct_bc' || payment.val() === 'direct_lc') {
            isBapBonusForCryptoActive = true;
        }
    }

    if (isBapBonusForBAactive && isBapBonusForCryptoActive) {
        if (bapsBonusForBA.percent > bapsBonusForCrypto.percent) {
            $('#baps_special').text(roundUp(count * (bapsBonusForBA.percent / 100.0) * baps).toFixed(0));
            $('.li_baps_special').show();
            $('.li_baps_crypto').hide();
        } else {
            $('#baps_crypto').text(roundUp(count * (bapsBonusForCrypto.percent / 100.0) * baps).toFixed(0));
            $('.li_baps_crypto').show();
            $('.li_baps_special').hide();
        }
    } else if (isBapBonusForBAactive) {
        $('#baps_special').text(roundUp(count * (bapsBonusForBA.percent / 100.0) * baps).toFixed(0));
        $('.li_baps_special').show();
        $('.li_baps_crypto').hide();
    } else if (isBapBonusForCryptoActive) {
        $('#baps_crypto').text(roundUp(count * (bapsBonusForCrypto.percent / 100.0) * baps).toFixed(0));
        $('.li_baps_crypto').show();
        $('.li_baps_special').hide();
    } else {
        $('.li_baps_special').hide();
        $('.li_baps_crypto').hide();
    }
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

    var ads = Number($('#adpacks_number').val());
    var imp_cost = 0;
    var fee = 0;

    $(".add_125 > input[type='checkbox']:checked").each(function() {
        switch (Number($(this).val()))
        {
            case 1:
                imp_cost += parseFloat(settings['banner']['125']['20000']);
                break;
            case 2:
                imp_cost += parseFloat(settings['banner']['125']['100000']);
                break;
            case 3:
                imp_cost += parseFloat(settings['banner']['125']['1000000']);
                break;
            case 4:
                imp_cost += parseFloat(settings['banner']['125']['10000000']);
                break;
            case 5:
                imp_cost += parseFloat(settings['banner']['125']['50000000']);
                break;
        }
    });

    $(".add_728 > input[type='checkbox']:checked").each(function() {
        switch (Number($(this).val()))
        {
            case 1:
                imp_cost += parseFloat(settings['banner']['728']['10000']);
                break;
            case 2:
                imp_cost += parseFloat(settings['banner']['728']['50000']);
                break;
            case 3:
                imp_cost += parseFloat(settings['banner']['728']['500000']);
                break;
            case 4:
                imp_cost += parseFloat(settings['banner']['728']['5000000']);
                break;
            case 5:
                imp_cost += parseFloat(settings['banner']['728']['15000000']);
                break;
            case 6:
                imp_cost += parseFloat(settings['banner']['728']['1000']);
                break;
        }
    });

    var currentTimestamp = Math.round($.now() / 1000);
    if (Object.keys(discountImpressions).length > 0 && discountImpressions.percent > 0 && currentTimestamp >= discountImpressions.start && currentTimestamp <= discountImpressions.end) {
        imp_cost = Number(imp_cost * ((100 - discountImpressions.percent) / 100.0));
    }

    var forcedViewCost = 0;

    if ($('#forced_view').prop('checked')) {
        var count = Number($("#adpacks_number").val());
        forcedViewCost = visits * count * parseFloat(settings['forced']);
    }

    if(sel.attr("fee") == 0)
    {
        $('#fee').text(roundToTwo(fee).toFixed(2));
    }
    else
    {
        var fixed = 0, percent = 0;
        if(sel.attr("percent").length > 0) percent = Number(sel.attr("percent"));
        if(sel.attr("fixed").length > 0) fixed = Number(sel.attr("fixed"));

        fee = (ads * adpack_cost + imp_cost + (ads * timer_cost)) * percent / 100 + fixed;
        $('#fee').text(roundToTwo(fee).toFixed(2));
    }

    var total = ads * adpack_cost + imp_cost + fee + ads * timer_cost + forcedViewCost;
    $('#total_cost').text(roundToTwo(total).toFixed(2));

    if (sel.val() == 'direct_cc') {
        $("a.cc_instructions").css('display', 'block');
    } else {
        $("a.cc_instructions").hide();
    }
}

function add_uploaders()
{
    new AjaxUpload('banner_small_upload', {
        action: mtv.baseUrl + 'member/upload/small.html',
        name: 'banner_small',
        responseType: 'json',
        onSubmit: function(file, extension)
        {
            $('#banner_small_upload').hide();
            $('#banner_small_upload_loading').show();
            $('#banner_small_upload_info').text('');
        },
        onComplete: function(file, response)
        {
            if (response.error)
            {
                $('#banner_small_upload_info').text(response.error);
                $('#banner_small_url').val('--');
            }
            else
            {
                $('#banner_small_preview').attr('src', response.banner);
                $('#banner_small_url').val(response.file);
            }

            $('#banner_small_upload_loading').hide();
            $('#banner_small_upload').show();
        }
    });

    new AjaxUpload('banner_big_upload', {
        action: mtv.baseUrl + 'member/upload/big.html',
        name: 'banner_big',
        responseType: 'json',
        onSubmit: function(file, extension)
        {
            $('#banner_big_upload').hide();
            $('#banner_big_upload_loading').show();
            $('#banner_big_upload_info').text('');
        },
        onComplete: function(file, response)
        {
            if (response.error)
            {
                $('#banner_big_upload_info').text(response.error);
                $('#banner_big_url').val('--');
            }
            else // success, banner uploaded
            {
                $('#banner_big_preview').attr('src', response.banner);
                $('#banner_big_url').val(response.file);

                // fit banner into place to meet its resolution
                detectBigBannerSize(response.banner);
            }

            $('#banner_big_upload_loading').hide();
            $('#banner_big_upload').show();
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