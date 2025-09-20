import Image from "next/image";

// import styles bundle

import MainSlider from "./_components/MainSlider/MainSlider";
import CategorySlider from "./_components/CategorySlider/CategorySlider";
import AllProducts from "./_components/AllProducts/AllProducts";

export default function Home() {
  return (
    <>
      <MainSlider />
      <CategorySlider />
      <AllProducts />
    </>
  );
}
