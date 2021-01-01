import listSales from "../../pages/sales/list"
import topUpSales from "../../pages/sales/topup"

const routes = [
    {
        path: "/sales/list",
        component: listSales
    },

    {
        path: "/sales/topup",
        component: topUpSales
    },
];

export default routes;