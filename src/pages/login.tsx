import Head from "next/head"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/router"


import { useFormik } from "formik"
import {HiOutlineUserCircle, HiFingerPrint} from "react-icons/hi"
import { toast } from "react-hot-toast"

import AuthLayout from "@/layout/authLayout"
import style from "../styles/FormAuth.module.css"
import LoginValidate  from "../lib/validate";
import { Authenticate } from "./api/auth"





export default function Login(){

    type AuthResponse = {      
        result: {
          userId: string,
          user: string,
          email: string,
          attribuation: string,
          loginType: number,
          nameType: string,
          accessToken: string
        }       
      }

    const [showValue, setShowValue] = useState(false)
    const router = useRouter()

    const formik = useFormik({
        initialValues:{
            user: "",
            password: ""
        },
        validate: LoginValidate,
        onSubmit
    })

    async function onSubmit(values: any){
        const auth ={
            user: values['user'],
            password: values['password']
        }

        const res = await Authenticate(auth)

        if(!res.success){
            toast.error(res?.errors[0]?.description)
            router.push('/login')
        }

        const authValue: AuthResponse = res.result        
        window.sessionStorage.setItem('auth', btoa(JSON.stringify(authValue)))
        router.push('/home')       
        
    }
    
    return(     
        <AuthLayout>           
            <Head>
                <title>Login</title>
            </Head>  
            <section className="w-3/4 mx-auto flex flex-col gap-10">
                <div className="title">
                    <h1 className="text-white text-4xl font-bold py-4">Ipal Escalas Portal </h1>
                    <p className="w-3/4 mx-auto text-gray-200">Portal de Escalas da Igreja Presbiteriana do Alto da Lapa</p>
                </div>

                <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
                    <div className={`${style.input_group} ${formik.errors.user && formik.touched.user ? 'border-rose-400' : ''}`}>
                        <input 
                        {...formik.getFieldProps('user')}
                        type="text"
                        name="user" 
                        placeholder="Usuário"
                        className={style.input_text}                       
                      
                        />
                        <span className="icon flex items-center px-4">
                            <HiOutlineUserCircle size={25}/>
                        </span>
                    </div>
                    {/* {formik.errors.user ? <span className="text-rose-600">{formik.errors.user}</span> : <></>} */}
                    <div className={`${style.input_group} ${formik.errors.password && formik.touched.password ? 'border-rose-400' : ''}`}>
                        <input 
                        {...formik.getFieldProps('password')}
                        type={`${showValue ? "text" : "password"}`}
                        name="password"
                        placeholder="Senha"
                        className={style.input_text}                       
                       
                        />
                        <span className="icon flex items-center px-4" onClick={() => setShowValue(!showValue)}>
                            <HiFingerPrint size={25}/>
                        </span>
                    </div>                    
                    <div className={style.button}>
                        <button type="submit">
                            Login
                        </button>                   
                    </div>
                    <p className="text-center text-gray-200">
                        Ainda não é cadastrado? <Link href={'/register'}><u>Cadastre-se</u></Link>
                    </p>
                </form>
            </section>        
        </AuthLayout>
    )
}