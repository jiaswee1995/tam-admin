import betTrans from "../../pages/report/bet_trans"
import dailyMach from "../../pages/report/daily_mach"
import rewardList from "../../pages/report/reward_list"
import convertList from "../../pages/report/convert_list"
import transferList from "../../pages/report/transfer_list"
import rewardStatement from "../../pages/report/reward_statement"
import achievement from "../../pages/report/achievement"
import SlotMachPayRate from "../../pages/report/daily_mach/SlotMachPayRate"

const routes = [
    {
        path: "/report/bet/transaction",
        component: betTrans
    },

    {
        path: "/report/dailyMach",
        component: dailyMach
    },

    {
        path: "/report/reward",
        component: rewardList
    },

    {
        path: "/report/convert",
        component: convertList
    },

    {
        path: "/report/transfer",
        component: transferList
    },

    {
        path: "/report/reward/statement",
        component: rewardStatement
    },

    {
        path: "/report/achievement",
        component: achievement
    },
    {
        path: "/report/mach-pay-rate",
        component: SlotMachPayRate
    },
];

export default routes;