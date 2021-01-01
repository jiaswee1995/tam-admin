import RoulWheelList from "../../pages/roulette/wheel/index"
import RoulWheelEditIndex from "../../pages/roulette/wheelEdit/RoulWheelEditIndex"
import RouletteBetTransTable from "../../pages/roulette/report/RouletteBetTransTable";
import RoulWheelPayRate from "../../pages/roulette/report/RoulWheelPayRate";

const routes = [
    {
        path: "/roulette/wheel",
        component: RoulWheelList
    },
    {
        path: "/roulette/wheel-edit",
        component: RoulWheelEditIndex
    },
    {
        path: "/roulette/bet-trans-report",
        component: RouletteBetTransTable
    },
    {
        path: "/roulette/wheel-pay-rate",
        component: RoulWheelPayRate,  
    },

];

export default routes;