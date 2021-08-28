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
                                        <label class="check-task" id="current_id{{$shortLink->id}}">
                                                <span class="task-title-sp">{{$shortLink->link_name}}
                                                    <form style="display: none" id="sh_form{{$shortLink->id}}" action="#">
                                                      <span style="margin-left: 220px;" ><input id="short_link_code{{$shortLink->id}}" type="text" class="" placeholder="Please Input Your Code..."></span>
                                                        <span  id="short_link_submit" class="f-right">
                                                            <a href="#"  class="btn btn-secondary" onclick="event.preventDefault();submitFunction('{{ $shortLink->id }}')" id="submitButton{{ $shortLink->id }}">
                                                   Submit</a>
                                                        </span>
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
                    var url = result['link']+"?click_id="+result['id'];
                    alert("Please complete the task given and collect verification code!\nEnter that code in below given form!");
                    window.open(url, "_blank");
                    document.getElementById("sh_form"+id).style.display = "inline";
                    document.getElementById("goButton"+id).style.display = "none";
                    var input = document.createElement("input");
                    input.setAttribute("type", "hidden");
                    input.setAttribute("name", "click_id");
                    input.setAttribute("id", "click_id"+id);
                    input.setAttribute("value", result['id']);
                    document.getElementById("sh_form"+id).appendChild(input);
                },
                error:function (response) {
                    alert("Something went wrong! Please refresh and try again later.\n Thank you");
                }
            });
        }

    </script>
    <script>
        function submitFunction(id){
            var _token   = $('meta[name="csrf-token"]').attr('content');
            var u_id = {{ auth()->user()->id }};
            var click_id = $('#click_id'+id).val();
            var code = $('#short_link_code'+id).val();
            var add = "{{ route('code.verify') }}";
            $.ajax({
                url:add,
                method:'POST',
                data:{
                    'click_id':click_id,
                    'code':code,
                    'user_id': u_id,
                    _token: _token
                },
                success:function (response) {
                    var result = $.parseJSON(response);
                    if(result=='verified'){

                        $("#current_id"+id).remove();
                        alert('Successfully Verified & You get 5 points! \nKeep it up to get more rewards!');
                    }else{
                        alert('Invalid Code! \nPlease enter a valid code.');
                    }

                },
                error:function (response) {
                    alert("Something went wrong! Please refresh and try again later.\n Thank you");
                }
            });
        }
    </script>
    <!-- j-pro js -->
    <script type="text/javascript" src="{{asset('frontend/assets')}}/pages/j-pro/js/jquery.ui.min.js"></script>
    <script type="text/javascript" src="{{asset('frontend/assets')}}/pages/j-pro/js/custom/popup-menu-form.js"></script>
    <!-- Color Js --->
    <script type="text/javascript" src="{{asset('frontend/assets')}}/js/common-pages.js"></script>
@endsection

