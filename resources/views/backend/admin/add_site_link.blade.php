@extends('backend.admin.navaigation')
@section('usercontent')
    <!-- Page body start -->
    <div class="page-body">
        <div class="row">
            <div class="col-sm-12">
                <!-- Basic Inputs Validation start -->
                <div class="card">
                    <div class="card-header">
                        <h5>Add your site</h5>
                    </div>
                    <div class="card-block">
                        <form id="main" method="post" action="{{route('save.website.link')}}" novalidate>
                            @csrf
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Website Name :</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="website_name"
                                           id="website_name" placeholder="Please Input Your Website Name...." required>
                                    <span class="messages"></span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Website Link :</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"
                                           id="website_link" name="website_link"
                                           placeholder="Please Input Your Website Link..." required>
                                    <span class="messages"></span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Short Link :</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"
                                           id="short_link" name="short_link"
                                           placeholder="Please Input Your Short Link..." required>
                                    <span class="messages"></span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Expected View:</label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control"
                                           id="expected_view" name="expected_view"
                                           placeholder="How many views do you want?..." required>
                                    <span class="messages"></span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Point Per View:</label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control"
                                           id="per_view_point" name="per_view_point"
                                           placeholder="PHow many points you want to give per view..." required>
                                    <span class="messages"></span>
                                </div>
                            </div>
                            <div class="row">
                                <label class="col-sm-2 col-form-label">Status</label>
                                <div class="col-sm-10">
                                    <div class="form-check form-check-inline">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="radio"
                                                   name="status" id="gender-1"
                                                   value="Active"> Active
                                        </label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="radio"
                                                   name="status" id="gender-2"
                                                   value="Inactive"> Inactive
                                        </label>
                                    </div>
                                    <span class="messages"></span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2"></label>
                                <div class="col-sm-10">
                                    <button type="submit"
                                            class="btn btn-primary m-b-0">Submit</button>
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

