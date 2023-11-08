type AuthResponse = {
    errors: [],
    result: {
      userId: string,
      user: string,
      email: string,
      attribuation: string,
      loginType: number,
      nameType: string,
      accessToken: string
    },
    success: boolean

  }


  export async function Authenticate(value: any) {
    const res = await fetch('https://localhost:5001/auth/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    })
   
    const data: AuthResponse = await res.json()
   
    return data;
  }
    
  