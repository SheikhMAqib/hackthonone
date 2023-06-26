
import SignupFormComp from "@/components/views/signup";
import ContextWrapper from "@/global/context";


const SignupForm = () => {
    return (
        <ContextWrapper>
            <SignupFormComp />
        </ContextWrapper>
    );
};

export default SignupForm;