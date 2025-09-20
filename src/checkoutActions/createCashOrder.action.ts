import getMyToken from "@/utilities/getMyToken";

export default async function createCashOrder(cartId: string, formValues) {
  const token = await getMyToken();
  if (token) {
    let res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      {
        method: "POST",
        headers: { token, "Content-Type": "application/json" },
        body: JSON.stringify({ shippingAddress: formValues }),
      }
    );
    let payload = res.json();
    return payload;
  } else {
    throw new Error("Please login");
  }
}
