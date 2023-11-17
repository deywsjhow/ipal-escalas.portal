export async function ScalesAnyDate(value: any, token: string) {
    const res = await fetch('https://localhost:5001/scale/v1/datescale', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(value),
    })
   
    const data = await res.json()
   
    return data;
  }


  export async function RegiterScale(value: any, token: string) {
    const res = await fetch('https://localhost:5001/scale/v1/registerscale', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + token
      },
      body: JSON.stringify(value),
    })
   
    const data = await res.json()
   
    return data;
  }


  
  export async function ScalesForUser(value: any, token: string) {
    const res = await fetch('https://localhost:5001/scale/v1/userscale', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + token
      },
      body: JSON.stringify(value),
    })
   
    const data = await res.json()
   
    return data;
  }