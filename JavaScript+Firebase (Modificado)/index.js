const firebaseConfig = {
    apiKey: "AIzaSyBqko_16rSoS23aI3BHNyQo3gcuxJ4Nv94",
    authDomain: "jsfirebase-97ea7.firebaseapp.com",
    databaseURL: "https://jsfirebase-97ea7-default-rtdb.firebaseio.com",
    projectId: "jsfirebase-97ea7",
    storageBucket: "jsfirebase-97ea7.appspot.com",
    messagingSenderId: "164616325847",
    appId: "1:164616325847:web:90959af5c5a3ccd5f5fe92"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='Selecciona';
    document.getElementById("Input4").value='Selecciona';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var rol = document.getElementById("Input3").value;
    var panteon = document.getElementById("Input4").value;

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var dios = {
            id, //matricula:id
            nombre,
            rol,
            panteon,
        }

        //console.log(dios);

        firebase.database().ref('Dioses/' + id).update(dios).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Dioses').push().key;
    //data[`Dioses/${key}`]= dios;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Dioses');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(dios){
    
    if(dios!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = dios.id;
        cell2.innerHTML = dios.nombre; 
        cell3.innerHTML = dios.rol;
        cell4.innerHTML = dios.panteon; 
        cell5.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${dios.id})">Eliminar</button>`;
        cell6.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+dios.id+')">Modificar</button>';
    }
}

function deleteR(id){
    firebase.database().ref('Dioses/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id){
    var ref = firebase.database().ref('Dioses/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(dios){
    if(dios!=null)
    {
        document.getElementById("Input1").value=dios.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=dios.nombre;
        document.getElementById("Input3").value=dios.rol;
        document.getElementById("Input4").value=dios.panteon;
    }
}


//Para consulta de panteon
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;

    var ref = firebase.database().ref("Dioses");
    ref.orderByChild("panteon").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(dios){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = dios.id;
    cell2.innerHTML = dios.nombre; 
    cell3.innerHTML = dios.rol;
    cell4.innerHTML = dios.panteon; 
   
}