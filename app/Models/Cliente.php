<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;
    protected $table = 'clientes';
    protected $primaryKey = 'IdCliente';

    protected $fillable = [
        'Nombre',
        'ApellidoPaterno',
        'ApellidoMaterno',
        'RazonSocial',
        'RFC',
        'UsoCFDI',
        'Estatus',
        'NombreContacto',
        'Telefono',
        'Celular',
        'Correo',
        'Observaciones',
        'Pais',
        'Estado',
        'Municipio',
        'Ciudad',
        'CP',
        'Colonia',
        'Calle',
        'MumeroExterior',
        'NumeroInterior',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}
