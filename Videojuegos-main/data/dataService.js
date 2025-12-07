const path = require('path');
const fs = require('fs');

const productosTienda = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'productos.json'), 'utf8')
);

const users = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'users.json'), 'utf8')
);



function saveProductosTienda() {
    fs.writeFileSync(
        path.join(__dirname, 'productos.json'),
        JSON.stringify(productosTienda),
        'utf8'
    );
}

function saveProducto(p){
    productosTienda.push(p)
    saveProductosTienda()
}

function findAllProductos() {    
    return productosTienda;
}

function findAllProductosLessThan(precio) {
    return productosTienda.filter((e) => { return (e.precio < precio) })
}

function findProductoById(id) {   
    return productosTienda.filter((e) => { return (e.id == id) })[0]
}


function deleteProductoById(id) {
    const originalLength = productosTienda.length;
    const nuevaLista = productosTienda.filter(e => e.id != id);
    // Primero, comprobamos si la nueva lista de productos tiene una longitud diferente a la lista original.
    // Esto significa que se eliminó un producto.
    if (nuevaLista.length !== originalLength) {
        // Vaciamos el array productosTienda actual 
        // y añadimos todos los elementos de la nueva lista al array vaciado.
        productosTienda.length = 0;
        productosTienda.push(...nuevaLista);
        saveProductosTienda();
        return true;
    }
    return false;
}

function validateUser(email, password){
    
    let query = users.filter((e) => { return (e.username == email) })
    
    // result = db.query(`select * from user where username = ${email}`)
    
    if(query.length>0){
        if(query[0].password==password){
            return true
        }
        else{
            return false
        }
    }
}


module.exports = {
    saveProducto,
    findAllProductos,
    findAllProductosLessThan,
    findProductoById,
    deleteProductoById,
    validateUser
}