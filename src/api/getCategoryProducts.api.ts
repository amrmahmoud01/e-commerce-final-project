export default async function getCategoryProducts(catId: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category[in]=${catId}`
  );
  const { data } = await response.json();
  return data;
}
