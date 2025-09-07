let datatable = null

const ValidarFormulario = () => {

    let formValid = `Llenar los siguientes datos<br>`
    let isValid = false
    let txtId = document.getElementById('txtId')
    let txtNombre = document.getElementById('txtNombre')
    let txtContacto = document.getElementById('txtContacto')
    let txtEmail = document.getElementById('txtEmail')
    let txtTelefono = document.getElementById('txtTelefono')
    
    if (txtNombre.value == "") {
        formValid += "<b>*Nombre</b><br>"
        isValid = true
    }

    if (txtContacto.value == "") {
        formValid += "<b>*Contacto</b><br>"
        isValid = true
    }

    if (txtEmail.value == "") {
        formValid += "<b>*Email</b><br>"
        isValid = true
    }

    if (txtTelefono.value == "") {
        formValid += "<b>*Telefono</b><br>"
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
        datos.Contacto = txtContacto.value
        datos.Email = txtEmail.value
        datos.Telefono = txtTelefono.value

        if (txtId.value == "") {

            Guardar(datos)

        } else {

            Editar(datos)
        }

        
    }
}

const MostrarData = () => {

    let tbl = document.getElementById('tblProveedor')
    let tblData = document.getElementById('tblData')
    tblData.innerHTML = ""

    let promise = Listar().then(r => {

        r.forEach(el => {

            let tr = document.createElement('tr')

            let tdNombre = document.createElement('td')
            let tdContacto = document.createElement('td')
            let tdEmail = document.createElement('td')
            let tdTelefono = document.createElement('td')

            tdNombre.innerHTML = el.nombre
            tdContacto.innerHTML = el.contacto
            tdEmail.innerHTML = el.email
            tdTelefono.innerHTML = el.telefono


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
            tr.appendChild(tdContacto)
            tr.appendChild(tdEmail)
            tr.appendChild(tdTelefono)
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
        document.getElementById('txtContacto').value = data.contacto
        document.getElementById('txtEmail').value = data.email
        document.getElementById('txtTelefono').value = data.telefono

        $('#mProveedor').modal('show')

    })
}

const LimpiarFormulario = () => {

    document.getElementById('txtId').value = ""
    document.getElementById('txtNombre').value = ""
    document.getElementById('txtContacto').value = ""
    document.getElementById('txtEmail').value = ""
    document.getElementById('txtTelefono').value = ""
}

const Guardar = obj => {

    fetch('/api/proveedor/add', {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }

    }).then(r => r.json()).then(r => {

        alert("Registro guardado correctamente")

        $('#mProveedor').modal('hide')

        LimpiarFormulario()

        MostrarData()
    })
}

const Listar = () => {

    return fetch('/api/proveedor/get')
           .then(r => r.json())

}

const BuscarId = id => {

    return fetch(`/api/proveedor/getid?id=${id}`)
        .then(r => r.json())
}

const Editar = obj => {

    fetch('/api/proveedor/update', {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }

    }).then(r => { r.json() })
      .then(r => {


          alert("Registro editado correctamente")

          $('#mProveedor').modal('hide')

          LimpiarFormulario()

          MostrarData()
    })
}

const Eliminar = el => {

    let id = el.dataset.id;

    return fetch(`/api/proveedor/delete?id=${id}`, {
        method: 'DELETE'
    })
        .then(r => { r.json() })
        .then(r => {

            alert("Registro eliminado correctamente")

            $('#mEliminar').modal('hide')

            MostrarData()
            
        })
}

document.addEventListener("DOMContentLoaded", function () {

    MostrarData()
});