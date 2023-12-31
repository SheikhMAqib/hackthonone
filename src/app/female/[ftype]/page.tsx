import { oneProductType, responseType } from "@/components/utils/ProductsDataArrayAndType";
import Card from "@/components/views/Card";



async function fetchAllProductsData() {
    let res = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-06-07/data/query/production?query=*%5B_type%20%3D%3D%20%22products%22%20%26%26%20productTypes%5B0%5D%3D%3D%22Female%22%5D`,
        {
            next: {
                revalidate: 60
            }
        });

    if (!res.ok) {
        throw new Error("Failed to fetch")
    }

    return res.json();
}
const Female = async ({ params }: { params: { ftype: string } }) => {
    let res: responseType = await fetchAllProductsData()
    if (params.ftype !== "Female") {
        let orginalSortedDataOfParams = res.result.filter((items: oneProductType) => items.productTypes[1] === (params.ftype))
        res = { result: orginalSortedDataOfParams }
    }

    return (
        <div className="grid grid-cols-1 md:grid-col-2 py-10 content-center justify-center lg:grid-cols-3  gap-4">
            {res.result.map((items: oneProductType, index: number) => (
                <Card singleProductData={items} key={index} />
            ))}
        </div>
    )
}

export default Female