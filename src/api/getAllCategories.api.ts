export default async function getAllCategories() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const { data } = await response.json();
  console.log(data);

  return data;
}
