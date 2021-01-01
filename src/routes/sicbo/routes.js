import SicboTableList from "../../pages/sicbo/table/index"
import SicboTableEdit from "../../pages/sicbo/tableEdit/EditTableIndex"
import SicboBetTrans from "../../pages/sicbo/report/SicboBetTransTable"
import SicboTablePayRate from "../../pages/sicbo/report/SicboTablePayRate";

const routes = [
    {
        path: "/sicbo/table",
        component: SicboTableList
    },
    {
        path: "/sicbo/table-edit",
        component: SicboTableEdit,
    },
    {
        path: "/sicbo/bet-trans-report",
        component: SicboBetTrans,
    },
    {
        path: "/sicbo/table-pay-rate",
        component: SicboTablePayRate,
    },
];

export default routes;