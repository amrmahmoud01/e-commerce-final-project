export default async function getCategoryProducts(catId: string) {
  let response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category[in]=${catId}`
  );
  let { data } = await response.json();
  return data;
}
