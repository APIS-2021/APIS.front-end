import { React,useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';

const NUEVO_USUSARIO = gql`
mutation NuevoUsuario($input: UsuarioCompletoInput!) {
  nuevoUsuario(input: $input) {
    id
    Nombre
  }
}
`;

export default function Home() {

  // Mensaje de usuario ya creado
  const [message, saveMessage] = useState(null);
  // Crear usuario
  const [ nuevoUsuario ] = useMutation(NUEVO_USUSARIO);
  // Router
  const router = useRouter();

  // Formulario
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      password2: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Ingrese un usuario.').min(4, 'El usuario debe tener 4 caracteres minimo'),
      password: Yup.string().required('Ingrese una contraseña.').min(4, 'La contraseña debe tener 4 caracteres minimo'),
      password2: Yup.string().oneOf([Yup.ref('password'),null],'Las contraseñas deben de ser iguales.')
    }),
    onSubmit: async values => {
      const {username,password} = values;
      const usuario = {
        variables: {
          input: {
            Nombre: username,
            Password: password
          }
        }
      }
      console.log(usuario);
      try{
        await nuevoUsuario(usuario);
        // Mensaje de usuario creado
        saveMessage('Usuario creado.');
        setTimeout(()=>{
          router.push('/login')
        }, 3000);
      } catch (error) {
        saveMessage(error.message.replace("GraphQL error: ",""));
        console.log(error)

        setTimeout(() => {
          saveMessage(null)
        }, 7000);
      }
    }
  });

  const showMessage = () => {
    return(
      <p>{message}</p>
    )
  }

  return (
    <Layout>
      <div className="logincontainer flex flex-col items-center border-4 border-black border-opacity-50 max-w-md bg-white">
        <a className="flex flex-col items-center m-3" href="/">
          <img id="logo-pic" src="logo.png" alt="logo" />
        </a>
        <div className="mb-10">
          <a className="text-white rounded-md bg-blue-700 p-3" href="login" role="button">LOG IN</a>
        </div>

        <form className="mb-10 w-full flex flex-col items-center" onSubmit={formik.handleSubmit}>
          { message && showMessage() }
          <div className="mb-3 signup-text w-3/4 flex flex-col">
            <label className="{styles.label}" htmlFor="username">Usuario</label>
            <input id="username" type="text" value={formik.values.username} placeholder="Ingresa tu username" className="form-control"
            onChange={formik.handleChange} onBlur={formik.handleBlur} />
          </div>
          { formik.touched.username && formik.errors.username ? (
            <p className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">{formik.errors.username}</p>
          ) : null }
          <div className="mb-3 signup-text w-3/4 flex flex-col">
            <label className="{styles.label}" htmlFor="password">Contraseña</label>
            <input id="password" type="password" value={formik.values.password} placeholder="Ingresa tu contraseña" className="form-control"
            onChange={formik.handleChange} onBlur={formik.handleBlur} />
          </div>
          { formik.touched.password && formik.errors.password ? (
            <p className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">{formik.errors.password}</p>
          ) : null }
          <div className="mb-3 signup-text w-3/4 flex flex-col">
            <label className="{styles.label}" htmlFor="password2">Confirmar contraseña</label>
            <input id="password2" type="password" value={formik.values.password2} placeholder="Repite tu contraseña" className="form-control"
            onChange={formik.handleChange} onBlur={formik.handleBlur} />
          </div>
          { formik.touched.password2 && formik.errors.password2 ? (
            <p className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">{formik.errors.password2}</p>
          ) : null }
          <input className="log-in-btn btn btn-primary btn-lg" type="submit" value="Sign up" />
        </form>
      </div>
    </Layout>
  )
}