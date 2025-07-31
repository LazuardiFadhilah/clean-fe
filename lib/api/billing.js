const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export async function billing(payload) {
  const bookingID = localStorage.getItem("BookingID");
  const res = await fetch(`${BASE_URL}/billings/${bookingID}`, {
    method: "POST",
    headers: { "Content-Type": "application/json",
      Authorization:`Bearer ${localStorage.getItem("token")}`, // Tambahkan token jika diperlukan
     },
    body: JSON.stringify(payload),
    credentials: "include", // kalau kamu pakai cookie (opsional)
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Billing failed");
  console.log(data);
  return data;
}

