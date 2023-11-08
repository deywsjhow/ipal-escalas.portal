


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
    
  