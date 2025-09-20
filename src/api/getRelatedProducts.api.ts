export default async function getRelatedProducts(id: string) {
  let response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?limit=5&category[in]=${id}`
  );
  console.log("response");
  let { data } = await response.json();
  return data;
}
