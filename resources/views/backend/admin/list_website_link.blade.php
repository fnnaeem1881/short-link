@extends('backend.admin.navaigation')
@section('usercontent')
    <!-- Page body start -->
    <div class="card">
        <div class="card-header">
            <h5>List Website</h5>
        </div>
        <div class="card-block">
            <div class="table-responsive dt-responsive">
                <table id="dom-jqry"
                       class="table table-striped table-bordered nowrap"
                       style="width:100%">
                    <thead>
                    <tr>
                        <th>Website Name</th>
                        <th>Website Link</th>
                        <th>View Count</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>
                    </thead>
                    <tbody>
                 @foreach($websiteLists as $websiteList)
                    <tr>
                        <td>{{$websiteList->website_name}}</td>
                        <td>{{$websiteList->website_link}}</td>
                        <td>{{$websiteList->view_count}}</td>
{{--                        <td>{{$websiteList->status}}</td>--}}
                        <td>
                            <div class="j-unit">
                                <label class="j-checkbox-toggle">
                                    <input type="checkbox" class="js-single" @if($websiteList->status=='Active')
                                           checked @endif />{{ $websiteList->status }}
                                </label>
                            </div>

                        </td>
                        <td>Edit/Delete</td>


                    </tr>
                 @endforeach


                    </tbody>
                    <tfoot>
                    <tr>
                        <th>Website Name</th>
                        <th>Website Link</th>
                        <th>View Count</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
    <!-- Page body end -->
@endsection

