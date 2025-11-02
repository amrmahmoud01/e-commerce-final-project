"use server"
export default async function getOrders() {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/68c8611c9870426a39216216`
  );

  console.log("ORDERS:", res);

  return res;
}
