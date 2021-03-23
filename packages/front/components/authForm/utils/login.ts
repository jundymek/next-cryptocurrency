export async function login(payload: { username: string; password: string }) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const { token } = await response.json();
    if (response.status !== 200 && response.status !== 404) {
      return response.status;
    } else {
      localStorage.setItem('token', token);
      localStorage.setItem('username', payload.username);
      return response.status;
    }
  } catch (error) {
    console.log(error);
    return;
  }
}
