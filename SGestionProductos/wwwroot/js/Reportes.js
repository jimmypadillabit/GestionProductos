const ConsultarRptVendidos = () => {

    let txtInicioV = document.getElementById('txtInicioV')
    let txtFinV = document.getElementById('txtFinV')
    let txtCantidad = document.getElementById('txtCantidad')

    if (txtInicioV.value == "") {
        alert("Seleccione una fecha de inicio")
        return false
    }

    if (txtFinV.value == "") {

        alert("Seleccione una fecha de fin")
        return false

    }

    if (txtCantidad.value == "") {

        alert("El campo cantidad es obligatorio")
        return false

    }

    RptVendidos(txtCantidad.value ,txtInicioV.value, txtFinV.value)

}

const ConsultarRptVenta = () => {

    let txtInicio = document.getElementById('txtInicio')
    let txtFin = document.getElementById('txtFin')

    if (txtInicio.value == "") {
        alert("Seleccione una fecha de inicio")
        return false
    }

    if (txtFin.value == "") {

        alert("Seleccione una fecha de fin")
        return false

    }

    RptVenta(txtInicio.value, txtFin.value)

}

const ConsultarRptStock = () => {

    

    RptStock()

}

const RptVendidos = (cantidad,inicio, fin) => {

    let bodyVentaV = document.getElementById('DataVentasV')

    bodyVentaV.innerHTML = ""

    return fetch(`/api/venta/reportemasvendidos?cantidad=${cantidad}&inicio=${inicio}&fin=${fin}`)
        .then(r => r.json()).then(r => {

            r.forEach(x => {

                let tr = document.createElement('tr')

                let tdProducto = document.createElement('td')
                let tdCantidad = document.createElement('td')
                let tdTotal = document.createElement('td')
                let tdGanancia = document.createElement('td')

                tdProducto.innerHTML = x.nombre
                tdCantidad.innerHTML = x.cantidadTotal
                tdTotal.innerHTML = x.totalVentas
                tdGanancia.innerHTML = x.ganancia


                tr.appendChild(tdProducto)
                tr.appendChild(tdCantidad)
                tr.appendChild(tdTotal)
                tr.appendChild(tdGanancia)

                bodyVentaV.appendChild(tr)
            })
        })
}


const RptVenta = (inicio, fin) => {

    let bodyVenta = document.getElementById('DataVentas')

    bodyVenta.innerHTML = ""

    return fetch(`/api/venta/reporteventas?inicio=${inicio}&fin=${fin}`)
        .then(r => r.json()).then(r => {

            r.forEach(x => {

                let tr = document.createElement('tr')

                let tdProducto = document.createElement('td')
                let tdCantidad = document.createElement('td')
                let tdTotal = document.createElement('td')
                let tdGanancia = document.createElement('td')

                tdProducto.innerHTML = x.nombre
                tdCantidad.innerHTML = x.cantidadTotal
                tdTotal.innerHTML = x.totalVentas
                tdGanancia.innerHTML = x.ganancia


                tr.appendChild(tdProducto)
                tr.appendChild(tdCantidad)
                tr.appendChild(tdTotal)
                tr.appendChild(tdGanancia)

                bodyVenta.appendChild(tr)
            })
        })
}


const RptStock = () => {

    let bodyStock = document.getElementById('DataStock')

    bodyStock.innerHTML = ""

    return fetch(`/api/producto/get`)
        .then(r => r.json()).then(r => {

            r.forEach(x => {

                let tr = document.createElement('tr')

                let tdProducto = document.createElement('td')
                let tdCantidad = document.createElement('td')

                let estado = ``

                if (x.stock <= 2) {

                    estado = `<label class="badge badge-danger">${x.stock}</label>`

                } else if (x.stock >= 3 && x.stock <= 6) {

                    estado = `<label class="badge badge-warning">${x.stock}</label>`

                } else if (x.stock >= 7) {
                    estado = `<label class="badge badge-success">${x.stock}</label>`
                }
                
                tdProducto.innerHTML = x.nombre
                tdCantidad.innerHTML = estado
                


                tr.appendChild(tdProducto)
                tr.appendChild(tdCantidad)
               

                bodyStock.appendChild(tr)
            })
        })
}