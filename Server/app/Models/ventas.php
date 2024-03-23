<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ventas extends Model
{
    use HasFactory;

    protected $fillable=['libro_id', 'empleado_id','cliente_id','cantidad'];

    public function libro(){
        return $this->belongsTo(libros::class);
    }

    public function cliente(){
        return $this->belongsTo(User::class, 'cliente_id');
    }

    public function empleado(){
        return $this->belongsTo(User::class, 'empleado_id');
    }
}
