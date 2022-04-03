export async function register(payload: { username: string; password: string }) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const res = await response.json();
    return res.statusCode;
  } catch (error: any) {
    throw new Error(error);
  }
}
