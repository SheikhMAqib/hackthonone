import BASE_PATH_FORAPI from "@/components/shared/BasePath"
import { oneProductType, responseType } from "@/components/utils/ProductsDataArrayAndType"
import ProductDetail from "@/components/views/ProductDetail"
import ContextWrapper from "@/global/context"
import { Metadata } from "next";


export async function generateMetadata({ params, }: { params: { slug: string } }) {
    const slug = params.slug

    // fetch data
    const product = await fetch(`https://q854vsap.api.sanity.io/v2023-06-07/data/query=*[-type == 'products']`).then((res: any) => res.json());
    const titleToSet: oneProductType = product.result.find((item: oneProductType) => item.slug === slug)
    console.log(titleToSet)
    return {
        title: "titleToSet.productName",
        description: "titleToSet.description",
    }

    async function fetchPreviewData(slug: string) {
        let res = await fetch(`https://q854vsap.api.sanity.io/v2023-06-07/data/query/production?query=*%5B_type%20%3D%3D%20%22products%22%20%26%26%20slug.current%3D%3D%22${slug}%22%5D`)
        return res.json()
    };

    async function generateStaticParams() {
        let res = await fetch(`https://q854vsap.api.sanity.io/v2023-06-07/data/query=*[_type == 'products']`).then((res: any) => res.json());
        return res.result.map((item: oneProductType) => { slug: item.slug });

    }
}
const Catalog = async ({ params }: { params: { slug: string } }) => {
    let data: responseType = await fetchPreviewData(params.slug)
    return (
        <div>
            <ContextWrapper>
                <ProductDetail item={data.result[0]} />
            </ContextWrapper>
        </div>
    )
}
// 23.22 class 21
export default Catalog