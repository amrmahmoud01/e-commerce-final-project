export default async function getRelatedProducts(id: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?limit=5&category[in]=${id}`
  );
  console.log("response");
  const { data } = await response.json();
  return data;
}
