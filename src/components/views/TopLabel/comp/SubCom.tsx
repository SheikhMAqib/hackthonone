import { useContext, useState } from "react"
import { cartContext } from "@/global/context"
import Link from "next/link"
import Image from "next/image"
import { AiOutlineClose } from "react-icons/ai"
import { sendEmailVerification } from "firebase/auth"
import { Fascinate } from "next/font/google"

const SubCom = () => {
    let { userData, LogOut, sendEmailVerificationCode, updateUserNamePhoto, loading } = useContext(cartContext)
    const [isSideProfileOpen, setSideProfileOpen] = useState(false)
    const [isUserEditingName, setUserEditingName] = useState(false)
    const [nameOf, setNameOf] = useState("")
    let name = userData?.displayName;

    function handelEditName() {
        console.log("i am going to  call update user function ")
        updateUserNamePhoto(nameOf);
        setUserEditingName(false);
        window.location.reload();
    }


    return (
        <div className="overflow-hidden">
            {userData ?
                <div onClick={() => setSideProfileOpen(true)} className="cursor-pointer mr-4 md:mr-0 w-8 h-8 rounded-full flex items-center justify-center bg-white text-gray-700  ">
                    {userData.photoUrl ?
                        <Image className="object-cover" width={300} height={300} src={userData.photoUrl} alt={userData.displayName} />
                        : userData.displayName ?
                            <p className="text-sm">{userData.displayName.slice(0, 1)}</p>
                            :
                            <p className="text-sm">N</p>
                    }
                </div>
                :
                <div className="flex gap-2">
                    <Link href={"/signup"} className="text-white bg-gray-900 border px-3 py-1" >SignUp</Link>
                    <Link href={"/signin"} className="text-white border-purple-800 border px-3 py-1" >SignIn</Link>
                </div>
            }
            <div className={`${isSideProfileOpen ? "visible translate-y-0" : "invisible -translate-y-full"}duration-500 py-4 px-4 w- md:w-80 bg-gray-800 h-full  text-gray-100 absolute right-0 top-0 bottom-0 z-50`}>
                <div className="flex justify-between py-2 items-center">
                    <h6 className="font-semibold text-xl" >Profile</h6>
                    <div className="cursor-pointer" onClick={() => setSideProfileOpen(false)}>
                        <AiOutlineClose size={26} />
                    </div>
                </div>
                {userData && (
                    <div className="text-center py-2 text-gray-200">
                        {loading &&
                            <div>Loadin....</div>
                        }
                        {isUserEditingName && (<div className="flex">
                            <input
                                value={nameOf}
                                onChange={(e) => setNameOf(e.target.value)}
                                type="text" className=" text-gray-800 w-full outline-gray-300 rounded-l-m hover:outline-purple-600" />
                            <button onClick={handelEditName} className="rounded-r-md py-1 px-2 bg-purple-600">Done</button>
                        </div>)}
                        <h3 className="text-xl font-semibold"><b>Name:</b>{name ? name : "Not setted"}</h3>
                        {!name && (
                            <button className="underline text-blue-600 text-sm" onClick={() => setUserEditingName(true)}>
                                Edit Name
                            </button>

                        )}
                        <h4 className="text-lg"><b>Email:</b>{userData.email}</h4>
                        <p className="text-sm"><b>Is Email Verified:</b>{userData.emailVerified ? "Verified" : "UnVerified"}</p>
                        <button className="underline text-blue-600 text-sm" onClick={sendEmailVerificationCode}>
                            Verify Email
                        </button>
                        <p className="py-2 text-xs text-red-600 font-light">Please check you inbox after Clicking Verify Email </p>
                        <p className="py-2 text-xs text-red-600 font-light">If changes did not reflected please refresh </p>
                        <button className="w-full border rounded-lg p-2" onClick={LogOut}>
                            Log Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SubCom