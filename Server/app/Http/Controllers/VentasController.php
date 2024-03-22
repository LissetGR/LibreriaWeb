<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ventas;
use Illuminate\Http\Request;
use App\Http\Resources\VentaResource;

class VentasController extends Controller
{
    public function __construct(){
        $this->middleware('can:ventas.listar');
        $this->middleware('can:ventas.agregar');
        $this->middleware('can:ventas.eliminar');
        $this->middleware('can:ventas.modificar');
    }



    public function getVentas(){

        $venta= ventas::all();
        // return VentaResource::collection($venta);
        return response()->json($venta);
    }

    public function create (Request $request){

        $validator = $request->validate( [
            'libro_id' => 'required|numeric',
            'cliente_id' => 'required|numeric',
            'empleado_id' => 'required|numeric',
            'cantidad' => 'required|numeric',

        ]);


        $venta=ventas::create([
            'libro_id' => $validator['libro_id'],
            'empleado_id' => $validator['empleado_id'],
            'cliente_id' => $validator['cliente_id'],
            'cantidad' => $validator['cantidad'],
        ]);

        $venta->save();


        return response()->json([
            'status'=>true
        ],200);

    }

    public function destroy(Request $request){
        $venta= ventas::find($request()->id);
        $venta->delete();
    }

    public function getById(Request $request){
        $venta=ventas::find($request()->id);
        return response()->json($venta);
    }

    public function modificar(Request $request){

            $validator = $request->validate( [
                'libro_id' => 'required|numeric',
                'cliente_id' => 'required|numeric',
                'empleado_id' => 'required|numeric',
                'cantidad' => 'required|numeric',
            ]);

            $venta=ventas::find($request->input('id'));
            $venta->update($request->all());
            $venta->save();

            return response()->json([
                'status'=>true
            ],200);
    }
}
