<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ventas extends Model
{
    use HasFactory;

    protected $fillable=['libro_id', 'empleado_id','cliente_id','cantidad'];

    public function libro(){
        return $this->belonsTo(libros::class);
    }

    public function userClient(){
        return $this->belongsTo(User::class);
    }

    public function userEmploy(){
        return $this->belongsTo(User::class);
    }
}
