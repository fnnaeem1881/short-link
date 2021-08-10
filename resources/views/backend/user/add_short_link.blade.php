@extends('backend.user.navaigation')
@section('usercontent')
    <!-- Page body start -->
    <div class="page-body">
        <div class="row">
            <div class="col-sm-12">
                <!-- Basic Inputs Validation start -->
                <div class="card">
                    <div class="card-header">
                        <h5>Add your shortened link</h5>
                    </div>
                    <div class="card-block">
                        <form id="main" method="post" action="{{route('shortLink.save')}}" novalidate>
                            @csrf
                            <input type="hidden" name="website_link_id" value="{{ $link->id }}">
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Your Link Name :</label>
                                <div class="col-sm-10">
                                    <input  value="{{ old('link_name') }}" type="text" class="form-control" name="link_name"
                                           id="link_name" placeholder="Please Input Your Website Name...." required>
                                    @error('link_name')
                                    <div class="text-danger">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Shortened Link :</label>
                                <div class="col-sm-10">
                                    <input value="{{ old('short_link') }}" type="url" class="form-control"
                                           id="short_link" name="short_link"
                                           placeholder="https://abc.com/xx3ff4" required>
                                    @error('short_link')
                                    <div class="text-danger">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2"></label>
                                <div class="col-sm-10">
                                    <input class="btn btn-primary m-b-0" type="submit" VALUE="Submit">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- Page body end -->
@endsection

