"use client"

import ContextWrapper from "@/global/context"
import SubCom from "./comp/SubCom"

const TopLabel = () => {

    return (
        <ContextWrapper>
            <div className="overflow-hidden border-b bg-gray-800 text-gray-100">
                <div className="px-4 max-w-7xl mx-auto flex justify-between items-center">
                    <div>
                        <p><img src="https://readme-typing-svg.demolab.com?font=Maven_Pro&weight=200&size=19&pause=1000&vCenter=true&width=435&lines=Here+to+provide+you+with+best+services;Signup+to+understand+our+policies;SignUp+to+get+big+deals;Nice+to+meet+you;Here+to+provide+you+with+best+services;Find+variety+of+different+products" alt="Typing SVG" /></p>
                    </div>
                    <SubCom />
                </div>
            </div>
        </ContextWrapper>
    )
}

export default TopLabel