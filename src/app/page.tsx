import BASE_PATH_FORAPI from "@/components/shared/Wrapper/BasePath";
import Hero from "@/components/views/Hero";
import ProductCarousel from "@/components/views/ProductCarousoal";
import ProductsType from "@/components/views/ProductTypes";



async function fetchAllProductData() {
  // let res = await fetch(`${BASE_PATH_FORAPI}/api/products`)
  // if (!res.ok) {
  //   throw new Error("Failed to fetch ");

  // }
  // return res.json();
  return { response: "hi" }
}

export default async function Home() {
  let { response } = await fetchAllProductData();

  return <div>
    <Hero />
    <ProductsType />
    <ProductCarousel ProductData={response} />
  </div>;
}
