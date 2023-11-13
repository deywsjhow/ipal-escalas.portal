import { useEffect, useState } from "react";
import { startOfMonth, endOfMonth, addMonths, format } from 'date-fns';
import { useFormik } from "formik";


import Header from "@/components/header"
import Card from "@/components/card"
import { ScalesAnyDate } from "./api/scale";
import style from '@/styles/ScrollBar.module.css'



export default function Home(){
    
    const formik = useFormik({
        initialValues:{
            dateScaleInit: "",
            dateScaleFinish: ""
        },
        onSubmit
    })

    async function onSubmit(values:any) {
        const dates ={
            dateScaleInit: values['dateScaleInit'],
            dateScaleFinish: values['dateScaleFinish']
        }

        console.log(dates)
        
    }

const [apiData, setApiData] = useState<any>([]);



  useEffect(() => {
    const user = JSON.parse(atob(window.sessionStorage.getItem('auth') || '{}'))
    const token = 'bearer ' + user?.accessToken

    const formatData = 'yyyy-MM-dd';
    const valuesDate = {
        dateScaleInit: format(startOfMonth(new Date()), formatData),
        dateScaleFinish: format(endOfMonth(addMonths(new Date(), 1)), formatData)
    }

   try{
    const data = ScalesAnyDate(valuesDate, token)
    data.then((value) => setApiData(value))
    .catch((error) => console.log(error)) 
   } catch(error){
    console.log(error)
   }
  }, []); 

  return (
    <>
      <Header />
      <div className="flex h-screen bg-white-900">
        <div className="m-auto bg-slate-50 rounded-md w-full h-full flex">
          <div className="lg:w-2/5 h-full p-8">
            <div className="flex flex-col justify-between h-full">
              <div className="text-center py-10">
                <form onSubmit={formik.handleSubmit} className="mb-8">
                  <div className="mb-4">
                    <label htmlFor="dateScaleInit" className="block text-gray-700 text-sm font-bold mb-2">
                      Data de Início:
                    </label>
                    <input
                      {...formik.getFieldProps('dateScaleInit')}
                      type="date"
                      name="dateScaleInit"
                      id="dateScaleInit"
                      className="border rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline appearance-none text-s"
                      placeholder="Selecione a Data de Início."
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="dateScaleFinish" className="block text-gray-700 text-sm font-bold mb-2">
                      Data de Fim:
                    </label>
                    <input
                      {...formik.getFieldProps('dateScaleFinish')}
                      type="date"
                      name="dateScaleFinish"
                      id="dateScaleFinish"
                      className="border rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline appearance-none text-s"
                      placeholder="Selecione a Data de Fim."
                    />
                  </div>
                  <div className="mb-4">
                    <button
                      type="submit"
                      className="bg-blue-900/75 hover:bg-blue-900 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline w-52"
                    >
                      Enviar
                    </button>
                  </div>
                </form>  
                <div className={`${style.scroll_container} overflow-y-auto max-h-[500px] space-y-4`}>
                  {Array.isArray(apiData?.resultList) && apiData?.resultList.length > 0 ? (
                    apiData?.resultList.map((data: any, index: any) => (
                      <Card key={index} data={data} />
                    ))
                  ) : (
                    <p>Nenhum dado disponível.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-3/5 flex items-center justify-center">
            <h2>Data</h2>
          </div>
        </div>
      </div>
    </>
  );
  
}