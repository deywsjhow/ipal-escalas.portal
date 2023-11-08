import style from '../styles/AuthLayout.module.css'


export default function AuthLayout({children}: any){
    return(
        <div className="flex h-screen bg-white-900">
            <div className="m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2">
                <div className={style.imgStyle}>
                    <div className={style.logoImg}></div>
                </div>
                <div className="right flex flex-col justify-evenly bg-blue-900/75">
                    <div className="text-center py-10 ">                    
                        {children}
                    </div> 
                </div>            
            </div> 
            
        </div>     
    )
}