import Admin from "../../pages/admin"
import AdminList from "../../pages/admin/list"
import AdminAdd from "../../pages/admin/add"

const routes = [
    {
        path: "/admin",
        name: "Admin",
        module: "Admin",
        component: Admin
    },
    {
        path: "/admin/list",
        component: AdminList
    },

    {
        path: "/admin/add",
        component: AdminAdd
    },
];

export default routes;