<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;
use App\Traits\ApiResponser;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class ClientesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(Cliente::all(), Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ($this->rules($request)) {//Valida que los datos enviados cumplan con las reglas
            return response($this->rules($request), Response::HTTP_BAD_REQUEST);
        }
        return response(Cliente::create($request->all()), Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function show(Cliente $cliente)
    {
        return response($cliente, Response::HTTP_OK);   
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cliente $cliente)
    {
        if ($this->rulesUpdate($request)) {//Valida que los datos enviados cumplan con las reglas
            return response($this->rules($request), Response::HTTP_BAD_REQUEST);
        }
        return response($cliente->update($request->all()), Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cliente $cliente)
    {
        return response($cliente->delete(), Response::HTTP_OK);
    }

    public function rules($data)//Reglas de validacion para el request
    {
        $validator = Validator::make($data->all(), [
            'Nombre'                => 'max:60',
            'ApellidoPaterno'       => 'max:50',
            'ApellidoMaterno'       => 'max:50',
            'RazonSocial'           => 'max:100',
            'RFC'                   => 'required|unique:App\Models\Cliente|string|min:10|max:13', //'UNIQUE' valida que el RFC no exista en la tabla
            'UsoCFDI'               => 'required|string|max:100',
            'Estatus'               => 'required|string|max:50',
            'NombreContacto'        => 'required|string|max:100',
            'Telefono'              => 'required|string|min:10|max:10',
            'Celular'               => 'required|string|min:10|max:10',
            'Correo'                => 'required|string|max:50',
            'Observaciones'         => 'string|max:250',
            'Pais'                  => 'required|string|max:50',
            'Estado'                => 'required|string|max:50',
            'Municipio'             => 'required|string|max:50',
            'Ciudad'                => 'required|string|max:50',
            'CP'                    => 'required|string|min:5|max:5',
            'Colonia'               => 'required|string|max:50',
            'Calle'                 => 'required|string|max:50',
            'NumeroExterior'        => 'required|max:10',
            'NumeroInterior'        => '|max:10',
        ]);
        if ($validator->fails()) {
            return $validator->errors();
        }
    }

    public function rulesUpdate($data)//Reglas de validacion para el request
    {
        $validator = Validator::make($data->all(), [
            'Nombre'                => 'max:60',
            'ApellidoPaterno'       => 'max:50',
            'ApellidoMaterno'       => 'max:50',
            'RazonSocial'           => 'max:100',
            'RFC'                   => 'required|string|min:10|max:13', //'UNIQUE' valida que el RFC no exista en la tabla
            'UsoCFDI'               => 'required|string|max:100',
            'Estatus'               => 'required|string|max:50',
            'NombreContacto'        => 'required|string|max:100',
            'Telefono'              => 'required|string|min:10|max:10',
            'Celular'               => 'required|string|min:10|max:10',
            'Correo'                => 'required|string|max:50',
            'Observaciones'         => 'string|max:250',
            'Pais'                  => 'required|string|max:50',
            'Estado'                => 'required|string|max:50',
            'Municipio'             => 'required|string|max:50',
            'Ciudad'                => 'required|string|max:50',
            'CP'                    => 'required|string|min:5|max:5',
            'Colonia'               => 'required|string|max:50',
            'Calle'                 => 'required|string|max:50',
            'NumeroExterior'        => 'required|max:10',
            'NumeroInterior'        => '|max:10',
        ]);
        if ($validator->fails()) {
            return $validator->errors();
        }
    }
}
