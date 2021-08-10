<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                'name' =>'Master Admin',
                'role_id' =>1,
                'email' =>'masteradmin@test.com',
                'password' => bcrypt('123456'),
            ],
            [
                'name' =>'Admin',
                'role_id' =>2,
                'email' =>'systemadmin@test.com',
                'password' => bcrypt('123456'),
            ],
            [
                'name' =>'Test User',
                'role_id' =>3,
                'email' =>'testuser@test.com',
                'password' => bcrypt('123456'),
            ],
        ];
        DB::table('users')->insert($users);
    }
}
