
import SignUp from "@/components/views/SignUp";
import ContextWrapper from "@/global/context";


const SignUpAuth = () => {
    return (
        <ContextWrapper>
            <SignUp />
        </ContextWrapper>
    );
};

export default SignUpAuth;