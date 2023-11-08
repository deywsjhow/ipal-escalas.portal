import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import {HiOutlineUserCircle, HiFingerPrint, HiOutlineMail, HiPencil} from "react-icons/hi"
import { useFormik } from "formik"

import AuthLayout from "@/layout/authLayout";
import style from "../styles/RegisterForm.module.css"
import { RegisterValidate }  from "../lib/validate";
import { UserRegister } from "./api/auth";
import toast from "react-hot-toast";
import router from "next/router";

export default function Register(){

    const [show, setShow] = useState({password:false, cpassword: false})


    const formik = useFormik({
        initialValues:{
            user: "",
            password: "",
            cpassword: "",
            email: "",
            attribuation: ""
        },
        validate: RegisterValidate,
        onSubmit
    })

    
    async function onSubmit(values: any){
        const reg ={
            user: values['user'],
            password: values['password'],
            cpassword: values['cpassword'],
            email: values['email'],
            attribuation: values['attribuation']
        }

        const res = await UserRegister(reg);

        console.log(res)

        if(!res.success){
            toast.error(res?.errors[0]?.description)
            router.push('/register')
        }

        toast.success('Usuário cadastrado com sucesso!!')
        router.push('/login')
    }
    
    return(     
        <AuthLayout> 
            <Head>
                <title>Register</title>
            </Head>    
            <section className="w-3/4 mx-auto flex flex-col gap-10">
                <div className="title">
                    <h1 className="text-white text-4xl font-bold py-4">Registrar</h1>
                </div>

                <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
                    <div className={style.input_group}>
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
                    {formik.errors.user ? <span className="text-white text-xs">{formik.errors.user}</span> : <></>}
                    <div className={style.input_group}>
                        <input 
                        {...formik.getFieldProps('password')} 
                        type={`${show.password ? "text" : "password"}`}
                        name="password"
                        placeholder="Senha"
                        className={style.input_text}
                        />
                        <span className="icon flex items-center px-4" onClick={() => setShow({...show, password:!show.password})}>
                            <HiFingerPrint size={25}/>
                        </span>                      
                    </div>
                    {formik.errors.password ? <span className="text-white text-xs">{formik.errors.password}</span> : <></>}
                    <div className={style.input_group}>
                        <input
                        {...formik.getFieldProps('cpassword')}  
                        type={`${show.cpassword ? "text" : "password"}`}
                        name="cpassword"
                        placeholder="Confirmar Senha"
                        className={style.input_text}
                        />
                        <span className="icon flex items-center px-4" onClick={() => setShow({...show, cpassword:!show.cpassword})}>
                            <HiFingerPrint size={25}/>
                        </span>                             
                    </div> 
                    {formik.errors.cpassword ? <span className="text-white text-xs">{formik.errors.cpassword}</span> : <></>}                             
                    <div className={style.input_group}>
                        <input
                        {...formik.getFieldProps('email')}  
                        type="email"
                        name="email"
                        placeholder="Email"
                        className={style.input_text}
                        />
                        <span className="icon flex items-center px-4">
                            <HiOutlineMail size={25}/>
                        </span>                                   
                    </div>
                    {formik.errors.email ? <span className="text-white text-xs">{formik.errors.email}</span> : <></>}                    
                    <div className={style.input_group}>
                        <input
                        {...formik.getFieldProps('attribuation')} 
                        type="text"
                        name="attribuation"
                        placeholder="Atribuição ex: Musico, Diacono etc.."
                        className={style.input_text}
                        />
                         <span className="icon flex items-center px-4">
                            <HiPencil size={25}/>
                        </span>                                  
                    </div>
                    {formik.errors.attribuation ? <span className="text-white text-xs">{formik.errors.attribuation}</span> : <></>}                  
                    <div className={style.button}>
                        <button type="submit">
                            Registrar
                        </button>                                 
                    </div>  
                    <p className="text-center text-gray-200">
                        Ja é cadastrado? <Link href={'/login'}><u>Login</u></Link>
                    </p>                    
                </form>
            </section>        
        </AuthLayout>
    )
}