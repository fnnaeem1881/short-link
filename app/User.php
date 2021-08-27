<?php

namespace App;

use App\admin\ShortLink;
use App\admin\ShortlinkClick;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'role_id',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function roles(){
        return $this->belongsTo('app\role');
    }
    public function shortLinks(){
        return $this->hasMany(ShortLink::class,'user_id');
    }
    public function shortLinkClicks(){
        return $this->hasMany(ShortlinkClick::class,'short_link_id');
    }
}
