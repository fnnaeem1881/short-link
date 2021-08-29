@extends('backend.user.navaigation')
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
                        <th>Link Name</th>
                        <th>Short Link</th>
                        <th>Action</th>

                    </tr>
                    </thead>
                    <tbody>
                 @foreach($short_links as $short_link)
                    <tr>
                        <td>{{$short_link->link_name}}</td>
                        <td>{{$short_link->short_link}}</td>
                        <td>
                           <a href="{{route('admin.shortLink.details',$short_link->id)}}">
                               <button class="btn btn-success">Details</button>
                           </a>
                        </td>



                    </tr>
                 @endforeach


                    </tbody>
                    <tfoot>
                    <tr>
                        <th>Website Name</th>
                        <th>Website Link</th>
                        <th>Action</th>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
    <!-- Page body end -->
@endsection

