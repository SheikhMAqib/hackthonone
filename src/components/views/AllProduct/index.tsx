"use client"
import BASE_PATH_FORAPI from "@/components/shared/BasePath";
import { oneProductType } from "@/components/utils/ProductsDataArrayAndType";
import { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../Card";

interface propsType {
    productArray: Array<oneProductType>
}

export default class AllProductsCompo extends Component<{ ProductData: propsType }> {
    start: number = 10;
    end: number = 20;
    state: { items: Array<oneProductType>, hasMore: boolean } = {
        items: [...this.props.ProductData.productArray],
        hasMore: true,
    }

    fetchDataFromALIGradually = async (start: number, end: number) => {
        const res = await fetch(`${BASE_PATH_FORAPI}/api/products?start=${start}&end=${end}`);
        const dataToCheckAndSend = await res.json()
        if (dataToCheckAndSend.productArray === "Not Found") {
            this.setState({ hasMore: false })
        }
        return dataToCheckAndSend;
    }

    getData = async () => {
        let allToGether = await this.fetchDataFromALIGradually(this.start, this.end);

        if (allToGether.productArray !== "Not Found") {
            this.setState({
                items: this.state.items.concat(allToGether.productArray)
            })
        } else {
            this.setState({
                hasMore: false,
            })
        }
        this.start = this.start + 10;
        this.end = this.end + 10;
    }
    render() {
        return (

            <InfiniteScroll
                dataLength={this.state.items.length}
                next={this.getData}
                hasMore={this.state.hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }

                className="grid grid-cols-1 md:grid-col-2 py-10 content-center justify-center lg:grid-cols-3  gap-4"
            >
                {/* this.state.items.length !== 0 || !this.state &&  */}
                {this.state.items.map((item: oneProductType, index: number) => (
                    <Card singleProductData={item} key={index} />
                ))}
            </InfiniteScroll>
        )
    }

}
