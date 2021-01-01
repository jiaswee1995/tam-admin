import BaccaratTable from "../../pages/baccarat/table/index"
import BacBetTransTable from "../../pages/baccarat/report/BacBetTransTable";
import BacBetTablePayRate from "../../pages/baccarat/report/BacBetTablePayRate";
import EditBacTable from "../../pages/baccarat/editTable/EditBacTable";

const routes = [
    {
        path: "/baccarat/table",
        component: BaccaratTable
    },
    {
        path: "/baccarat/bet-trans-report",
        component: BacBetTransTable
    },
    {
        path: "/baccarat/table-pay-rate",
        component: BacBetTablePayRate
    },
    {
        path: "/baccarat/table-edit",
        component: EditBacTable
    },
];

export default routes;