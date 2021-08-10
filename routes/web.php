<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
//
//Route::get('/', function () {
//    return view('frontend.home');
//});
//menu route
route::get('/','frontend\MenuController@home')->name('home');
route::get('/home','frontend\MenuController@home')->name('home');

// page route
Route::get('testpage','frontend\PageController@testpage')->name('testpage');





Auth::routes();


route::group(['prefix'=>'admin','namespace'=>'admin','middleware'=>'admin'],function(){
    route::get('admin/dashboard','AdminController@admindashboard')->name('admindashboard');
    route::get('add/website/link','AdminController@addSiteLink')->name('add.website.link');
    route::post('save/website/link','AdminController@saveWebsiteLink')->name('save.website.link');
    route::get('list/website/link','AdminController@listWebsiteLink')->name('list.website.link');
});
route::group(['prefix'=>'author','namespace'=>'author','middleware'=>'author'],function(){
    route::get('authordashboard','AuthorController@authordashboard')->name('authordashboard');
});
route::group(['prefix'=>'user','namespace'=>'user','middleware'=>'user'],function(){
    route::get('userdashboard','UserController@index')->name('userdashboard');
    route::get('user_profile','UserController@user_profile')->name('user_profile');
    route::get('shortlink','UserController@shortlink')->name('shortlink');
    route::get('shortlink/today','UserController@todayShortLink')->name('shortLink.today');
    route::get('shortlink/new','UserController@newShortLink')->name('shortLink.new');
    route::post('shortlink/save','UserController@saveShortLink')->name('shortLink.save');
    route::get('shortlink/all','UserController@myShortLinks')->name('shortLink.all');
});

