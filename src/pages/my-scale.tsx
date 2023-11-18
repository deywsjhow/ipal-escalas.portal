import { useEffect, useState } from "react";
import { startOfMonth, endOfMonth, addMonths, format } from 'date-fns';



import Header from "@/components/header"
import Card from "@/components/card"
import {ScalesForUser } from "./api/scale";
import style from '@/styles/ScrollBar.module.css'
import toast from "react-hot-toast";
import { GetSundays3MonthsNoReactSelect } from "@/lib/GetSundays";



export default function Home(){

  const [apiData, setApiData] = useState<any>([]);

  //chamada quando abre a tela -- padrão.
  useEffect(() => {
    const fetchData = async () => {
        const user = JSON.parse(atob(window.sessionStorage.getItem('auth') || '{}'))
        const token = user?.accessToken ;
        const userRequest = user?.user;

        const dates = GetSundays3MonthsNoReactSelect();

          //VALORES CHAMADA PADRÃO - 2 MESES
        const Request = {
            user: userRequest,
            dateScaleInit: dates.start,
            dateScaleFinish: dates.end
        }   

        try{
          const data = await ScalesForUser(Request, token)

          if(data != null){
            setApiData(data)
          }
          else
          {
            return toast.error("Houve um problema. Faça Login novamente")
          }
        } catch(error){
          console.log(error)
        }
    };  

    fetchData();
  }, []); 
  
  return (
    <>
      <Header />      
      <div className="flex h-screen bg-white-900">
        <div className="m-auto bg-slate-50 rounded-md w-full h-full flex">
          <div className="w-screen h-full p-8 items-center">
            <div className={`${style.scroll_container} overflow-y-auto max-h-[700px] space-y-4`}>
                    {Array.isArray(apiData?.resultList) && apiData?.resultList.length > 0 ? (
                         apiData?.resultList.map((data: any, index: any) => (
                           <Card key={index} data={data} />
                         ))
                          ) : 
                         (
                            <p>Nenhuma escala disponível.</p>
                         )
                    }                 
            </div>
          </div>                      
        </div>
      </div>
    </>
  );
  
}