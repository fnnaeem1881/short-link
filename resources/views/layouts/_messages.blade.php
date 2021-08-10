@if(session()->has('successMessage'))
    <div class="row">
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>{{ session('successMessage')}}</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>
@endif
@if(session()->has('errorMessage'))
    <div class="row">
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>{{ session('errorMessage')}}</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>
@endif
