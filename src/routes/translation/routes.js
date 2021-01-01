import translationList from "../../pages/translation/list"
import translationAdd from "../../pages/translation/add"
import translationEdit from "../../pages/translation/edit"

const routes = [
    {
        path: "/translation/list",
        component: translationList
    },

    {
        path: "/translation/add",
        component: translationAdd
    },

    {
        path: "/translation/edit",
        component: translationEdit
    },

];

export default routes;