export default function LoginValidate(values: any){
    const errors: any = {};

    //user validation
    if(!values.user){
        errors.user = 'Required';
    } 
    else if(values.user.length < 3 || values.user.length > 12){
        errors.user = "O usuário deve ter no minimo 3 caracteres ou no máximo 12 caracteres.";
    }
    //password validation

    if(!values.password){
        errors.password = "Required"
    } 
    else if(values.password.length < 8 || values.password.length > 15){
        errors.password = "Senha deve ter no mínimo 8 caracteres ou no máximo 12 caracteres";
    } 
    else if(values.password.includes(" ")){
        errors.password = "Senha inválida";
    }
    return errors;
}


export function RegisterValidate(values: any){
    const errors: any = {};

    //user validate
    if(!values.user){
        errors.user = 'Required';
    } 
    else if(values.user.length < 3 || values.user.length > 12){
        errors.user = "O usuário deve ter no minimo 3 caracteres ou no máximo 12 caracteres.";
    }

    //password validation

    if(!values.password){
        errors.password = "Required"
    } 
    else if(values.password.length < 8 || values.password.length > 15){
        errors.password = "Senha deve ter no mínimo 8 caracteres ou no máximo 12 caracteres";
    } 
    else if(values.password.includes(" ")){
        errors.password = "Senha inválida";
    }

    //cpassword validate
    if(!values.cpassword){
        errors.cpassword = "Required"
    } else if(values.password !== values.cpassword){
        errors.cpassword = "Confirmação de senha diferente da senha."
    } else if(values.cpassword.includes(" ")){
        errors.cpassword = "Confirmação de Senha inválida";
    }

    //email validate
    if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Email Invalido';
      }

      //attribuation validate
      if(!values.attribuation){
        errors.attribuation = "Required"
    }     
    else if(values.attribuation.includes(" ")){
        errors.attribuation = "Atribuição inválida";
    }

    return errors;
}