<?php

namespace App\admin;

use Illuminate\Database\Eloquent\Model;

class AddWebsiteLink extends Model
{
    public function shortLinks(){
        return $this->hasMany(ShortLink::class,'website_link_id');
    }
}
