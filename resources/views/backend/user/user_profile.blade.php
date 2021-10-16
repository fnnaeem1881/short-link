@extends('backend.user.navaigation')
@section('custom_css')
    <style>
        .input-group-addon {
            background-color: #01a9ac;
            color: #fff;
            padding: 10px!important;
        }
    </style>
@endsection

@section('usercontent')

    <!-- Page-header start -->
    <div class="page-header">
        <div class="row align-items-end">
            <div class="col-lg-8">
                <div class="page-header-title">
                    <div class="d-inline">
                        <h4>User Profile</h4>
                        <span>lorem ipsum dolor sit amet, consectetur adipisicing
                            elit</span>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="page-header-breadcrumb">
                    <ul class="breadcrumb-title">
                        <li class="breadcrumb-item"  style="float: left;">
                            <a href="{{route('userdashboard')}}"> <i class="feather icon-home"></i> </a>
                        </li>
                        <li class="breadcrumb-item"  style="float: left;"><a href="#!">User Profile</a>
                        </li>
                        <li class="breadcrumb-item"  style="float: left;"><a href="#!">User Profile</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- Page-header end -->

    <!-- Page-body start -->
    <div class="page-body">
        <!--profile cover start-->
        <div class="row">
            <div class="col-lg-12">
                <div class="cover-profile">
                    <div class="profile-bg-img">
                        <img class="profile-bg-img img-fluid"
                            src="{{asset('frontend/assets')}}/images/user-profile/bg-img1.jpg"
                            alt="bg-img">
                        <div class="card-block user-info">
                            <div class="col-md-12">
                                <div class="media-left">
                                    <a href="#" class="profile-image">
                                        <img class="user-img img-radius"
                                            src="{{asset('frontend/assets')}}/images/user-profile/user-img.jpg"
                                            alt="user-img">
                                    </a>
                                </div>
                                <div class="media-body row">
                                    <div class="col-lg-12">
                                        <div class="user-title">
                                            <h2>Josephin Villa</h2>
                                            <span class="text-white">Web designer</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="pull-right cover-btn">
                                            <button type="button"
                                                class="btn btn-primary m-r-10 m-b-5"><i
                                                    class="icofont icofont-plus"></i>
                                                Follow</button>
                                            <button type="button"
                                                class="btn btn-primary"><i
                                                    class="icofont icofont-ui-messaging"></i>
                                                Message</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--profile cover end-->
        <div class="row">
            <div class="col-lg-12">
                <!-- tab header start -->
                <div class="tab-header card">
                    <ul class="nav nav-tabs md-tabs tab-timeline" role="tablist"
                        id="mytab">
                        <li class="nav-item">
                            <a class="nav-link active" data-toggle="tab"
                                href="#personal" role="tab">Personal Info</a>
                            <div class="slide"></div>
                        </li>

                    </ul>
                </div>
                <!-- tab header end -->
                <!-- tab content start -->
                <div class="tab-content">
                    <!-- tab panel personal start -->
                    <div class="tab-pane active" id="personal" role="tabpanel">
                        <!-- personal card start -->
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-header-text">About Me</h5>
                                <button id="edit-btn" type="button"
                                    class="btn btn-sm btn-primary waves-effect waves-light f-right">
                                    <i class="icofont icofont-edit"></i>
                                </button>
                            </div>
                            <div class="card-block">
                                <div class="view-info">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="general-info">
                                                <div class="row">
                                                    <div class="col-lg-12 col-xl-6">
                                                        <div class="table-responsive">
                                                            <table class="table m-0">
                                                                <tbody>
                                                                    <tr>
                                                                        <th scope="row">
                                                                            Full Name
                                                                        </th>
                                                                        <td>Josephine
                                                                            Villa</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">
                                                                            Gender</th>
                                                                        <td>Female</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">
                                                                            Birth Date
                                                                        </th>
                                                                        <td>October
                                                                            25th, 1990
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">
                                                                            Marital
                                                                            Status</th>
                                                                        <td>Single</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">
                                                                            Location
                                                                        </th>
                                                                        <td>New York,
                                                                            USA</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <!-- end of table col-lg-6 -->
                                                    <div class="col-lg-12 col-xl-6">
                                                        <div class="table-responsive">
                                                            <table class="table">
                                                                <tbody>
                                                                    <tr>
                                                                        <th scope="row">
                                                                            Email</th>
                                                                        <td><a
                                                                                href="#!">Demo@example.com</a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">
                                                                            Mobile
                                                                            Number</th>
                                                                        <td>(0123) -
                                                                            4567891</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">
                                                                            Twitter</th>
                                                                        <td>@xyz</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">
                                                                            Skype</th>
                                                                        <td>demo.skype
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">
                                                                            Website</th>
                                                                        <td><a
                                                                                href="#!">www.demo.com</a>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <!-- end of table col-lg-6 -->
                                                </div>
                                                <!-- end of row -->
                                            </div>
                                            <!-- end of general info -->
                                        </div>
                                        <!-- end of col-lg-12 -->
                                    </div>
                                    <!-- end of row -->
                                </div>
                                <!-- end of view-info -->
                                <div class="edit-info">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="general-info">
                                                <div class="row">
                                                    <div class="col-lg-6">
                                                        <table class="table">
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <div
                                                                            class="input-group">
                                                                            <span
                                                                                class="input-group-addon"><i
                                                                                    class="icofont icofont-user"></i></span>
                                                                            <input
                                                                                type="text"
                                                                                class="form-control"
                                                                                placeholder="Full Name">
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div
                                                                            class="form-radio">
                                                                            <div
                                                                                class="group-add-on">
                                                                                <div
                                                                                    class="radio radiofill radio-inline">
                                                                                    <label>
                                                                                        <input
                                                                                            type="radio"
                                                                                            name="radio"
                                                                                            checked><i
                                                                                            class="helper"></i>
                                                                                        Male
                                                                                    </label>
                                                                                </div>
                                                                                <div
                                                                                    class="radio radiofill radio-inline">
                                                                                    <label>
                                                                                        <input
                                                                                            type="radio"
                                                                                            name="radio"><i
                                                                                            class="helper"></i>
                                                                                        Female
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <input
                                                                            id="dropper-default"
                                                                            class="form-control"
                                                                            type="text"
                                                                            placeholder="Select Your Birth Date" />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <select
                                                                            id="hello-single"
                                                                            class="form-control">
                                                                            <option
                                                                                value="">
                                                                                ----
                                                                                Marital
                                                                                Status
                                                                                ----
                                                                            </option>
                                                                            <option
                                                                                value="married">
                                                                                Married
                                                                            </option>
                                                                            <option
                                                                                value="unmarried">
                                                                                Unmarried
                                                                            </option>
                                                                        </select>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div
                                                                            class="input-group">
                                                                            <span
                                                                                class="input-group-addon"><i
                                                                                    class="icofont icofont-location-pin"></i></span>
                                                                            <input
                                                                                type="text"
                                                                                class="form-control"
                                                                                placeholder="Address">
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <!-- end of table col-lg-6 -->
                                                    <div class="col-lg-6">
                                                        <table class="table">
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <div
                                                                            class="input-group">
                                                                            <span
                                                                                class="input-group-addon"><i
                                                                                    class="icofont icofont-mobile-phone"></i></span>
                                                                            <input
                                                                                type="text"
                                                                                class="form-control"
                                                                                placeholder="Mobile Number">
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div
                                                                            class="input-group">
                                                                            <span
                                                                                class="input-group-addon"><i
                                                                                    class="icofont icofont-social-twitter"></i></span>
                                                                            <input
                                                                                type="text"
                                                                                class="form-control"
                                                                                placeholder="Twitter Id">
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <!-- <tr>
                                            <td>
                                                <div class="input-group">
                                                    <span class="input-group-addon" id="basic-addon1">@</span>
                                                    <input type="text" class="form-control" placeholder="Twitter Id">
                                                </div>
                                            </td>
                                        </tr> -->
                                                                <tr>
                                                                    <td>
                                                                        <div
                                                                            class="input-group">
                                                                            <span
                                                                                class="input-group-addon"><i
                                                                                    class="icofont icofont-social-skype"></i></span>
                                                                            <input
                                                                                type="email"
                                                                                class="form-control"
                                                                                placeholder="Skype Id">
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div
                                                                            class="input-group">
                                                                            <span
                                                                                class="input-group-addon"><i
                                                                                    class="icofont icofont-earth"></i></span>
                                                                            <input
                                                                                type="text"
                                                                                class="form-control"
                                                                                placeholder="website">
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <!-- end of table col-lg-6 -->
                                                </div>
                                                <!-- end of row -->
                                                <div class="text-center">
                                                    <a href="#!"
                                                        class="btn btn-primary waves-effect waves-light m-r-20">Save</a>
                                                    <a href="#!" id="edit-cancel"
                                                        class="btn btn-default waves-effect">Cancel</a>
                                                </div>
                                            </div>
                                            <!-- end of edit info -->
                                        </div>
                                        <!-- end of col-lg-12 -->
                                    </div>
                                    <!-- end of row -->
                                </div>
                                <!-- end of edit-info -->
                            </div>
                            <!-- end of card-block -->
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h5 class="card-header-text">Description About
                                            Me</h5>

                                    </div>
                                    <div class="card-block user-desc">
                                        <div class="view-desc">
                                            <p>But I must explain to you how all this
                                                mistaken idea of denouncing pleasure and
                                                praising pain was born and I will give
                                                you a complete account of the system,
                                                and expound the actual teachings of the
                                                great explorer of the truth, the
                                                master-builder of human happiness. No
                                                one rejects, dislikes, or avoids
                                                pleasure itself, because it is pleasure,
                                                but because those who do not know how to
                                                pursue pleasure rationally encounter
                                                consequences that are extremely painful.
                                                Nor again is there anyone who loves or
                                                pursues or desires to obtain pain of
                                                itself, because it is pain, but because
                                                occasionally circumstances occur in
                                                which toil and pain can procure him some
                                                great pleasure. To take a trivial
                                                example, which of us ever undertakes
                                                laborious physical exercise, except to
                                                obtain some advantage from it? But who
                                                has any right to find fault with a man
                                                who chooses to enjoy a pleasure that has
                                                no annoying consequences, or one who
                                                avoids a pain that produces no resultant
                                                pleasure?" "On the other hand, we
                                                denounce with righteous indignation and
                                                dislike men who are so beguiled and
                                                demoralized by the charms of pleasure of
                                                the moment, so blinded by desire, that
                                                they cannot foresee the pain and trouble
                                                that are bound to ensue; and equal blame
                                                belongs to those who fail in their duty
                                                through weakness of will, which is the
                                                same as saying through shrinking from
                                                toil and pain. These cases are perfectly
                                                simple and easy to distinguish. In a
                                                free hour, when our power of choice is
                                                untrammelled and when nothing prevents
                                                our being able To Do what we like best,
                                                every pleasure is to be welcomed and
                                                every pain avoided. But in certain
                                                circumstances and owing to the claims of
                                                duty or the obligations of business it
                                                will frequently occur that pleasures
                                                have to be repudiated and annoyances
                                                accepted. The wise man therefore always
                                                holds in these matters to this principle
                                                of selection: he rejects pleasures to
                                                secure other greater pleasures, or else
                                                he endures pains to avoid worse pain.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- personal card end-->
                    </div>
                    <!-- tab pane personal end -->
                    <!-- tab pane info start -->
                    <!-- tab pane info end -->
                    <!-- tab pane contact start -->
                    <!-- tab pane contact end -->
                </div>
                <!-- tab content end -->
            </div>
        </div>
    </div>
    <!-- Page-body end -->



@endsection


@section('custom_js')
    <script>
        'use strict';
        $(document).ready(function() {

            $(window).on('resize', function() {
                dashboardEcharts();
            });

            $(window).on('load', function() {
                dashboardEcharts();
            });


            $("a[data-toggle=\"tab\"]").on("shown.bs.tab", function(e) {
                dashboardEcharts();
            });

            //line chart
            function dashboardEcharts() {
                /*line chart*/
                var myChart = echarts.init(document.getElementById('main'));
                var option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: function(params) {
                            var date = new Date(params.value[0]);
                            var data = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
                            return data + '<br/>' + params.value[1] + ', ' + params.value[2];
                        },
                        responsive: true
                    },
                    dataZoom: {
                        show: true,
                        start: 70
                    },
                    legend: {
                        data: ['Profit']
                    },
                    grid: {
                        y2: 80
                    },
                    xAxis: [{
                        type: 'time',
                        splitNumber: 10
                    }],
                    yAxis: [{
                        type: 'value'
                    }],
                    series: [{
                        name: 'Profit',
                        type: 'line',
                        showAllSymbol: true,
                        symbolSize: function(value) {
                            return Math.round(value[2] / 10) + 2;
                        },
                        data: (function() {
                            var d = [];
                            var len = 0;
                            var now = new Date();
                            var value;
                            while (len++ < 200) {
                                d.push([
                                    new Date(2014, 9, 1, 0, len * 10000),
                                    (Math.random() * 30).toFixed(2) - 0,
                                    (Math.random() * 100).toFixed(2) - 0
                                ]);
                            }
                            return d;
                        })()
                    }]
                };
                myChart.setOption(option);
            }


            //for responsive all datatable

            $('#simpletable').DataTable({
                "paging": true,
                "ordering": true,
                "bLengthChange": true,
                "info": true,
                "searching": true
            });

            $("a[data-toggle=\"tab\"]").on("shown.bs.tab", function(e) {
                $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
            });

            //    Edit information of user-profile
            $('#edit-cancel').on('click', function() {

                var c = $('#edit-btn').find("i");
                c.removeClass('icofont-close');
                c.addClass('icofont-edit');
                $('.view-info').show();
                $('.edit-info').hide();

            });

            $('.edit-info').hide();


            $('#edit-btn').on('click', function() {
                var b = $(this).find("i");
                var edit_class = b.attr('class');
                if (edit_class == 'icofont icofont-edit') {
                    b.removeClass('icofont-edit');
                    b.addClass('icofont-close');
                    $('.view-info').hide();
                    $('.edit-info').show();
                } else {
                    b.removeClass('icofont-close');
                    b.addClass('icofont-edit');
                    $('.view-info').show();
                    $('.edit-info').hide();
                }
            });

            //check editor js
            CKEDITOR.replace('description', {
                // Define the toolbar: http://docs.ckeditor.com/#!/guide/dev_toolbar
                // The standard preset from CDN which we used as a base provides more features than we need.
                // Also by default it comes with a 2-line toolbar. Here we put all buttons in a single row.
                toolbar: [{
                    name: 'clipboard',
                    items: ['Undo', 'Redo']
                }, {
                    name: 'styles',
                    items: ['Styles', 'Format']
                }, {
                    name: 'basicstyles',
                    items: ['Bold', 'Italic', 'Strike', '-', 'RemoveFormat']
                }, {
                    name: 'paragraph',
                    items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote']
                }, {
                    name: 'links',
                    items: ['Link', 'Unlink']
                }, {
                    name: 'insert',
                    items: ['Image', 'EmbedSemantic', 'Table']
                }, {
                    name: 'tools',
                    items: ['Maximize']
                }, {
                    name: 'editing',
                    items: ['Scayt']
                }],

                // Since we define all configuration options here, let's instruct CKEditor to not load config.js which it does by default.
                // One HTTP request less will result in a faster startup time.
                // For more information check http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-customConfig
                customConfig: '',

                // Enabling extra plugins, available in the standard-all preset: http://ckeditor.com/presets-all
                extraPlugins: 'autoembed,embedsemantic,image2,uploadimage,uploadfile',
                imageUploadUrl: '/uploader/upload.php?type=Images',
                uploadUrl: '/uploader/upload.php',
                /*********************** File management support ***********************/
                // In order to turn on support for file uploads, CKEditor has to be configured to use some server side
                // solution with file upload/management capabilities, like for example CKFinder.
                // For more information see http://docs.ckeditor.com/#!/guide/dev_ckfinder_integration

                // Uncomment and correct these lines after you setup your local CKFinder instance.
                // filebrowserBrowseUrl: 'http://example.com/ckfinder/ckfinder.html',
                // filebrowserUploadUrl: 'http://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
                /*********************** File management support ***********************/

                // Remove the default image plugin because image2, which offers captions for images, was enabled above.
                removePlugins: 'image',

                // Make the editing area bigger than default.
                height: 400,


                // This is optional, but will let us define multiple different styles for multiple editors using the same CSS file.
                bodyClass: 'article-editor',

                // Reduce the list of block elements listed in the Format dropdown to the most commonly used.
                format_tags: 'p;h1;h2;h3;pre',

                // Simplify the Image and Link dialog windows. The "Advanced" tab is not needed in most cases.
                removeDialogTabs: 'image:advanced;link:advanced',

                // Define the list of styles which should be available in the Styles dropdown list.
                // If the "class" attribute is used to style an element, make sure to define the style for the class in "mystyles.css"
                // (and on your website so that it rendered in the same way).
                // Note: by default CKEditor looks for styles.js file. Defining stylesSet inline (as below) stops CKEditor from loading
                // that file, which means one HTTP request less (and a faster startup).
                // For more information see http://docs.ckeditor.com/#!/guide/dev_styles
                stylesSet: [
                    /* Inline Styles */
                    {
                        name: 'Marker',
                        element: 'span',
                        attributes: {
                            'class': 'marker'
                        }
                    }, {
                        name: 'Cited Work',
                        element: 'cite'
                    }, {
                        name: 'Inline Quotation',
                        element: 'q'
                    },

                    /* Object Styles */
                    {
                        name: 'Special Container',
                        element: 'div',
                        styles: {
                            padding: '5px 10px',
                            background: '#eee',
                            border: '1px solid #ccc'
                        }
                    }, {
                        name: 'Compact table',
                        element: 'table',
                        attributes: {
                            cellpadding: '5',
                            cellspacing: '0',
                            border: '1',
                            bordercolor: '#ccc'
                        },
                        styles: {
                            'border-collapse': 'collapse'
                        }
                    }, {
                        name: 'Borderless Table',
                        element: 'table',
                        styles: {
                            'border-style': 'hidden',
                            'background-color': '#E6E6FA'
                        }
                    }, {
                        name: 'Square Bulleted List',
                        element: 'ul',
                        styles: {
                            'list-style-type': 'square'
                        }
                    },
                    // Media embed
                    {
                        name: '240p',
                        type: 'widget',
                        widget: 'embedSemantic',
                        attributes: {
                            'class': 'embed-240p'
                        }
                    }, {
                        name: '360p',
                        type: 'widget',
                        widget: 'embedSemantic',
                        attributes: {
                            'class': 'embed-360p'
                        }
                    }, {
                        name: '480p',
                        type: 'widget',
                        widget: 'embedSemantic',
                        attributes: {
                            'class': 'embed-480p'
                        }
                    }, {
                        name: '720p',
                        type: 'widget',
                        widget: 'embedSemantic',
                        attributes: {
                            'class': 'embed-720p'
                        }
                    }, {
                        name: '1080p',
                        type: 'widget',
                        widget: 'embedSemantic',
                        attributes: {
                            'class': 'embed-1080p'
                        }
                    }
                ]
            });

            //edit user description
            $('#edit-cancel-btn').on('click', function() {

                var c = $('#edit-info-btn').find("i");
                c.removeClass('icofont-close');
                c.addClass('icofont-edit');
                $('.view-desc').show();
                $('.edit-desc').hide();

            });

            $('.edit-desc').hide();


            $('#edit-info-btn').on('click', function() {
                var b = $(this).find("i");
                var edit_class = b.attr('class');
                if (edit_class == 'icofont icofont-edit') {
                    b.removeClass('icofont-edit');
                    b.addClass('icofont-close');
                    $('.view-desc').hide();
                    $('.edit-desc').show();
                } else {
                    b.removeClass('icofont-close');
                    b.addClass('icofont-edit');
                    $('.view-desc').show();
                    $('.edit-desc').hide();
                }
            });


            // Minimum setup
            $('#datetimepicker1').datetimepicker({
                icons: {
                    time: "icofont icofont-clock-time",
                    date: "icofont icofont-ui-calendar",
                    up: "icofont icofont-rounded-up",
                    down: "icofont icofont-rounded-down",
                    next: "icofont icofont-rounded-right",
                    previous: "icofont icofont-rounded-left"
                }
            });
            // Using Locales
            $('#datetimepicker2').datetimepicker({
                locale: 'ru',
                icons: {
                    time: "icofont icofont-clock-time",
                    date: "icofont icofont-ui-calendar",
                    up: "icofont icofont-rounded-up",
                    down: "icofont icofont-rounded-down",
                    next: "icofont icofont-rounded-right",
                    previous: "icofont icofont-rounded-left"
                }
            });
            // Custom Formats
            $('#datetimepicker3').datetimepicker({
                format: 'LT',
                icons: {
                    time: "icofont icofont-clock-time",
                    date: "icofont icofont-ui-calendar",
                    up: "icofont icofont-rounded-up",
                    down: "icofont icofont-rounded-down",
                    next: "icofont icofont-rounded-right",
                    previous: "icofont icofont-rounded-left"
                }
            });
            // No Icon (input field only)
            $('#datetimepicker4').datetimepicker({
                icons: {
                    time: "icofont icofont-clock-time",
                    date: "icofont icofont-ui-calendar",
                    up: "icofont icofont-rounded-up",
                    down: "icofont icofont-rounded-down",
                    next: "icofont icofont-rounded-right",
                    previous: "icofont icofont-rounded-left"
                }
            });
            // Enabled/Disabled Dates
            $('#datetimepicker5').datetimepicker({
                defaultDate: "11/1/2013",
                disabledDates: [
                    moment("12/25/2013"),
                    new Date(2013, 11 - 1, 21),
                    "11/22/2013 00:53"
                ],
                icons: {
                    time: "icofont icofont-clock-time",
                    date: "icofont icofont-ui-calendar",
                    up: "icofont icofont-rounded-up",
                    down: "icofont icofont-rounded-down",
                    next: "icofont icofont-rounded-right",
                    previous: "icofont icofont-rounded-left"
                }
            });
            // Linked Pickers
            $('#datetimepicker6').datetimepicker({
                icons: {
                    time: "icofont icofont-clock-time",
                    date: "icofont icofont-ui-calendar",
                    up: "icofont icofont-rounded-up",
                    down: "icofont icofont-rounded-down",
                    next: "icofont icofont-rounded-right",
                    previous: "icofont icofont-rounded-left"
                }
            });
            $('#datetimepicker7').datetimepicker({
                useCurrent: false, //Important! See issue #1075
                icons: {
                    time: "icofont icofont-clock-time",
                    date: "icofont icofont-ui-calendar",
                    up: "icofont icofont-rounded-up",
                    down: "icofont icofont-rounded-down",
                    next: "icofont icofont-rounded-right",
                    previous: "icofont icofont-rounded-left"
                }
            });
            $("#datetimepicker6").on("dp.change", function(e) {
                $('#datetimepicker7').data("DateTimePicker").minDate(e.date);
            });
            $("#datetimepicker7").on("dp.change", function(e) {
                $('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
            });

            // Custom icons
            $('#datetimepicker8').datetimepicker({
                icons: {
                    time: "icofont icofont-clock-time",
                    date: "icofont icofont-ui-calendar",
                    up: "icofont icofont-rounded-up",
                    down: "icofont icofont-rounded-down"
                }
            });

            // View Mode
            $('#datetimepicker9').datetimepicker({
                viewMode: 'years',
                icons: {
                    time: "icofont icofont-clock-time",
                    date: "icofont icofont-ui-calendar",
                    up: "icofont icofont-rounded-up",
                    down: "icofont icofont-rounded-down",
                    next: "icofont icofont-rounded-right",
                    previous: "icofont icofont-rounded-left"
                }
            });

            // Min View Mode
            $('#datetimepicker10').datetimepicker({
                viewMode: 'years',
                format: 'MM/YYYY',
                icons: {
                    time: "icofont icofont-clock-time",
                    date: "icofont icofont-ui-calendar",
                    up: "icofont icofont-rounded-up",
                    down: "icofont icofont-rounded-down",
                    next: "icofont icofont-rounded-right",
                    previous: "icofont icofont-rounded-left"
                }
            });
            // Disabled Days of the Week
            $('#datetimepicker11').datetimepicker({
                daysOfWeekDisabled: [0, 6],
                icons: {
                    time: "icofont icofont-clock-time",
                    date: "icofont icofont-ui-calendar",
                    up: "icofont icofont-rounded-up",
                    down: "icofont icofont-rounded-down",
                    next: "icofont icofont-rounded-right",
                    previous: "icofont icofont-rounded-left"
                }
            });

            $('input[name="daterange"]').daterangepicker();
            $(function() {
                $('input[name="birthdate"]').daterangepicker({
                        singleDatePicker: true,
                        showDropdowns: true
                    },
                    function(start, end, label) {
                        var years = moment().diff(start, 'years');
                        alert("You are " + years + " years old.");
                    });

                $('input[name="datefilter"]').daterangepicker({
                    autoUpdateInput: false,
                    locale: {
                        cancelLabel: 'Clear'
                    }
                });
                $('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
                    $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
                });

                $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
                    $(this).val('');
                });

                var start = moment().subtract(29, 'days');
                var end = moment();

                function cb(start, end) {
                    $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
                }

                $('#reportrange').daterangepicker({
                    startDate: start,
                    endDate: end,
                    "drops": "up",
                    ranges: {
                        'Today': [moment(), moment()],
                        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                    }
                }, cb);

                cb(start, end);

                $('.input-daterange input').each(function() {
                    $(this).datepicker();
                });
                $('#sandbox-container .input-daterange').datepicker({
                    todayHighlight: true
                });
                $('.input-group-date-custom').datepicker({
                    todayBtn: true,
                    clearBtn: true,
                    keyboardNavigation: false,
                    forceParse: false,
                    todayHighlight: true,
                    defaultViewDate: {
                        year: '2017',
                        month: '01',
                        day: '01'
                    }
                });
                $('.multiple-select').datepicker({
                    todayBtn: true,
                    clearBtn: true,
                    multidate: true,
                    keyboardNavigation: false,
                    forceParse: false,
                    todayHighlight: true,
                    defaultViewDate: {
                        year: '2017',
                        month: '01',
                        day: '01'
                    }
                });
                $('#config-demo').daterangepicker({
                    "singleDatePicker": true,
                    "showDropdowns": true,
                    "timePicker": true,
                    "timePicker24Hour": true,
                    "timePickerSeconds": true,
                    "showCustomRangeLabel": false,
                    "alwaysShowCalendars": true,
                    "startDate": "11/30/2016",
                    "endDate": "12/06/2016",
                    "drops": "up"
                }, function(start, end, label) {
                    console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
                });
            });

            // Date-dropper js start

            $("#dropper-default").dateDropper({
                dropWidth: 200,
                dropPrimaryColor: "#1abc9c",
                dropBorder: "1px solid #1abc9c"
            }),
                // Date-dropper js end




                // Mini-color js start
                $('.demo').each(function() {
                    //
                    // Dear reader, it's actually very easy to initialize MiniColors. For example:
                    //
                    //  $(selector).minicolors();
                    //
                    // The way I've done it below is just for the demo, so don't get confused
                    // by it. Also, data- attributes aren't supported at this time...they're
                    // only used for this demo.
                    //
                    $(this).minicolors({
                        control: $(this).attr('data-control') || 'hue',
                        defaultValue: $(this).attr('data-defaultValue') || '',
                        format: $(this).attr('data-format') || 'hex',
                        keywords: $(this).attr('data-keywords') || '',
                        inline: $(this).attr('data-inline') === 'true',
                        letterCase: $(this).attr('data-letterCase') || 'lowercase',
                        opacity: $(this).attr('data-opacity'),
                        position: $(this).attr('data-position') || 'bottom left',
                        swatches: $(this).attr('data-swatches') ? $(this).attr('data-swatches').split('|') : [],
                        change: function(value, opacity) {
                            if (!value) return;
                            if (opacity) value += ', ' + opacity;
                            if (typeof console === 'object') {
                                console.log(value);
                            }
                        },
                        theme: 'bootstrap'
                    });

                });
            // Mini-color js ends
        });
    </script>
@endsection
