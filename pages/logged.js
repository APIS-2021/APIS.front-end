import { React,useState } from 'react';
import Layout from '../components/layout'
import { useFormik } from 'formik';
import * as Yup from 'yup';

var casas = [
  {
    "id": "1",
    "Nombre": "test hogar",
    "Creador": "test",
    "Habitantes": [
      {
        "id": "test2"
      },
      {
        "id": "test3"
      }
    ]
  },
  {
    "id": "2",
    "Nombre": "test hogar2",
    "Creador": "test",
    "Habitantes": []
  }
]

var productos = [
  {
    "id": "1",
    "Nombre": "test producto",
    "Precio": 13.50,
    "Cantidad": 3,
    "Asignado": null,
    "DeHogar": "test hogar",
    "Status": false,
  },
  {
    "id": "2",
    "Nombre": "test producto2",
    "Precio": 13.0,
    "Cantidad": 1,
    "Asignado": "test",
    "DeHogar": "test hogar",
    "Status": false,
  }
]

var usuarios = [
  {
    "id": "1",
    "Nombre": "test",
  },
  {
    "id": "2",
    "Nombre": "test2",
  },
  {
    "id": "3",
    "Nombre": "test3",
  }
]

export default function Home() {

  // Listado de productos
  const [message2, saveHogares] = useState(casas);
  const [message, saveMessage] = useState(null);
  const [selected, saveValue] = useState(null);
  const [editHogar, saveEH] = useState(null);
  const [editProducto, saveEP] = useState(null);

  // Formulario
  const formik = useFormik({
    initialValues: {
      nombreHogar: ''
    },
    validationSchema: Yup.object({
      nombreHogar: Yup.string().required('Ingrese un nombre.').min(1,"Ingrese un nombre")
    }),
    onSubmit: (values,{resetForm}) => {
      if (editHogar) {
        const ind = casas.findIndex((obj => obj.id == editHogar));
        casas[ind].Nombre = values.nombreHogar
        saveEH(null)
        formik.values.nombreHogar = ''
      } else {
        const newCasa = {
          id: (casas.length + 1).toString(),
          Nombre: values.nombreHogar,
          Creador: "test",
          Habitantes: []
        }
        casas.push(newCasa)
      }
      resetForm()
      saveHogares(casas)
    }
  });

  // Formulario
  const formik2 = useFormik({
    initialValues: {
      nombreProducto: '',
      precio: 0,
      cantidad: 1
    },
    validationSchema: Yup.object({
      nombreProducto: Yup.string().required('Ingrese un nombre.'),
      precio: Yup.number().required('Ingrese un precio.'),
      cantidad: Yup.number().required('Ingrese una cantidad')
    }),
    onSubmit: (values,{resetForm}) => {
      if (editProducto) {
        const ind = productos.findIndex((obj => obj.id == editProducto));
        productos[ind].Nombre = values.nombreProducto
        productos[ind].Precio = values.precio
        productos[ind].Cantidad = values.cantidad
        saveEP(null)
        formik2.values.nombreProducto = ''
        formik2.values.precio = 0
        formik2.values.cantidad = 1
      } else {
        if (selected) {
          const newProducto = {
            id: (productos.length + 1).toString(),
            Nombre: values.nombreProducto,
            Precio: values.precio,
            Cantidad: values.cantidad,
            Asignado: null,
            DeHogar: selected,
            Status: false
          }
          productos.push(newProducto)
        }
      }
      saveMessage(productos.filter(producto=> producto.DeHogar == selected))
      resetForm()
    }
  });

  function editH(id) {
    saveEH(id)
    const nombre = casas.filter(casa=>casa.id==id)[0].Nombre
    formik.values.nombreHogar = nombre
  }

  function delH(id) {
    var ind = casas.findIndex((obj => obj.Nombre == selected))
    casas = casas.filter(casa=>casa.id!=id)
    productos = productos.filter(producto=>producto.DeHogar!=selected)
    saveHogares(casas)
    if (casas.length != 0) {
      if (ind >= casas.length){
        ind = casas.length - 1
      }
      saveValue(casas[ind].Nombre)
      saveMessage(productos.filter(producto=> producto.DeHogar == casas[ind].Nombre))
    } else {
      saveMessage([])
    }
  }

  function editP(id) {
    saveEP(id)
    const temp = productos.filter(producto=>producto.id==id)[0]
    formik2.values.nombreProducto = temp.Nombre
    formik2.values.precio = temp.Precio
    formik2.values.Cantidad = temp.Cantidad
  }

  function delP(id) {
    productos = productos.filter(producto=>producto.id!=id)
    saveMessage(productos.filter(producto=>producto.DeHogar==selected))
  }

  const showMessage2 = () => {
    return casas.map((hogar,index)=>
    <div className="cardCasa flex justify-between" id={hogar.id}>
      <div>
        <div className="flex items-center">
          {/* {index == 0 ? (
            <input type="radio" name="hogarSeleccionado" value={hogar.Nombre} defaultChecked onChange={listProducts} />
          ): (
            <input type="radio" name="hogarSeleccionado" value={hogar.Nombre} onChange={listProducts}/>
          )} */}
          <input type="radio" name="hogarSeleccionado" value={hogar.Nombre} onChange={listProducts}/>
          <h5 className="ml-2">{hogar.Nombre}</h5>
        </div>
        <p>Dueño: {hogar.Creador}</p>
        <p>Habitantes: {hogar.Habitantes.length + 1}</p>
      </div>
      <div className="flex flex-col">
        <button className="m-1 text-white rounded-md bg-blue-700 p-2" onClick={()=>editH(hogar.id)}>Editar</button>
        <button className="m-1 text-white rounded-md bg-red-700 p-2" onClick={()=>delH(hogar.id)}>Eliminar</button>
      </div>
    </div>)
  }

  function listProducts(event) {
    saveValue(event.target.value)
    saveMessage(productos.filter(producto=> producto.DeHogar == event.target.value))
  }

  const showMessage = () => {
    return message.map((producto)=>
      <li className="flex justify-between">
        <div>
          <h5>{producto.Nombre}</h5>
          <p>Cantidad: {producto.Cantidad}</p>
          <p>Precio: ${producto.Precio}</p>
          <p>Asignado: {producto.Asignado ? producto.Asignado : "Nadie"}</p>
          <p>Status: {producto.Status ? "Comprado" : "Por comprar"}</p>
        </div>
        <div className="flex flex-col">
          <button className="m-1 text-white rounded-md bg-blue-700 p-2" onClick={()=>editP(producto.id)}>Editar</button>
          <button className="m-1 text-white rounded-md bg-red-700 p-2" onClick={()=>delP(producto.id)}>Eliminar</button>
        </div>
      </li>
    )
  }

  return (
    <Layout>
      <nav className="navbar bg-white flex items-center justify-between p-3">
        <a className="navbar-brand flex items-center" href="/">
          <img src="logo.png" alt="" width="58" height="58" />
          <strong className="ml-5" style={{"fontSize": "27px"}}>Leasy</strong>
        </a>
        <div>
          <a className="mr-5 text-white rounded-md bg-blue-700 p-3" href="login" role="button">Sign Out</a>
        </div>
      </nav>

      <br/>
      <br/>

      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <form onSubmit={formik.handleSubmit}>
              <input id="nombreHogar" type="text" value={formik.values.nombreHogar} placeholder="Ingresa el nombre" className="form-control"
              onChange={formik.handleChange} onBlur={formik.handleBlur} />
              <input className="log-in-btn btn btn-primary btn-lg" type="submit" value="Crear Casa" />
            </form>
            <br/>
            <h2>Casas</h2>
            {/* <a className="btn btn-primary btn-log" href="createCasa" role="button">Crear Casa</a> */}
            <br/>
            { message2 && showMessage2() }
          </div>

          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <h2>Lista Habitación</h2>
            <br/>
            <div id="target">
              { message && showMessage() }
            </div>
            <br/>
            <br/>
            <div className="addItem">
              <h2>Agregar Producto</h2>
              <form className="flex flex-col items-center" onSubmit={formik2.handleSubmit}>
                <label htmlFor="pNombre">Nombre:</label>
                <input id="nombreProducto" type="text" value={formik2.values.nombreProducto} placeholder="Ingresa el nombre" className="form-control"
                onChange={formik2.handleChange} onBlur={formik2.handleBlur} />
                <label htmlFor="pCantidad">Cantidad:</label>
                <input id="cantidad" type="number" value={formik2.values.cantidad} placeholder="Ingresa el nombre" className="form-control"
                onChange={formik2.handleChange} onBlur={formik2.handleBlur} />
                <label htmlFor="pPrec">Precio:</label>
                <input id="precio" type="number" value={formik2.values.precio} placeholder="Ingresa el nombre" className="form-control"
                onChange={formik2.handleChange} onBlur={formik2.handleBlur} />
                <input className="log-in-btn btn btn-primary btn-lg" type="submit" value="Agregar Producto" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}