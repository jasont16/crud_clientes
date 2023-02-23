<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clientes', function (Blueprint $table) {
            $table->id('IdCliente');
            $table->string('Nombre',60)->nullable();
            $table->string('ApellidoPaterno',50)->nullable();
            $table->string('ApellidoMaterno',50)->nullable();
            $table->string('RazonSocial',100)->nullable();
            $table->string('RFC',13);
            $table->string('UsoCFDI',100);
            $table->string('Estatus',50);
            $table->string('NombreContacto',50);
            $table->char('Telefono',10);
            $table->char('Celular',10);
            $table->string('Correo',50);
            $table->string('Observaciones',250)->nullable();
            $table->string('Pais',50);
            $table->string('Estado',50);
            $table->string('Municipio',50);
            $table->string('Ciudad',50);
            $table->char('CP',5);
            $table->string('Colonia',50);
            $table->string('Calle',50);
            $table->char('MumeroExterior',10);
            $table->char('NumeroInterior',10)->nullable();
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
        Schema::dropIfExists('clientes');
    }
};
