const key = process.env.WOOCOMMERCE_API_KEY!;
const secret = process.env.WOOCOMMERCE_API_SECRET!;
const baseUrl = process.env.WOOCOMMERCE_URL!;

const authHeader = 'Basic ' + Buffer.from(`${key}:${secret}`).toString('base64');

export async function createWooUser(data: {
  email: string;
  first_name?: string;
  last_name?: string;
}) {
  const res = await fetch(`${baseUrl}/wp-json/wc/v3/customers`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Fehler beim Anlegen des Benutzers');
  return json;
}
