@extends('backend.user.navaigation')

@section('usercontent')
    <!-- Page-header start -->
    <div class="page-header">
        <div class="row align-items-end">
            <div class="col-lg-8">
                <div class="page-header-title">
                    <div class="d-inline">
                        <h4>Today's Short link URL!</h4>
                        <span>Please Use this URL to Short Link.</span>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="page-header-breadcrumb">
                    <ul class="breadcrumb-title">
                        <li class="breadcrumb-item"  style="float: left;">
                            <a href="#"> <i class="feather icon-home"></i> </a>
                        </li>
                        <li class="breadcrumb-item"  style="float: left;"><a href="#!">Today</a>
                        </li>
                        <li class="breadcrumb-item"  style="float: left;"><a href="#!">URL</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- Page-header end -->

    <!-- Page body start -->
    <div class="page-body">
        <div class="row">
            <div class="  col-sm-12 col-lg-12">
                <div class="card">
                    <div class="card-block">
                        <h4>Website Link to Make Short URL</h4>
                        <div class="form-group row">
{{--                            <label for="">{{ $link->website_name }}</label>--}}
                            <input id="website_url" class="form-control" value="{{ $link->website_link }}" type="text" readonly>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-10">
                                <button onclick="myFunction()" type="button" class="btn btn-outline-primary m-b-0">Copy Now</button>
                            </div>
                        </div>
                    </div>
                    <div class="card-block background-danger">
                        <h3 class="danger-colorr">Important Instructions</h3>
                        <p class="content">Please copy the above link and make short url using any reputed url shortening website!Like</p>
                        <p>1. Tiny URL</p>
                        <p>2. Bitly</p>
                        <p>Then submit your shortened URL by going to "Add Short Link" option in side menu.</p>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <script>
        function myFunction() {
            var copyText = document.getElementById("website_url");
            copyText.select();
            copyText.setSelectionRange(0, 99999)
            document.execCommand("copy");
            alert("Successfully Copied!");
        }
    </script>
    <!-- Page body end -->
@endsection
