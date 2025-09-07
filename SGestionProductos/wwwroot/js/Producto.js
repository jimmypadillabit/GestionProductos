let datatable = null

const ValidarFormulario = () => {

    let formValid = `Llenar los siguientes datos<br>`
    let isValid = false
    let txtId = document.getElementById('txtId')
    let txtNombre = document.getElementById('txtNombre')
    let txtDes = document.getElementById('txtDes')
    let txtPrecio = document.getElementById('txtPrecio')
    let txtStock = document.getElementById('txtStock')
    let txtCategoria = document.getElementById('txtCategoria')
    let txtPvp = document.getElementById('txtPvp')
    let txtUtilidad = document.getElementById('txtUtilidad')
    let cmbProveedor = document.getElementById('cmbProveedor')

    if (txtNombre.value == "") {
        formValid += "<b>*Nombre</b><br>"
        isValid = true
    }

    if (txtDes.value == "") {
        formValid += "<b>*Descripcion</b><br>"
        isValid = true
    }

    if (txtPrecio.value == "") {
        formValid += "<b>*Precio</b><br>"
        isValid = true
    }

    if (txtStock.value == "") {
        formValid += "<b>*Stock</b><br>"
        isValid = true
    }

    if (txtPvp.value == "") {
        formValid += "<b>*Pvp</b><br>"
        isValid = true
    }


    if (cmbProveedor.value == "") {
        formValid += "Seleccione los siguientes datos<br><b>*Proveedor</b><br>"
        isValid = true
    }


    if (isValid) {

        alert(formValid)

    } else {

        let datos = {}

        if (txtId.value != "") {

            datos.Id = txtId.value
        }

        datos.Nombre = txtNombre.value
        datos.Descripcion = txtDes.value
        datos.Precio = txtPrecio.value
        datos.Stock = txtStock.value
        datos.Categoria = txtCategoria.value
        datos.Pvp = txtPvp.value
        datos.Utilidad = txtUtilidad.value
        datos.IdProveedor = cmbProveedor.value

        if (txtId.value == "") {

            Guardar(datos)

        } else {

            Editar(datos)
        }


    }
}

const MostrarData = () => {

    let tbl = document.getElementById('tblProducto')
    let tblData = document.getElementById('tblData')
    tblData.innerHTML = ""
    let promise = Listar().then(r => {

        r.forEach(el => {

            let tr = document.createElement('tr')

            let tdNombre = document.createElement('td')
            let tdDes = document.createElement('td')
            let tdCategoria = document.createElement('td')
            let tdProveedor = document.createElement('td')

            tdNombre.innerHTML = el.nombre
            tdDes.innerHTML = el.descripcion
            tdCategoria.innerHTML = el.categoria
            tdProveedor.innerHTML = el.stock


            let tdId = document.createElement('td')
            tdId.classList.add("py-1")
            tdId.innerHTML = `<img src="../../assets/images/faces-clipart/pic-1.png" alt="image">`

            let tdAc = document.createElement('td')
            tdAc.innerHTML = `<div class="btn-group-vertical" role="group" aria-label="Basic example">
                        
                        <div class="btn-group">
                            <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Acciones</button>
                            <div class="dropdown-menu" style="">
                                <a class="dropdown-item" onclick=CapturarInfo('${el.id}')>Editar</a>
                                <a class="dropdown-item" onclick=PreguntaEliminar('${el.id}')>Eliminar</a>
                            </div>
                        </div>
                        
                    </div>`

            tr.appendChild(tdId)
            tr.appendChild(tdNombre)
            tr.appendChild(tdDes)
            
            tr.appendChild(tdProveedor)
            tr.appendChild(tdCategoria)
            tr.appendChild(tdAc)

            tblData.appendChild(tr)
        })

    })
}

const PreguntaEliminar = (id) => {

    BuscarId(id).then(r => {

        let data = r

        document.getElementById('infoData').innerHTML = `<b>${data.nombre}</b><br><b>${data.contacto}</b>`

        document.getElementById('btnEliminar').dataset.id = data.id

        $('#mEliminar').modal('show')

    })


}

const CapturarInfo = (id) => {

    BuscarId(id).then(r => {

        let data = r

        document.getElementById('txtId').value = data.id
        document.getElementById('txtNombre').value = data.nombre
        document.getElementById('txtDes').value = data.descripcion
        document.getElementById('txtPrecio').value = data.precio
        document.getElementById('txtStock').value = data.stock
        document.getElementById('txtCategoria').value = data.categoria
        document.getElementById('txtPvp').value = data.pvp
        document.getElementById('txtUtilidad').value = data.utilidad
        document.getElementById('cmbProveedor').value = data.idProveedor

        $('#mProducto').modal('show')

    })
}

const LimpiarFormulario = () => {

    document.getElementById('txtId').value = ""
    document.getElementById('txtNombre').value = ""
    document.getElementById('txtDes').value = ""
    document.getElementById('txtPrecio').value = ""
    document.getElementById('txtStock').value = ""
    document.getElementById('txtCategoria').value = ""
    document.getElementById('txtPvp').value = ""
    document.getElementById('txtUtilidad').value = ""
    document.getElementById('cmbProveedor').value = ""
}

const Guardar = obj => {

    fetch('/api/producto/add', {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }

    }).then(r => r.json()).then(r => {
        alert("Registro guardado correctamente")

        $('#mProducto').modal('hide')

        LimpiarFormulario()

        MostrarData()
    })
}

const Listar = () => {

    return fetch('/api/producto/get')
        .then(r => r.json())

}

const BuscarId = id => {

    return fetch(`/api/producto/getid?id=${id}`)
        .then(r => r.json())
}

const Editar = obj => {

    fetch('/api/producto/update', {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }

    }).then(r => { r.json() })
        .then(r => {

            alert("Registro editado correctamente")

            $('#mProducto').modal('hide')

            LimpiarFormulario()

            MostrarData()
        })
}

const Eliminar = el => {

    let id = el.dataset.id;

    return fetch(`/api/producto/delete?id=${id}`, {
        method: 'DELETE'
    })
        .then(r => { r.json() })
        .then(r => {

            alert("Registro eliminado correctamente")

            $('#mEliminar').modal('hide')

            MostrarData()
        })
}

const ListarProveedores = () => {

    let cmbProveedor = document.getElementById('cmbProveedor')

    fetch('/api/proveedor/get')
        .then(r => r.json())
        .then(r => {

            let optionDefault = document.createElement('option')
            optionDefault.value = ""
            optionDefault.text = "Seleccione"
            cmbProveedor.appendChild(optionDefault)
            r.forEach(el => {

                let option = document.createElement('option')
                option.value = el.id
                option.text = el.nombre

                cmbProveedor.appendChild(option)
            })
        })
}

document.addEventListener("DOMContentLoaded", function () {

    MostrarData()

    ListarProveedores()
});