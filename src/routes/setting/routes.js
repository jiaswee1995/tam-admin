import machList from "../../pages/setting/mach_list"
import machEdit from "../../pages/setting/edit"

const routes = [
    {
        path: "/setting/mach-list",
        component: machList
    },

    {
        path: "/setting/mach-list/edit",
        component: machEdit
    },
];

export default routes;