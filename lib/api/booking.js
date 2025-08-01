const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
// const BASE_URL = "http://localhost:3000/api";

export async function booking(payload) {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json",
      Authorization:`Bearer ${localStorage.getItem("token")}`, // Tambahkan token jika diperlukan
     },
    body: JSON.stringify(payload),
    credentials: "include", // kalau kamu pakai cookie (opsional)
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Booking failed");
  localStorage.setItem("BookingID", data.data.id); // Simpan ID booking ke localStorage
  console.log("Booking ID", localStorage.getItem("BookingID"));

  console.log(data);
  return data;
}

export async function updateBooking(id, payload) {
  const bookingID = localStorage.getItem("BookingID");
  const res = await fetch(`${BASE_URL}/bookings/${bookingID}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json",
        Authorization:`Bearer ${localStorage.getItem("token")}`, // Tambahkan token jika diperlukan
     },
    body: JSON.stringify(payload),
    credentials: "include", // kalau kamu pakai cookie (opsional)
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Update booking failed");
  
  console.log("Booking updated:", data);
  return data;
}
