<?php

namespace App\Http\Controllers\admin;

use App\admin\AddWebsiteLink;
use App\admin\ShortLink;
use App\admin\ShortlinkClick;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class AdminController extends Controller
{

    public function admindashboard()
    {
        return view('backend.admin.admindashboard');
    }
    public function addSiteLink()
    {
        return view('backend.admin.add_site_link');
    }

    public function saveWebsiteLink(Request  $request)
    {
//        dd($request->all());

        $request->validate([
            'website_link' => 'required|url',
            'website_name' => 'required',
            'short_link' => 'required',
            'expected_view' => 'required|numeric',
            'per_view_point' => 'required|numeric',
        ]);

        $saveWebsiteLink = new AddWebsiteLink();
        $saveWebsiteLink->website_name = $request->website_name;
        $saveWebsiteLink->website_link = $request->website_link;
        $saveWebsiteLink->short_link = $request->short_link;
        $saveWebsiteLink->expected_view = $request->expected_view;
        $saveWebsiteLink->per_view_point = $request->per_view_point;
        $saveWebsiteLink->status = $request->status;
        if($saveWebsiteLink->status=='Active'){
            $links=AddWebsiteLink::where('status','Active')->get();
            foreach ($links as $link){
                $link->status = 'Inactive';
                $link->save();
            }
        }
        $saveWebsiteLink->save();
        session()->flash('successMessage','Link Saved!');
        return redirect()->route('list.website.link');

    }

    public function listWebsiteLink()
    {
        $websiteLists=AddWebsiteLink::orderBy('id','desc')->get();
//        dd($websiteLists);
        return view('backend.admin.list_website_link',compact('websiteLists'));
    }

    public function listWebsiteLinkDelete($id)
    {
        $websiteListDelete=AddWebsiteLink::where('id',$id)->first();
        $websiteListDelete->delete();
//        dd($websiteLists);
        return redirect()->back();
    }

    public function listWebsiteLinkEdit($id)
    {
        $websiteListEdit=AddWebsiteLink::where('id',$id)->first();
//        dd($websiteLists);
        return view('backend.admin.add_website_link_edit',compact('websiteListEdit'));
    }

    public function listWebsiteLinkUpdate(Request  $request , $id)
    {
        $websiteUpdate=AddWebsiteLink::where('id',$id)->first();

        $request->validate([
            'website_link' => 'required|url',
            'website_name' => 'required',
            'short_link' => 'required',
            'expected_view' => 'required|numeric',
            'per_view_point' => 'required|numeric',
        ]);

        $websiteUpdate->website_name = $request->website_name;
        $websiteUpdate->website_link = $request->website_link;
        $websiteUpdate->short_link = $request->short_link;
        $websiteUpdate->expected_view = $request->expected_view;
        $websiteUpdate->per_view_point = $request->per_view_point;
        $websiteUpdate->status = $request->status;

        if($websiteUpdate->status=='Active'){
            $links=AddWebsiteLink::where('status','Active')->where('id','!=',$websiteUpdate->id)->get();
            foreach ($links as $link){
                $link->status = 'Inactive';
                $link->save();
            }
        }
        $websiteUpdate->save();
        session()->flash('successMessage','Information Updated!');
        return redirect()->route('list.website.link');

    }

    public function myShortLinks(){
        $short_links = ShortLink::orderBy('id','desc')->get();
//        dd($short_links);
        return view('backend.admin.my_short_links',compact('short_links'));
    }

    public function myShortLinkDetails($id){
        $short_link_details = ShortlinkClick::where('short_link_id',$id)->first();
//        dd($short_link_details);
        return view('backend.admin.my_short_link_details',compact('short_link_details'));
    }


}
