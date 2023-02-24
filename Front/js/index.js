var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    datos: [],
    esPersonaFisica: false,
    esModificacion: false,
    accion: 'Guardar Cliente',

    cliente: {
      RFC: '',
      usoCFDI: '',
      estatus: '',
      nombreCliente: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      razonSocial: '',
      codigoPostal: '',
      pais: '',
      ciudad: '',
      estado: '',
      municipio: '',
      colonia: '',
      calle: '',
      numeroExterior: '',
      numeroInterior: '',
      nombreContacto: '',
      telefono: '',
      movil: '',
      email: '',
      observaciones: '',
    },
    Clientes: [],
    Colonias: [],
    //Estos datos se deberian de obtener de un catalogo
    //Por fines practicos estan hardcodeados
    Paises: [
      { id: 1, nombre: 'México'},
      { id: 2, nombre: 'Estados Unidos'},
    ],
    Estatus: [
      { id: 1, nombre: 'Activo'},
      { id: 2, nombre: 'Inactivo'},
    ],
    UsoCFDI: [
      { id: 'G01', nombre: 'Adquisición de mercancías'},
      { id: 'G03', nombre: 'Gastos en general'},
    ],
  },
  beforeMount() {
    this.getClientes();
  },
  methods: {
    getCP: function () {
      axios({
        method: 'get',
        url: 'https://findep.platapresta.com/api/cp/' + this.cliente.codigoPostal
      })
        .then(function (response) {
          console.log(response.data);
          app.cliente.ciudad = response.data.ciudad;
          app.cliente.estado = response.data.estado;
          app.cliente.municipio = response.data.deleg_munic;
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

    modificarCliente: function ($IdCliente) {
      app.esModificacion = true;
      app.accion = 'Modificar Cliente';
      return;
      axios({
        method: 'patch',
        url: 'http://127.0.0.1:8000/api/cliente/' + $IdCliente,
        data: app.cliente
      })
        .then(function (response) {
          app.getClientes();//refresca la tabla
          app.esModificacion = false;
          app.accion = 'Guardar Cliente';
        })
        .catch(function (error) {
          console.log(error);
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

    guardarCliente: function () {
      console.log(this.cliente);
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/cliente/',
        data: app.cliente
      })
        .then(function (response) {
          console.log(response.data);
        });
    },

    isNumber: function(evt) {
      const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      const keyPressed = evt.key;
      if (!keysAllowed.includes(keyPressed)) {
        evt.preventDefault()
      }
    },
  },
})