var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    datos: [],
    esPersonaFisica: false,
    esModificacion: false,
    accion: 'Guardar Cliente',

    cliente: {
      IdCliente: '',
      RFC: '',
      UsoCFDI: '',
      Estatus: '',
      Nombre: '',
      ApellidoPaterno: '',
      ApellidoMaterno: '',
      RazonSocial: '',
      CP: '',
      Pais: '',
      Ciudad: '',
      Estado: '',
      Municipio: '',
      Colonia: '',
      Calle: '',
      NumeroExterior: '',
      NumeroInterior: '',
      NombreContacto: '',
      Telefono: '',
      Celular: '',
      Correo: '',
      Observaciones: '',
    },
    Clientes: [],
    Colonias: [],
    //Estos datos se deberian de obtener de un catalogo
    //Por fines practicos estan hardcodeados
    Paises: [
      { id: 1, nombre: 'México' },
      { id: 2, nombre: 'Estados Unidos' },
    ],
    Estatus: [
      { id: 1, nombre: 'Activo' },
      { id: 2, nombre: 'Inactivo' },
    ],
    UsoCFDI: [
      { id: 'G01', nombre: 'Adquisición de mercancías' },
      { id: 'G03', nombre: 'Gastos en general' },
    ],
  },
  beforeMount() {
    this.getClientes();
  },
  methods: {
    getCP: function () {
      axios({
        method: 'get',
        url: 'https://findep.platapresta.com/api/cp/' + this.cliente.CP
      })
        .then(function (response) {
          app.cliente.Ciudad = response.data.ciudad;
          app.cliente.Estado = response.data.estado;
          app.cliente.Municipio = response.data.deleg_munic;
          app.Colonias = response.data.colonias;
        });
    },

    getClientes: function () {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/cliente/',
      })
        .then(function (response) {
          app.Clientes = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    modalModificarCliente: function (cliente) {
      app.cliente = {};
      app.$refs.formulario.reset();
      app.esModificacion = true;
      app.accion = 'Modificar Cliente';
      //llenar el formulario
      app.cliente.IdCliente = cliente.IdCliente;
      app.cliente.RFC = cliente.RFC;
      app.cliente.UsoCFDI = cliente.UsoCFDI;
      app.cliente.Estatus = cliente.Estatus;
      app.cliente.Nombre = cliente.Nombre;
      app.cliente.ApellidoPaterno = cliente.ApellidoPaterno;
      app.cliente.ApellidoMaterno = cliente.ApellidoMaterno;
      app.cliente.RazonSocial = cliente.RazonSocial;
      app.cliente.CP = cliente.CP;
      app.cliente.Pais = cliente.Pais;
      app.cliente.Ciudad = cliente.Ciudad;
      app.cliente.Estado = cliente.Estado;
      app.cliente.Municipio = cliente.Municipio;
      app.cliente.Colonia = cliente.Colonia;
      app.cliente.Calle = cliente.Calle;
      app.cliente.NumeroExterior = cliente.NumeroExterior;
      app.cliente.NumeroInterior = cliente.NumeroInterior;
      app.cliente.NombreContacto = cliente.NombreContacto;
      app.cliente.Telefono = cliente.Telefono;
      app.cliente.Celular = cliente.Celular;
      app.cliente.Correo = cliente.Correo;
      app.cliente.Observaciones = cliente.Observaciones;
    },

    modificarCliente: function () {
      axios({
        method: 'patch',
        url: 'http://127.0.0.1:8000/api/cliente/' + app.cliente.IdCliente,
        data: app.cliente
      })
        .then(function (response) {
          Swal.fire({
            title: 'Se actualizo correctamente!',
            text: "Cliente actualizado con exito!",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.isConfirmed) {
              app.getClientes();//refresca la tabla
              app.$refs.cerrarModal.click();
            }
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    modalGuardarCliente: function () {
      app.cliente = {};
      app.esModificacion = false;
      app.accion = 'Guardar Cliente';
    },

    guardarCliente: function () {
      app.esModificacion = false;
      app.accion = 'Guardar Cliente';
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/cliente/',
        data: app.cliente
      })
        .then(function (response) {
          console.log(response.data);
          Swal.fire({
            title: 'Se guardo correctamente!',
            text: "Cliente guardado con exito!",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.isConfirmed) {
              app.getClientes();//refresca la tabla
              app.$refs.cerrarModal.click();
            }
          });
        })
        .catch(function (error) {
          console.log(error.response.data);
          Swal.fire({
            title: 'El cliente ya existe!',
            text: error.response.data.RFC,
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
          });
          return;
        });
    },

    eliminarCliente: function ($IdCliente) {
      Swal.fire({
        title: '¿Esta seguro?',
        text: "Se eliminara el cliente!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, ELIMINAR!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios({
            method: 'delete',
            url: 'http://127.0.0.1:8000/api/cliente/' + $IdCliente,
          })
            .then(function (response) {
              Swal.fire(
                'Eliminado!',
                '',
                'success'
              )
              app.getClientes();//refresca la tabla
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      });
    },

    //validaciones
    isNumber: function (e) {
      let char = String.fromCharCode(e.keyCode);
      if (/^[0-9]+$/.test(char)) return true;
      else e.preventDefault();
    },

    isLetter: function (e) {
      let char = String.fromCharCode(e.keyCode);
      if (/^[A-Za-z]+$/.test(char)) return true;
      else e.preventDefault();
    },

    isLetterNumber: function (e) {
      let char = String.fromCharCode(e.keyCode);
      if (/^[A-Za-z0-9]+$/.test(char)) return true;
      else e.preventDefault();
    }
  },
})