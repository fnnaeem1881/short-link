<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class AuthorMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!Auth::check() ){
            return redirect()->route('login');
        }
        if ( auth::user()->role_id==1){
            return redirect()->route('admindashboard');
        }
        if(auth::user()->role_id==2){
            
            return $next($request);
        }
        if(auth::user()->role_id==3){
            return redirect()->route('userdashboard');
        }
    }
}
