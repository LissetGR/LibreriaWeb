<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    public function __construct(){
       $this->middleware('can:user.listar')->only('getUser');;
       $this->middleware('can:user.eliminar')->only('destroy');
       $this->middleware('can:user.modificar')->only('modificar');
       $this->middleware('can:user.agregar')->only('create');
    }


    public function getUser(){
         $user= User::all();
         return response()->json($user);
    }


    public function register( Request $request){
        // try{
            $validator = $request->validate( [
                'name' => 'required|string|max:100|alpha_dash|unique:users',
                'password' => 'required|string|min:8|confirmed|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
            ]);


            $user=User::create([
                'name'=> $validator['name'],
                'password'=> Hash::make($validator['password'])
            ])->assignRole('Cliente');

            $user->save();

            Auth::login($user);

            return response()->json([
                'token'=> $user-> createToken('userToke')-> plainTextToken,
                'user'=>$user
            ],200);

        // }catch(ValidationException $error){
        //     return back()->with('error', $error->getMessage());
        // };

    }


    public function login(Request $request){
    //    try{
            $validator= $request->validate([
                'name'=> 'required|string|max:100',
                'password' => 'required|string|min:8'
            ]);


            $user = User::where('name', $request->name)->first();

            if(Auth::attempt($validator,true)){

                if($user->hasRole('Admin')){
                    $role='Admin';
                }else if($user->hasRole('Dependiente')){
                    $role='Dependiente';
                }else{
                    $role='Cliente';
                }



                return response()->json([
                    'token'=> $user-> createToken('userToke')-> plainTextToken,
                    'role'=>$role
                ],200);
            }

            return back()->with('error', 'Usuario o contraseña equivocada');

    //    }catch(ValidationException $error){
    //         return back()->with('error', $error->getMessage());
    //    }
    }


    public function logout(Request $request){
        try{
          $request->user()->currentAccessToken()->delete();

          return response()->json([
            'status'=>true
          ]);

        }catch(ValidationException $error){
            return back()->with('error', $error->getMessage());
       }
    }


    public function verificarRole(Request $request){
        $user=$request->user();

        if($user->hasRole($request->header('rolFront'))){
            return true;
        }else{
            return false;
        }
    }

    public function getAuth(Request $request){
        $user=$request->user()->name;
        return response()->json([
             $user
        ]);
    }


    public function modificar(Request $request){

        $validator = $request->validate( [
            'name' => 'required|string|max:100|alpha_dash|unique:users',
            // 'password' => 'required|string|min:8|confirmed|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/'
        ]);

        $user=User::findOrFail($request->input('id'));
        $user->update(['name' => $request->input('name')]);

        return $user;
    }

    public function destroy(Request $request){

        try{
            $user= User::findOrFail($request->header('id'));
            $user->delete();

            return $user;

        }catch(ValidationException $error){
            return $error->getMessage();
        }
        }


}
