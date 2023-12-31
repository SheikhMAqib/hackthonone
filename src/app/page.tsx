import { responseType } from "@/components/utils/ProductsDataArrayAndType";
import Hero from "@/components/views/Hero";
import Jewellery from "@/components/views/Jewellery";
import Newslatter from "@/components/views/Newsletter";
import ProductCarousel from "@/components/views/ProductCarousoal";
import ProductsType from "@/components/views/ProductTypes";



async function fetchAllProductsData() {
  let res = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-06-07/data/query/production?query=*%5B_type%20%3D%3D%20%22products%22%20%5D%0A%0A%0A%0A%20`, {
    next: {
      revalidate: 60
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch")
  }

  return res.json();
}

export default async function Home() {
  let { result }: responseType = await fetchAllProductsData();

  return (
    <div className="overflow-hidden">
      <Hero />
      <ProductsType />
      <ProductCarousel ProductData={result} />
      <Jewellery />
      <Newslatter />
    </div>
  )
}
