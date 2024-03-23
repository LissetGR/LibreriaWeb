<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VentaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'empleado_id' =>$this->empleado->name,
            'cliente_id'=>$this->cliente->name,
            'libro_id'=>$this->libro->titulo,
            'cantidad'=>$this->cantidad,
            'created_at'=>$this->created_at
         ];
    }
}
