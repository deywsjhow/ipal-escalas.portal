
export default function validUserType(data: any){
    if(data != null){
        if(data.loginType == 1)
            return data.loginType
    } else {
        return data.loginType/* Tipo Padrão de usuário do portal */
    }
}