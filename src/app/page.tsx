import Image from "next/image";
import { Metadata } from "next";
import MainSlider from "./_components/MainSlider/MainSlider";
import CategorySlider from "./_components/CategorySlider/CategorySlider";
import AllProducts from "./_components/AllProducts/AllProducts";

export const metadata: Metadata = {
  title: "FreshCart | Home",
  description:
    "Welcome to FreshCart - Your one-stop shop for fresh and quality products",
};

export default function Home() {
  return (
    <>
      <MainSlider />
      <CategorySlider />
      <AllProducts />
    </>
  );
}
