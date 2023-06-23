import CartComp from "@/components/views/CartParent/cartChild"
import ContextWrapper from "@/global/context"


async function fetchAllStoreProduct() {
    let res = await fetch(`https://q854vsap.api.sanity.io/v2023-05-26/data/query/production?query=*[_type == 'products']`, {
        cache: "no-store",
    })
    return res.json()
};


const Cart = async () => {
    let allProductsOfStore = await fetchAllStoreProduct()  // all product sanity

    return (
        <ContextWrapper>
            {/* @ts-ignore */}
            <CartComp allProductsOfStore={allProductsOfStore} />
        </ContextWrapper>
    )
}

export default Cart