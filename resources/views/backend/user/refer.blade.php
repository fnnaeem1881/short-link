@extends('backend.user.navaigation')

@section('custom_css')

@endsection

@section('usercontent')
    <div class="copytext">
        <div class="col-md-6">
            <input type="text" value="Hello World" id="myInput" class="form-control" placeholder="You can't change me" readonly="">
            <button class="mt-2 p-2 bg-success btn-outline-disabled text-light border-0" onclick="myFunction()">Copy Link</button>

        </div>

    </div>


    <div class="table_wrap">
        <div class="card-block">
            <div class="dt-responsive table-responsive">
                <div id="simpletable_wrapper" class="dataTables_wrapper dt-bootstrap4">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12">
                            <table id="simpletable" class="table table-striped table-bordered nowrap dataTable" role="grid" aria-describedby="simpletable_info">
                                <thead>
                                <tr role="row">
                                    <th class="sorting_asc" tabindex="0" aria-controls="simpletable" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending" style="width: 185.2px;">Name</th>
                                    <th class="sorting" tabindex="0" aria-controls="simpletable" rowspan="1" colspan="1" aria-label="Position: activate to sort column ascending" style="width: 288.4px;">Join Date</th>

                                </tr>
                                </thead>
                                <tbody>
                                <tr role="row" class="odd">
                                    <td class="sorting_1">Airi Satou</td>
                                    <td>Accountant</td>

                                </tr>
                                <tr role="row" class="even">
                                    <td class="sorting_1">Ashton Cox</td>
                                    <td>Junior Technical Author</td>

                                </tr>

                                </tbody>
                                <tfoot>
                                <tr>
                                    <th rowspan="1" colspan="1">Name</th>
                                    <th rowspan="1" colspan="1">Join Date</th>

                                </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>




@endsection
@section('custom_js')
    <script>
        function myFunction() {
            /* Get the text field */
            var copyText = document.getElementById("myInput");

            /* Select the text field */
            copyText.select();
            copyText.setSelectionRange(0, 99999); /* For mobile devices */

            /* Copy the text inside the text field */
            navigator.clipboard.writeText(copyText.value);

            /* Alert the copied text */
            alert("Copied the text: " + copyText.value);
        }
    </script>
@endsection
