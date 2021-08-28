@extends('backend.user.navaigation')
@section('usercontent')
    <!-- Page body start -->
    <div class="col-md-12">
        <div class="card table-card">
            <div class="card-header">
                <h5>Short Link Details</h5>
                <div class="card-header-right">
                    <ul class="list-unstyled card-option">
                        <li><i class="feather icon-maximize full-card"></i></li>
                        <li><i class="feather icon-minus minimize-card"></i>
                        </li>

                    </ul>
                </div>
            </div>
            <div class="card-block">
                <div class="table-responsive">
                    <table class="table table-hover  table-borderless">
                        <thead>
                        <tr>
                            <th>
                                <div class="chk-option">
                                    <div
                                        class="checkbox-fade fade-in-primary">
                                        <label class="check-task">
                                            <input type="checkbox" value="">
                                            <span class="cr">
                                                                                            <i
                                                                                                class="cr-icon feather icon-check txt-default"></i>
                                                                                        </span>
                                        </label>
                                    </div>
                                </div>
                                Name
                            </th>
                            <th>IP</th>
                            <th>Country</th>
                            <th>City</th>
                            <th>status</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <div class="chk-option">
                                    <div
                                        class="checkbox-fade fade-in-primary">
                                        <label class="check-task">
                                            <input type="checkbox" value="">
                                            <span class="cr">
                                                                                            <i
                                                                                                class="cr-icon feather icon-check txt-default"></i>
                                                                                        </span>
                                        </label>
                                    </div>
                                </div>
                                <div class="d-inline-block align-middle">
                                    <h6>{{auth()->user()->name}}</h6>
                                </div>
                            </td>
                            <td>{{$short_link_details->ip}}</td>
                            <td>{{$short_link_details->country}}</td>
                            <td>{{$short_link_details->city}}</td>
                            <td class="text-c-blue">{{$short_link_details->v_code_status}}</td>
                        </tr>

                        </tbody>
                    </table>
                    <div class="text-center">
                        <a href="#!" class=" b-b-primary text-primary">View all
                            Projects</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Page body end -->
@endsection

