export default async function getSpecificBrandProducts(brandId: string) {
  let response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`
  );
  let { data } = await response.json();
  return data;  
}
