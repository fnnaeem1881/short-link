<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShortlinkClicksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shortlink_clicks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('set null');
            $table->unsignedBigInteger('short_link_id');
            $table->foreign('short_link_id')->references('id')->on('short_links')->onDelete('restrict')->onUpdate('cascade');
            $table->string('ip', 50)->default(null);
            $table->string('city',100)->default(null);
            $table->string('country',100)->default(null);
            $table->string('continent',100)->default(null);
            $table->string('latitude',100)->default(null);
            $table->string('longitude',100)->default(null);
            $table->string('network',100)->default(null);
            $table->string('service_provider_id',20)->default(null);
            $table->string('service_provider',255)->default(null);
            $table->integer('v_code');
            $table->string('v_code_status')->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shortlink_clicks');
    }
}
