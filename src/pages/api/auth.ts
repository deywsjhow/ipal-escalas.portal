  export async function Authenticate(value: any) {
    const res = await fetch('https://localhost:5001/auth/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    })
   
    const data = await res.json()
   
    return data;
  }

  export async function UserRegister(value: any){
    const res = await fetch('https://localhost:5001/auth/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    })

    const data = await res.json()
   
    return data;
  }

  export async function ChangePass(value: any, token: string){
    const res = await fetch('https://localhost:5001/auth/v1/changepassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer '+ token
      },
      body: JSON.stringify(value),
    })

    const data = await res.json()
       
    return data;
  }
    
  