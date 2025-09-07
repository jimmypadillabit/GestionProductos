let listDetails = []
let currentProducto = {}

const PreguntaGuardar = () => {

    if (listDetails.length == 0) {
        alert('Debe agregar al menos un producto')
        return false
    }

    $('#mGuardar').modal('show')
}

const ConfirmarGuardar = () => {

    let detalle = []

    listDetails.map(x => {

        let item = {}

        item.ProductoId = x.id
        item.Cantidad = x.cantidad
        item.Total = x.total
        item.Estado = 'cerrado'

        detalle.push(item)

    })

    Guardar(detalle)

}

const LimpiarDetalle = () => {

    listDetails =[]

    document.getElementById('dataDetail').innerHTML = ""
}



const AgregarDetalle = () => {

    let txtCantidad = document.getElementById('txtCantidad')
    let txtProducto = document.getElementById('txtIdProduct')

    if (txtCantidad.value == "") {

        alert('Agregue una cantidad')
        return false

    } else if (Object.keys(currentProducto).length === 0) {

        alert('Seleccione un producto')
        return false

    } else {

        let producto = {}
        producto.id = currentProducto.id
        producto.cantidad = txtCantidad.value
        producto.precio = currentProducto.pvp
        producto.name = currentProducto.nombre
        producto.total = parseFloat(txtCantidad.value) * parseFloat(currentProducto.pvp)

        listDetails.push(producto)

        MostrarDetalle()

        LimpiarItem()
    }
}

const MostrarDetalle = () => {

    let seccionDetalle = document.getElementById('dataDetail')
    seccionDetalle.innerHTML = ""

    listDetails.forEach(x => {


        let itemDiv = document.createElement("div");

        itemDiv.classList.add("preview-item", "border-bottom")

        itemDiv.innerHTML = `<div class="preview-thumbnail">
                                    <div class="preview-icon bg-primary">
                                        <i class="mdi mdi-file-document"></i>
                                    </div>
                                </div>
                                <div class="preview-item-content d-sm-flex flex-grow">
                                    <div class="flex-grow">
                                        <h6 class="preview-subject">${x.name}</h6>
                                        <p class="text-muted mb-0">PVP: $. ${x.precio.toFixed(2)}</p>
                                    </div>
                                    <div class="mr-auto text-sm-right pt-2 pt-sm-0">
                                        <p class="text-muted">Cantidad: ${x.cantidad}</p>
                                        <p class="text-muted mb-0">Total: $. ${x.total.toFixed(2)}</p>
                                    </div>
                                </div>`;
        

        seccionDetalle.appendChild(itemDiv)

    })

}

const VerDetalle = () => {

    let cmbProducto = document.getElementById('cmbProducto')

    if (cmbProducto.value != "") {

        BuscarProductoId(cmbProducto.value).then(r => {

            let data = r

            document.getElementById('infoPvp').innerHTML = `$. ${parseFloat(data.pvp).toFixed(2)}`
            document.getElementById('infoNombre').innerHTML = data.nombre
            document.getElementById('infoDes').innerHTML = data.descripcion

            currentProducto = data

        })
    } else {

        document.getElementById('infoPvp').innerHTML = `$. 00.00`
        document.getElementById('infoNombre').innerHTML = ""
        document.getElementById('infoDes').innerHTML = ""

        currentProducto = {}
    }

}

const LimpiarItem = () => {

    document.getElementById('cmbProducto').value = ''
    document.getElementById('infoNombre').innerHTML = ''
    document.getElementById('infoDes').innerHTML = ''
    document.getElementById('infoPvp').innerHTML = ''
    document.getElementById('txtCantidad').value = ""

}

const BuscarProductoId = id => {

    return fetch(`/api/producto/getid?id=${id}`)
        .then(r => r.json())
}



const Guardar = list => {

    fetch('/api/venta/add', {
        method: "POST",
        body: JSON.stringify(list),
        headers: {
            'Content-Type': 'application/json'
        }

    }).then(r => r.json()).then(r => {

        ActualizarStock(list)
    })
}

const ActualizarStock = list => {

    let productos = []

    list.forEach(el => {

        let obj = {}

        obj.Id = el.ProductoId
        obj.Cantidad = el.Cantidad

        productos.push(obj)
    })

    fetch('/api/producto/actualizarstock', {
        method: "PUT",
        body: JSON.stringify(productos),
        headers: {
            'Content-Type': 'application/json'
        }

    }).then(r => r.json()).then(r => {


        LimpiarDetalle()

        alert("Venta guardada correctamente")

        $('#mGuardar').modal('hide')
    })
}

const ListarProducto = () => {

    let cmbProducto = document.getElementById('cmbProducto')

    fetch('/api/producto/get')
        .then(r => r.json())
        .then(r => {

            let optionDefault = document.createElement('option')
            optionDefault.value = ""
            optionDefault.text = "Seleccione"
            cmbProducto.appendChild(optionDefault)
            r.forEach(el => {

                let option = document.createElement('option')
                option.value = el.id
                option.text = `${el.nombre} - ${el.descripcion}`

                cmbProducto.appendChild(option)
            })
        })

}


document.addEventListener("DOMContentLoaded", function () {

    ListarProducto()
});