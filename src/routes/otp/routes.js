import GetMemberOTP from "../../pages/otp/memberotp/index"
import GenerateOTP from "../../pages/otp/otpgenerate/index"

const routes = [
    {
        path: "/otp/get",
        component: GetMemberOTP
    },
    {
        path: "/otp/generator",
        component: GenerateOTP
    },

];

export default routes;