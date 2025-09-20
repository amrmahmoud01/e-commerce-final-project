export default async function getAllCategories() {
  let response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  let { data } = await response.json();
  console.log(data);

  return data;
}
