let __gastos__ = [
    {
        'nombre': 'Comida',
        'detalle': 'Desayuno',
        'monto': 100
    },
    {
        'nombre': 'Transporte',
        'detalle': 'Bus',
        'monto': 200
    },
    {
        'nombre': 'Ropa',
        'detalle': 'Pantalones',
        'monto': 50
    }
]
let __totalGastoMensual__ = 0
const __details__ = document.getElementById('details')
const __totalGastoMensual__Element = document.getElementById('totalGastoMensual')
const __add__ = document.getElementById('add')
loadInfo()
__add__.addEventListener('click', () => {
    const nombreGasto = document.getElementById('nombreGasto').value
    const detalleGasto = document.getElementById('detalleGasto').value
    const valorGasto = parseFloat(document.getElementById('valorGasto').value)
    if (nombreGasto.trim() === '' || detalleGasto.trim() === '' || isNaN(valorGasto) || valorGasto <= 0) {
        document.getElementById('alerts').innerHTML = `
            <div class="alert alert-danger">Todos los campos son obligatorios y el valor del gasto debe ser un número mayor a 0.</div>
        `
        return
    }
    else {
        if (valorGasto > 150) {
            document.getElementById('alerts').innerHTML = `
            <div class="alert alert-warning">
                Cuidado tu gasto de $${valorGasto} fue considerable.
            </div>
        `
        }
        //document.getElementById('alerts').innerHTML = ''

        __gastos__.push({ 'nombre': nombreGasto, 'detalle': detalleGasto, 'monto': valorGasto })
        loadInfo()
        document.getElementById('nombreGasto').value = ''
        document.getElementById('detalleGasto').value = ''
        document.getElementById('valorGasto').value = ''
    }

})

function loadInfo() {
    let total = 0
    __details__.innerHTML = ''
    __gastos__.forEach((gasto, index) => {
        addGastos(gasto.nombre, gasto.detalle, gasto.monto, index)
        total += gasto.monto
    })
    __totalGastoMensual__Element.innerHTML = `$${total.toFixed(2)}`

}
function addGastos(nombreGasto, detalleGasto, valorGasto, index) {
    const row = document.createElement('div')
    row.setAttribute('class', 'row m-2 d-flex justify-content-center align-items-center')

    row.innerHTML = `
        <div class="col-sm-12 col-md-3 ">${nombreGasto}</div>
        <div class="col-sm-12 col-md-3 ">${detalleGasto}</div>
        <div class="col-sm-12 col-md-3 ">$${valorGasto.toFixed(2)}</div>
        <div class="col-sm-12 col-md-3 d-flex gap-2 justify-content-center align-items-center">
    
            <button class="btn-retro btn-editar" data-id='${index}' onClick='loadInfoEditForm(${index})' data-bs-toggle="modal" data-bs-target="#exampleModal">
                Editar
            </button>
             <button class="btn-retro danger btn-editar" data-id='${index}' onClick='eliminaGasto(${index})'>
                X
            </button>
        </div>
        </div>
    `

    __details__.appendChild(row)

}

function eliminaGasto(id) {
    __gastos__.splice(id, 1)
    loadInfo()
}

function loadInfoEditForm(index) {
    const gasto = __gastos__[index]
    document.getElementById('nombreGastoEdita').value = gasto.nombre
    document.getElementById('detalleGastoEdita').value = gasto.detalle
    document.getElementById('valorGastoEdita').value = gasto.monto

    document.getElementById('index').value = index
}

function saveEdit() {
    __gastos__[document.getElementById('index').value] = {
        'nombre': document.getElementById('nombreGastoEdita').value,
        'detalle': document.getElementById('detalleGastoEdita').value,
        'monto': parseFloat(document.getElementById('valorGastoEdita').value)
    }



    loadInfo()
}