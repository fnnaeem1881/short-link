@extends('backend.user.navaigation')

@section('custom_css')
      <!--[if lt IE 10]>
<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->

<!-- Required Fremwork -->
<link rel="stylesheet" type="text/css" href="{{asset('frontend')}}/bower_components/bootstrap/dist/css/bootstrap.min.css">
<!-- themify-icons line icon -->
<link rel="stylesheet" type="text/css" href="{{asset('frontend/assets')}}/themify-icons/themify-icons.css">
<!-- ico font -->
<link rel="stylesheet" type="text/css" href="{{asset('frontend/assets')}}/icon/icofont/css/icofont.css">
<!-- feather Awesome -->
<link rel="stylesheet" type="text/css" href="{{asset('frontend/assets')}}/icon/feather/css/feather.css">
<!-- jpro forms css -->
<link rel="stylesheet" type="text/css" href="{{asset('frontend/assets')}}/pages/j-pro/css/demo.css">
<link rel="stylesheet" type="text/css" href="{{asset('frontend/assets')}}/pages/j-pro/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="{{asset('frontend/assets')}}/pages/j-pro/css/j-forms.css">
<!-- Style.css -->
<link rel="stylesheet" type="text/css" href="{{asset('frontend/assets')}}/css/style.css">


@endsection
@section('usercontent')


    <div class="row">
        <div class="col-sm-12">
            <!-- To Do List in Modal card start -->
            <div class="card">
                <div class="card-header">
                    <h5>ShortLink List</h5>

                </div>
                <div class="card-block">
                    <section class="task-panel tasks-widget">
                        <div class="panel-body">
                            <div class="task-content">
                                <div class="to-do-label">
                                    <div class="checkbox-fade fade-in-primary">
                                        @foreach($shortLinks as $shortLink)
                                        <label class="check-task">

                                                <span class="task-title-sp">{{$shortLink->short_link}}


                                                      <span style="margin-left: 220px;visibility: hidden" id="short_link_code"><input type="text" class="" placeholder="Please Input Your Code..."></span>

                                                </span>
                                            <span class="f-right">
                                               <a href="{{$shortLink->short_link}}" target="_blank" class="btn btn-primary" onclick="myFunction()" id="goButton">
                                                   Go</a>
                                             </span>

                                        </label>
                                        @endforeach
                                    </div>
                                </div>

                            </div>

                        </div>
                    </section>
                </div>
            </div>
            <!-- To Do List in Modal card end -->
        </div>
    </div>








@endsection
@section('custom_js')

    <script>
        function myFunction() {
            document.getElementById("short_link_code").style.visibility = "visible";
            document.getElementById("goButton").innerText="Submit";
        }
    </script>
    <!-- j-pro js -->
    <script type="text/javascript" src="{{asset('frontend/assets')}}/pages/j-pro/js/jquery.ui.min.js"></script>
    <script type="text/javascript" src="{{asset('frontend/assets')}}/pages/j-pro/js/custom/popup-menu-form.js"></script>
    <!-- Color Js --->
    <script type="text/javascript" src="{{asset('frontend/assets')}}/js/common-pages.js"></script>
@endsection

