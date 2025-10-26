import getProducts from "@/api/products.api";
import SingleProduct from "../SingleProduct/SingleProduct";
import { ProductType } from "@/types/product.type";
import getWishlist from "@/api/getWishlist.api";

export default async function AllProducts() {

  const data = await getProducts();

  return (
    <div className=" container mx-auto w-[80%] flex flex-wrap my-12">
      {data.map((currentProduct: ProductType) => (
        <SingleProduct
          product={currentProduct}
          key={currentProduct._id}
          // wishlist={wishlist}
        />
      ))}
    </div>
  );
}
