const ValidarForm = () => {


    let txtUser = document.getElementById('txtUser')
    let txtPass = document.getElementById('txtPass')

    if (txtUser.value == "") {
        alert("El campo usuario es obligatorio")
        return false
    }

    if (txtPass.value == "") {
        alert("El campo password es obligatorio")
        return false
    }
    let obj = {}
    obj.User = txtUser.value
    obj.Pass = txtPass.value
    Login(obj)
}

const Login = obj => {

    const ul = "admin"
    const pl = "admin"

    if (obj.User == ul && obj.Pass == pl) {
        window.location.href = "/venta";
    } else {
        alert("Acceso incorrecto")
        return false
    }
}

const Acceder = obj => {

    fetch('/api/acceso/verificar', {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }

    }).then(r => r.json()).then(r => {
        console.log(r)
    })
}

document.getElementById("FrmLogin").addEventListener("submit", function (event) {
    event.preventDefault()
});