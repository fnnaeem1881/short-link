<?php

namespace App\admin;

use App\User;
use Illuminate\Database\Eloquent\Model;

class ShortlinkClick extends Model
{
    //
    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
    public function shortLink(){
        return $this->hasMany(ShortLink::class,'short_link_id');
    }
}
