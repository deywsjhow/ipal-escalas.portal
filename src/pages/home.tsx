import Header from "@/components/header"
import Card from "@/components/card"
import { ScalesAnyDate } from "./api/scale";
import { useEffect, useState } from "react";

import style from '@/styles/Card.module.css'


export default function Home(){
    type res = {
        errors: [],
        resultList:{

        },

        success: boolean
    }

const [apiData, setApiData] = useState<any>([]);



  useEffect(() => {
    const user = JSON.parse(atob(window.sessionStorage.getItem('auth') || '{}'))
    const token = 'bearer ' + user?.accessToken

    const values ={
        dateScaleInit: '2023-10-01',
        dateScaleFinish: '2023-11-30'
    }

   try{
    const data = ScalesAnyDate(values, token)
    data.then((value) => setApiData(value))
    .catch((error) => console.log(error)) 
   } catch(error){
    console.log(error)
   }
  }, []);

  const value = apiData?.resultList

    return (
        <>
            <Header />
            <div className="bg-blue items-center">
            <h1>Cartões Dinâmicos</h1>
                <div className={style.cards_container} >
                {Array.isArray(value) && value.length > 0 ? (
                value.map((data, index) => (
                <Card key={index} data={data} />
                    ))
        ) : (
          <p>Nenhum dado disponível.</p>
        )}
                </div>
            </div>
            
        </>
    )
}