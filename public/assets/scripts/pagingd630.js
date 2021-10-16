(function ($) {
    $.fn.paging = function () {
        this.init = function () {
            this.initNumbersPagination();
            this.initInputPagination();
            this.initBasicElements();
            this.pushInteractiveLinks();
        };

        this.initNumbersPagination = function () {
            var paging = this;
            this.delegate('.ads_pagination a:not(.button_pagination_jump)', 'click', function (e) {
                e.preventDefault();
                paging.loadItems($(this).attr('href'));
            });
        };

        this.initInputPagination = function () {
            this.bindPseudosubmitClick();
            this.bindSubmitTrigger();
            this.bindRemoveErrorOnChange();
        };

        this.initBasicElements = function () {
            this.container = this;
            this.table = this.container.find('table');
            this.obj = null;

            if (this.table.length) this.obj = this.table;
            else if (this.container.length) this.obj = this.container;
        };

        this.bindPseudosubmitClick = function () {
            var paging = this;
            this.delegate('.ads_pagination a.button_pagination_jump', 'click', function (e) {
                e.preventDefault();
                var paginationInput = $(this).siblings('.pagination_jump');

                var val = $(this).siblings('.pagination_jump').val();
                var maxVal = $(this).siblings('.pagination:last').text();

                if (paging.validateValue(val, maxVal) == true) {
                    var links = $(this).parent().siblings('div').find('a')[0];
                    var url = $(links).attr('href');
                    paging.loadItems(paging.getUrl(url, val));
                } else {
                    paginationInput.addClass('error');
                }

            });
        };

        this.pushInteractiveLinks = function () {
            var table = this.find('table');
            if (table.hasClass('interactive')) {
                var interactionId = Math.random();
                table.attr('interaction-id', interactionId);
                table.find('a.popup').each(function () {
                    var href = $(this).attr('href');
                    $(this).attr('href', $(this).attr('href') + (href.indexOf('?') < 0 ? '?' : '&') + 'interaction-id=' + interactionId);
                });
            }
        };

        this.validateValue = function (val, maxVal) {
            var valid = true;
            var regexp = new RegExp('^[0-9]+$');
            var match = regexp.exec(val);

            if (match == null || match[0] != val) {
                valid = false;
            }

            if (val <= 0 || val > parseInt(maxVal)) {
                valid = false;
            }

            return valid;
        };

        this.bindRemoveErrorOnChange = function () {
            this.delegate('.ads_pagination .pagination_jump', 'input', function (e) {
                if (e.keyCode !== 13) {
                    $(this).removeClass('error');
                }
            });
        };

        this.bindSubmitTrigger = function () {
            this.delegate('.ads_pagination .pagination_jump', 'keypress', function (e) {
                if (e.keyCode == 13) {
                    $(this).siblings('a.button_pagination_jump').trigger('click');
                }
            });
        };

        this.loadItems = function (url) {
            var paging = this;
            paging.obj.block({
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

            var cacheBuster = new Date().getTime();
            var completeUrl = url + (url.indexOf('?') < 0 ? '?' : '&') + 'cbstr=' + cacheBuster;

            $.get(completeUrl, function (data) {
                paging.container.html(data);
                paging.pushInteractiveLinks();
                paging.initBasicElements(paging.container);
                paging.obj.unblock();
            });
        };

        this.getUrl = function (url, val) {
            var parts = url.split("/");
            parts[parts.length - 2] = val;

            return parts.join("/");
        };

        this.init();

        return this;
    };
}(jQuery));


$(document).ready(function () {
    $('div.pageable').each(function () {
        $(this).paging();
    });
});