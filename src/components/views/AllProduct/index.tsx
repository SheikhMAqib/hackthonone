"use client"
import { oneProductType } from "@/components/utils/ProductsDataArrayAndType";
import { Component } from "react";

// interface propsType {
//     ProductArray: Array<oneProductType>
// }

export default class AllProductsCompo extends Component<{ ProductData: Array<oneProductType> }> {

    getData = () => {
        console.log(this.props.ProductData)

    }
    render() {
        return (
            <div onClick={this.getData}>sss </div>

        )
    }

}
