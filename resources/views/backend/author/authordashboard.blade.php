@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">{{ __('Author Dashboard') }}</div>

                    <div class="card-body">
                        @if (session('status'))
                            <div class="alert alert-success" role="alert">
                                {{ session('status') }}
                            </div>
                        @endif
                            <p>Role: {{auth()->user()->name}}</p>
                        {{ __('Author You are logged in!') }}
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
