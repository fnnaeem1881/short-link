@extends('backend.user.navaigation')
@section('usercontent')

<form action="#">
@csrf

<div class="form-group row">

    <div class="col-md-12">
        <input type="text" class="form-control" name="name" id="name" placeholder="Enter You Website" required>
        <span class="messages"></span>
    </div>
</div>

<input class="btn btn-primary m-b-0" type="submit" value="Go">
</form>


@endsection

