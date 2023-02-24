var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      datos: [],
    },
    methods:{
        prueba: function(){
            axios({
                method: 'get',
                url: 'https://findep.platapresta.com/api/cp/80000',
                responseType: 'json'
              })
            .then(function (response) {
                this.datos = response;
                console.log(this.datos);
                //response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
            });
        }
    },
  })