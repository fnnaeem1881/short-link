@extends('backend.user.navaigation')

@section('custom_css')
    <meta name="csrf-token" content="{{ csrf_token() }}" />
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
                    <h5>Links</h5>
                </div>
                <div class="card-block">
                    <section class="task-panel tasks-widget">
                        <div class="panel-body">
                            <div class="task-content">
                                <div class="to-do-label">
                                    <div class="checkbox-fade fade-in-primary">
                                        @foreach($shortLinks as $shortLink)
                                        <label class="check-task">
                                                <span class="task-title-sp">{{$shortLink->link_name}}
                                                    <form style="display: none" id="sh_form{{$shortLink->id}}" action="#">
                                                      <span style="margin-left: 220px;" id="short_link_code"><input type="text" class="" placeholder="Please Input Your Code..."></span>
                                                        <span  id="short_link_submit" class="f-right"><input
                                                                type="submit" class="btn btn-primary" value="Submit"></span>
                                                    </form>
                                                </span>
                                            <span class="f-right">
                                               <a href="{{$shortLink->short_link}}"  class="btn btn-primary" onclick="event.preventDefault();myFunction('{{ $shortLink->id }}')" id="goButton{{ $shortLink->id }}">
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
        function myFunction(id) {
            var _token   = $('meta[name="csrf-token"]').attr('content');
            var u_id = {{ auth()->user()->id }};
            // var add = "user/shortlink/code/generate@store";
            var add = "{{ route('code.generate') }}";
            $.ajax({
                url:add,
                method:'POST',
                data:{
                    'slink_id':id,
                    'user_id': u_id,
                    _token: _token
                },
                success:function (response) {
                    var result = $.parseJSON(response);
                    console.log(result);
                    // alert(result['id']);
                    // alert(result['link']);
                    var url = result['link']+"?click_id="+result['id'];
                    alert("Please complete the task given and collect verification code!\nEnter that code in below given form!");
                    window.open(url, "_blank");
                    document.getElementById("sh_form"+id).style.display = "inline";
                    document.getElementById("goButton"+id).style.display = "none";

                },
                error:function (response) {
                    alert("Something went wrong! Please refresh and try again later.\n Thank you");
                }
            });
           // window.open(url, "_blank");
        }

        // $(document).ready(function (){
        //     $('#product_name').onclick(function () {
        //         var text = $(this).val(); // jquery function to read value from a html element
        //         $.ajax({
        //             url:'process.php',
        //             method:'POST',
        //             data:{'st':text}, //st = search term
        //             success:function (response) {
        //                 if(response == '' || response == null){
        //                     $('#hintText').html("No hint available");
        //                 }else{
        //                     $('#hintText').html(response);
        //                 }
        //             },
        //             error:function (response) {
        //                 alert("Error");
        //             }
        //         });
        //     });
        // });
    </script>
    <!-- j-pro js -->
    <script type="text/javascript" src="{{asset('frontend/assets')}}/pages/j-pro/js/jquery.ui.min.js"></script>
    <script type="text/javascript" src="{{asset('frontend/assets')}}/pages/j-pro/js/custom/popup-menu-form.js"></script>
    <!-- Color Js --->
    <script type="text/javascript" src="{{asset('frontend/assets')}}/js/common-pages.js"></script>
@endsection

