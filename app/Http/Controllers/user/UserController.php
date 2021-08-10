<?php

namespace App\Http\Controllers\user;

use App\admin\AddWebsiteLink;
use App\admin\ShortLink;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function index(){
        return view('backend.user.userdashboard');
    }

    public function user_profile(){
        return view('backend.user.user_profile');
    }
    public function shortLink(){
        return view('backend.user.shortlink');
    }
    public function  todayShortLink(){
        $link = AddWebsiteLink::where('status','Active')->limit(1)->first();
        return view('backend.user.todayLink',compact('link'));
    }

    public function newShortLink(){
        $link = AddWebsiteLink::where('status','Active')->limit(1)->first();
        return view('backend.user.add_short_link',compact('link'));

    }
    public function saveShortLink(Request $request){
        $request->validate([
            'link_name' => 'required',
            'short_link' => 'required|url'
        ]);
        $longAddress = $this->getOriginalURL($request->short_link);
        $active = AddWebsiteLink::where('status','Active')->limit(1)->first();
        if($active->website_link != $longAddress) {
            session()->flash('errorMessage',$request->short_link.' Does not match with the real one!');
            return redirect()->back();
        }else{
            $short_link = new ShortLink();
            $short_link->link_name = $request->link_name;
            $short_link->short_link = $request->short_link;
            $short_link->website_link_id = $active->id;
            $short_link->user_id = auth()->user()->id;
            $short_link->save();
            session()->flash('successMessage','Short link successfully added!');
            return redirect()->route('shortLink.all');
        }
    }
    public function myShortLinks(){
        $short_links = ShortLink::where('user_id',auth()->user()->id)->orderBy('id','desc')->get();
        return view('backend.user.my_short_links',compact('short_links'));
    }
    private function getOriginalURL($url) {
        $longURL = get_headers($url, 7);
        return $longURL['Location'];
    }

}
