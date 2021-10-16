var website_ok = false, interval;
var single_bid = true, multi_bid = false;
var bidWithType = 0;

$(document).ready(function() {
    renew();
    calc_costs();
    add_uploaders();
    set_calendars();

    $('#buttonMoney').attr('disabled', 'disabled');
    $('#buttonBAP').removeAttr('disabled', '');

    $(document).delegate('#reuse', 'change', function(e) {
        var sel = $("#reuse option:selected").val();
        if(sel != -1) {
            redirect(mtv.baseUrl + 'member/buy_' + sel + '.html');
        }
    });

    $('.img_tooltip').tooltip({
        position: {
            my: "center bottom-20",
            at: "center top"
        },
        tooltipClass: "custom-tooltip-styling"
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

    $('.prepared_ajax_action').click(function(e) {
        e.preventDefault();
        var self = this;
        var url = $(self).prop('href');
        $(self).hide();
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            success: function(data) {
                if(data.redirect) {
                    redirect(data.redirect.url);
                }
            },
            error: function(request, status, error) {
                $(self).show();

            },
            complete: function() {
                $(self).show();
                $(self).parents('tr').remove();
            }
        });
    });

    $("#payment_method").change(function() {
        calc_fees();
    });

    $('#generic').click(function() {
        if($("#generic").is(':checked')) {
            $("#generic").val(1);
            $("#limits").hide();
            $('#method').text('PV Earnings Balance');
            $('#payment').text('Account Balance');

            var fee = 0;
            var total = 0;

            $('#fee').text(roundToTwo(fee).toFixed(2));
            $('#total_cost').text(roundToTwo(total).toFixed(2));
        }
        else {
            $("#generic").val(0);
            $("#limits").show();
            calc_fees();
        }
    });

    $('#auction').on('change', 'input:checkbox', function() {
        var selector = '#' + $(this).attr('name') + '_custom';
        if(this.checked) {
            $(selector).prop('disabled', false).val($(selector).attr('placeholder'));
            calc_costs();
        }
        else {
            $(selector).prop('disabled', true).val(0);
            calc_costs();
        }
    });

    $('#auction').on('change', 'input[type=number]:enabled', function() {
        calc_costs();
    });

    $('#bidOptions').on('change', function(e) {
        var chosen = this.value;
        var secondCalendar = $('#purchaseCalendarSecond');
        var adType = $('#adType');

        if (chosen === 'multiDay') {
            secondCalendar.css('display', 'inline-block').show();
            adType.show();
            multi_bid = true;
            single_bid = false;
            $('div#purchaseCalendarSecond .ui-datepicker-current-day').trigger('click');

        }
        else {
            secondCalendar.hide();
            adType.hide();
            multi_bid = false;
            single_bid = true;
            $('div#purchaseCalendarFirst .ui-datepicker-current-day').trigger('click');
        }
    });

    $('#adType').on('change', function(e) {
        handleMultiBid();
    });

    $('#submit_form').click(function(e) {
        e.preventDefault();

        var errors = '';

        if(!website_ok) {
            errors += '- Please test website URL<br/>';
        }
        if($('#banner_forum_url').val() == '--') {
            errors += '- Please upload your up to 160*600 Banner Image<br/>';
        }

        if($('#banner_forum_url_horizontal').val() == '--') {
            errors += '- Please upload your 468*60 Banner Image as a fallback horizontal banner<br/>';
        }

        if($('#generic').val() == 1 && ($('#banner_forum_url').val() == '--' ) && ($('#banner_forum_url_horizontal').val() == '--' )) {
            errors += '- Generic campaign: please upload banners<br/>';
        }

        if(errors.length > 0) {
            $('#submit_info').html('<u>Errors:</u><br/>' + errors.slice(0, -5));
        }
        else {
            $('#url_info').html('');
            $('#submit_info').html('');

            $("input, select").css('border', '');

            var formSuccess = false;
            var form = $('#newCampaignFrm');
            var formData = form.serializeArray();

            $('#submit_form').hide();
            $('#submit_image_loading').show();

            $.ajax({
                url: form.attr('action'),
                type: form.attr('method'),
                data: formData,
                dataType: 'json',
                success: function(data) {
                    if(data.errors) {
                        formSuccess = false;
                        var info = 'Errors are marked in red, please correct the input data.';
                        for(var el in data.errors) {
                            $('#' + el, form).css('border', '2px solid red');
                            $('a[href$="#'+$('#' + el, form).parents('fieldset').prev('h6').attr('id')+'"]').parent().addClass('error');
                            $('a[href$="#'+$('#' + el, form).parents('fieldset').prev('h6').attr('id')+'"]').parent().removeClass('done');
                            if(data.errors[el] != "") {
                                $('#' + el, form).after('<label class="error">'+data.errors[el]+'</label>');
                            }
                        }
                        $('#submit_info').html(info);
                    }
                    else if(data.error) {
                        formSuccess = false;
                        $('#submit_info').html('Error: ' + JSON.stringify(data.error));
                    }
                    else {
                        formSuccess = true;
                        if(data.html !== undefined) {
                            $('#submit_info_redirect').html(data.html);
                        }
                        else if(data.redirect !== undefined) {
                            if(data.redirect === 'reload') {
                                window.location.reload(true);
                            }
                            else {
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
                },
                complete: function() {
                    if(formSuccess) {
                        $('#submit_form_loading').html('Success!');
                    }
                    else {
                        $('#submit_image_loading').hide();
                        $('#submit_form').show();
                    }
                }
            });
        }
    });

    $('#submit_form_bid').click(function(e) {
        e.preventDefault();

        var errors = '';

        if(errors.length > 0) {
            $('#submit_info').html('<u>Errors:</u><br/>' + errors.slice(0, -5));
        }
        else {
            $('#url_info').html('');
            $('#submit_info').html('');

            $("input, select").css('border', '');
            $(".validation-error-label").remove();

            var formSuccess = false;
            var form = $('#newCampaignFrm');
            var formData = form.serializeArray();

            $('#submit_form_bid').hide();
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
                data: {
                    bids: getCheckedAds(),
                    payment_method: $('#payment_method option:selected').val(),
                    confirm_tos: $('#confirm_tos').prop('checked')
                },
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
                    else {
                        formSuccess = true;
                        if(data.html !== undefined) {
                            $('#submit_info').html(data.html);
                        }
                        else if(data.redirect !== undefined) {
                            if(data.redirect === 'reload') {
                                window.location.reload(true);
                            }
                            else {
                                redirect(data.redirect.url, data.redirect.hash);
                            }
                        }
                    }
                },
                error: function(data) {
                    alert(JSON.stringify(data));
                    $('#submit_info').html('Server connection error. Please try again.');
                    $('#submit_image_loading').hide();
                    $('#submit_form_bid').show();
                    form.unblock();
                },
                complete: function() {
                    if(formSuccess) {
                        $('#submit_form_loading').html('Success!');
                    }
                    else {
                        $('#submit_image_loading').hide();
                        $('#submit_form_bid').show();
                    }
                    form.unblock();
                }
            });
        }
    });

    $("input, select").click(function() {
        $(this).css('border', '');
    });

});

function recalcValues() {
    $('div#purchaseCalendarFirst .ui-datepicker-current-day').trigger('click');
    calc_costs();
    calc_fees();
    convertBidValues();
}

function renew() {
    if(renewId == -1) {
        return;
    }

    $('#test_url').hide();
    $('#test_url_loading').attr('src', mtv.assetPath + 'images/icons/positive.png').show();
    website_ok = true;

    if($('#banner_forum_preview').attr('src').indexOf('160_default') > -1) {
        $('#banner_forum_preview').attr('src', mtv.assetPath + 'images/160_optout.jpg');
        $('#banner_forum_upload').hide();
        $('#displays').hide();
        $('#banner_forum_url').val('--');
        $('#banner').hide();
        $('#add_125').hide();
    }
    else {
        $('#banner_forum_url').val($('#banner_forum_preview').attr('src').split('/').pop());
    }
}

function calc_costs() {
    var total = Number($('#processor_fee').text());

    $('#auction input[type=number]:enabled').each(function() {
        total += Number(this.value);
    });

    cost = total;
    if(bidWithType < 1) {
        $('#total_cost').text(formatValues(roundToTwo(total).toFixed(2), ' $', true, true));
    }
    else {
        $('#total_cost').text(formatValues(total, ' BAP', false, false));
    }

    calc_fees();
}

function calc_fees() {
    var sel = $('form').find("#payment_method option:selected");

    if(sel == undefined || sel.length == 0 || sel.val() == '--') {
        $('#payment_info').hide();
        return;
    }

    $('#payment_info').show();
    $('#method').text(sel.attr("title"));
    $('#payment').text(sel.attr("method"));

    $("#generic").attr("checked", false);

    if(sel.attr("max") > 0) {
        $('#limit_min').text(sel.attr("min"));
        $('#limit_max').text(sel.attr("max"));
        $('#limit_period').text(sel.attr("period"));
        $('#limit').text(sel.attr("limit"));
        $('#limits').show();
    }
    else {
        $('#limits').hide();
    }

    var fee = 0;

    $("#variant option:selected").each(function() {
        cost = Number($(this).val());
    });

    if(sel.attr("fee") == 0) {
        if(bidWithType < 1) {
            $('#fee').text(formatValues(fee, ' $', true, true));
        }
        else {
            $('#fee').text(formatValues(fee, ' BAP', false, false));
        }
    }
    else {
        var fixed = 0, percent = 0;
        if(sel.attr("percent").length > 0) {
            percent = Number(sel.attr("percent"));
        }
        if(sel.attr("fixed").length > 0) {
            fixed = Number(sel.attr("fixed"));
        }

        fee = cost * percent / 100 + fixed;
        if(bidWithType < 1) {
            $('#fee').text(formatValues(fee, ' $', true, true));
        }
        else {
            $('#fee').text(formatValues(fee, ' BAP', false, false));
        }
    }

    var total = cost + fee;

    if(bidWithType < 1) {
        $('#total_cost').text(formatValues(roundToTwo(total).toFixed(2), ' $', true, true));
    }
    else {
        $('#total_cost').text(formatValues(total, ' BAP', false, false));
    }
}

function add_uploaders() {
    if($('#banner_forum_upload').length > 0) {
        new AjaxUpload('banner_forum_upload', {
            action: mtv.baseUrl + 'member/upload/forum.html',
            name: 'banner_forum',
            responseType: 'json',
            onSubmit: function(file, extension) {
                $('#banner_forum_upload').hide();
                $('#banner_forum_upload_loading').show();
                $('#banner_forum_upload_info').text('');
            },
            onComplete: function(file, response) {
                if(response.error) {
                    $('#banner_forum_upload_info').text(response.error);
                    $('#banner_forum_url').val('--');
                }
                else {
                    $('#banner_forum_preview').attr('src', response.banner);
                    $('#banner_forum_url').val(response.file);
                }

                $('#banner_forum_upload_loading').hide();
                $('#banner_forum_upload').show();
            }
        });
    }

    if($('#banner_forum_upload_horizontal').length > 0) {
        new AjaxUpload('banner_forum_upload_horizontal', {
            action: mtv.baseUrl + 'member/upload/forumh.html',
            name: 'banner_forumh',
            responseType: 'json',
            onSubmit: function(file, extension) {
                $('#banner_forum_upload_horizontal').hide();
                $('#banner_forum_upload_loading_horizontal').show();
                $('#banner_forum_upload_info_horizontal').text('');
            },
            onComplete: function(file, response) {
                if(response.error) {
                    $('#banner_forum_upload_info_horizontal').text(response.error);
                    $('#banner_forum_url_horizontal').val('--');
                }
                else {
                    $('#banner_forum_preview_horizontal').attr('src', response.banner);
                    $('#banner_forum_url_horizontal').val(response.file);
                }

                $('#banner_forum_upload_loading_horizontal').hide();
                $('#banner_forum_upload_horizontal').show();
            }
        });
    }
}

function set_calendars() {
    var dNow = new Date();
    var localOffset = dNow.getTimezoneOffset() * 60000;

    var maxDate = new Date(dNow.getTime() + localOffset);
    maxDate.setDate(maxDate.getDate() + 365);

    var minDate = new Date(dNow.getTime() + localOffset);
    minDate.setDate(minDate.getDate() + 1);

    var firstCalendar = $('#purchaseCalendarFirst');
    var secondCalendar = $('#purchaseCalendarSecond');

    if(firstCalendar.length > 0) {
        firstCalendar.datepicker({
            dateFormat: '@',
            defaultDate: dNow,
            minDate: minDate,
            maxDate: maxDate,
            firstDay: 1,
            inline: true,
            showOtherMonths: true,
            duration: 'fast',
            onSelect: function(d, e) {
                var timestamp = (d - localOffset) / 1000;

                if(true === single_bid) {
                    handleSingleBid(timestamp);
                }
                else {
                    handleMultiBid();
                }

            }
        });
    }

    var secondMinDate = new Date(dNow.getTime() + localOffset);
    secondMinDate.setDate(secondMinDate.getDate() + 1);

    if(secondCalendar.length > 0) {
        secondCalendar.datepicker({
            dateFormat: '@',
            defaultDate: dNow,
            minDate: secondMinDate,
            maxDate: maxDate,
            firstDay: 1,
            inline: true,
            showOtherMonths: true,
            duration: 'fast',
            onSelect: function(d, e) {
                handleMultiBid();
            }
        });
    }
}

function roundUp(num) {
    return Math.ceil(num * 100) / 100;
}

function roundToTwo(num) {
    return Math.round(num * 100) / 100;
}

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

function handleMultiBid() {
    var dNow = new Date();
    var localOffset = dNow.getTimezoneOffset() * 60000;

    var firstCalendar = $('#purchaseCalendarFirst');
    var secondCalendar = $('#purchaseCalendarSecond');

    var startTimestamp = (firstCalendar.datepicker('getDate') - localOffset) / 1000;
    var endTimestamp = (secondCalendar.datepicker('getDate') - localOffset) / 1000;
    var adType = $('#adType').val();

    var container = $('div#auction'), table = container.find('table'), obj = null;
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

    $.get(mtv.baseUrl + 'member/forum_banner_multi/' + startTimestamp + '/' + endTimestamp + '/' + adType, function(data) {
        container.html(data);
        obj.unblock();
        calc_costs();
        calc_fees();
    });

}

function handleSingleBid(timestamp) {
    var container = $('div#auction'), table = container.find('table'), obj = null;

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

    $.get(mtv.baseUrl + 'member/forum_banner_single/' + timestamp, function(data) {
        container.html(data);
        obj.unblock();
        calc_costs();
        calc_fees();
    });

}

function getCheckedAds() {
    var ads = [];

    $('#auction input:checked').each(function() {
        var inputNumberSelector = $(this).attr('name') + '_custom';
        var adData = inputNumberSelector.split('_');

        var cost = Number($('#' + inputNumberSelector).val());
        var date = $(this).data('date');
        var name = adData[0];
        var number = adData[1];

        if(cost <= 0) {
            return;
        }

        var obj = {type: name, number: number, price: cost, date: date};
        ads.push(obj);
    });

    return ads;
}

function convertBidValues() {
    $('.bidValue').each(function(index, element) {
        $(element).text($(element).text().replace(/,/g, "").replace('$', ""));
        if(bidWithType < 1) {
            $(element).text(parseFloat($(element).text()) / dolarBapRatio);
            $(element).text(formatValues(Number($(element).text()), ' $', true, true));
        }
        else {
            $(element).text(parseFloat($(element).text()) * dolarBapRatio);
            $(element).text(formatValues(Number($(element).text()), ' BAP', false, false));
        }
    });
}

function formatValues(value, unit, atBegining, withPoint) {
    if(typeof unit === 'undefined' || unit === null) {
        unit = '';
    }
    var s = parseFloat(value.toFixed(5)).toString();
    if(s.indexOf('.') == -1) {
        s += '.';
    }
    while(s.length <= s.indexOf('.') + 2) {
        s += '0';
    }
    var point = s.indexOf('.');
    var beforePoint = s.substr(0, point);
    var afterPoint = withPoint ? s.substr(point) : '';

    if (atBegining)
    {
        return unit + beforePoint.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + afterPoint;
    }

    return beforePoint.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + afterPoint + unit;

};
