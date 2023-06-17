import { oneProductType } from "@/components/utils/ProductsDataArrayAndType";
import { client } from "../../../../sanity/lib/client";
import Card from "@/components/views/Card";


async function getAllProductsForSearch() {
    let response = await client.fetch(`*[_type == "products"]`);
    return response;
}
const search = async ({ params }: { params: { query: string } }) => {
    let slug = (params.query).toLowerCase();
    let data = await getAllProductsForSearch()
    let dataToMap = await data.filter((item: oneProductType) => {
        console.log("LOG", (item.productName).toLowerCase().indexOf(slug));
        if ((item.productName.toLowerCase().indexOf(slug) >= 0)) {
            return true
        }
        return false
    });
    console.log(dataToMap, slug)
    return (
        <div className="grid grid-cols-1 md:grid-col-2 py-10 content-center justify-center lg:grid-cols-3  gap-4">
            {dataToMap && dataToMap.map((items: oneProductType, index: number) => (
                <Card singleProductData={items} key={index} />
            ))}
        </div>

    )
}

export default search













