const print = require('./functions/print');

persona = {
    nombre : 'Lolo',
    apellido : 'Fafo',
    edad : '30'
};

const printIt = (persona)=>{
    print.order(persona)
    .then(
        async resp=>{
            console.log(await resp);
        }
    )
    .catch(
        async e=>{
            console.log(await e);
        }
    )
};

printIt(persona);



