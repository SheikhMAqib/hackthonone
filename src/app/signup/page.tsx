import SignupFormComp from "../../components/views/Signup";
// @/components/views/Signup/index
import ContextWrapper from "@/global/context";

const SignupForm = () => {
    return (
        <ContextWrapper>
            <SignupFormComp />
        </ContextWrapper>
    );
};

export default SignupForm;