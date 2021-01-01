import Member from "../../pages/member/add"
import listMember from "../../pages/member/list"
import Geneology from "../../pages/geneology"

const routes = [
    {
        path: "/member/add",
        component: Member
    },

    {
        path: "/member",
        name: "Home",
        module: "Admin",
        component: listMember
    },

    {
        path: "/member/geneology",
        component: Geneology
    },
];

export default routes;