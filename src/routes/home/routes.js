import Home from "../../pages/home"
import UserGroupMenu from "../../pages/userGroupMenu"

const routes = [
    {
        path: "/",
        name: "Home",
        module: "Admin",
        component: Home
    },

    {
        path: "/user/group-menu",
        component: UserGroupMenu
    },
];

export default routes;