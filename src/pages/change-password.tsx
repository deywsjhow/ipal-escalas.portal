import route from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";

import Header from "@/components/header";
import { ChangePass } from "./api/auth";

export default function ChangePassword() {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const user = JSON.parse(atob(window.sessionStorage.getItem('auth') || '{}'));
    setUser(user);
  }, []);

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Senha atual é obrigatória")
    .min(8, "A nova senha deve ter pelo menos 8 caracteres"),
    newPassword: Yup.string().required("Nova senha é obrigatória")
      .matches(/[A-Z]/, "A nova senha deve conter pelo menos uma letra maiúscula")
      .matches(/[a-z]/, "A nova senha deve conter pelo menos uma letra minúscula")
      .matches(/\d/, "A nova senha deve conter pelo menos um número")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "A nova senha deve conter pelo menos um caractere especial")
      .min(8, "A nova senha deve ter pelo menos 8 caracteres"),
    confirmNewPassword:  Yup.string()
    .oneOf([Yup.ref("newPassword")], "Senhas devem coincidir")
    .required("Confirmação de senha é obrigatória"),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema,
    onSubmit
  });

  async function onSubmit(values: any) {

    const valuesPass = {
      seql_User: user.userId,
      password: values['newPassword'],
      oldPassword: values['currentPassword']
    }

    const data = await ChangePass(valuesPass, user.accessToken)

    if(data != null){
      if(data.success){
        route.push('/home')   
        return toast.success("Senha alterada com successo")
      } else{
        formik.resetForm()
        return toast.error(data?.errors[0]?.description)    
        
      }
    }
  }
    
  const { values, handleChange, handleBlur, handleSubmit, touched, errors } = formik;
  
  return (
    <>
      <Header />
      <Toaster 
        position="top-center"
        toastOptions={{
            duration: 6000,                          
            error: {
                duration: 6000,
                style: {
                    background: 'white',
                    color: 'red',
                    textAlign: 'left'
                }
            }

         }}
      />
      <div className="flex flex-col sm:flex-row items-center justify-center h-screen">
        <div className="text-center mb-4 sm:mr-8 sm:mb-0">
          <h2 className="text-2xl font-bold mb-4">Altere sua Senha</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="password"
                name="currentPassword"
                placeholder="Senha Atual"
                value={values.currentPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className='border p-2 m-2 w-72'
              />
              {touched.currentPassword && errors.currentPassword && (
                <div className="text-red-500">{errors.currentPassword as string}</div>
              )}
            </div>

            <div>
              <input
                type="password"
                name="newPassword"
                placeholder="Nova Senha"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className='border p-2 m-2 w-72' 
              />
              {touched.newPassword && errors.newPassword && (
                <div className="text-red-500">{errors.newPassword as string}</div>
              )}
            </div>

            <div>
              <input
                type="password"
                name="confirmNewPassword"
                placeholder="Confirmação de Senha"
                value={values.confirmNewPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className='border p-2 m-2 w-72'
              />
              {touched.confirmNewPassword && errors.confirmNewPassword && (
                <div className="text-red-500">{errors.confirmNewPassword as string}</div>
              )}
            </div>     
            <button
              type="submit"
              className={`bg-blue-900/75 text-white p-2 w-72 ${errors.confirmNewPassword ? 'cursor-not-allowed opacity-50' : ''}`}
              disabled={errors.confirmNewPassword ? true : false}
            >
              Trocar Senha
            </button>
          </form>
        </div>        
      </div>
    </>
  );
}
