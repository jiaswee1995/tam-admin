import Adjustment from "../../pages/ewallet/adjustment"
import Transfer from "../../pages/ewallet/transfer"
import Statement from "../../pages/ewallet/statement"
import withdrawApproval from "../../pages/ewallet/withdrawApproval"
import DepositApproval from "../../pages/ewallet/depositApproval"
import listWalletBalance from "../../pages/ewallet/balance"
import deposit from "../../pages/ewallet/deposit"
import withdrawSecondApproval from "../../pages/ewallet/withdrawSecondApproval"
import EwtBlock from "../../pages/ewallet/block"
import CryptoList from "../../pages/ewallet/cryptolist/index"

const routes = [
    {
        path: "/ewallet/adjustment",
        component: Adjustment
    },

    {
        path: "/ewallet/transfer",
        component: Transfer
    },

    {
        path: "/ewallet/statement",
        component: Statement
    },

    {
        path: "/ewallet/withdrawApproval",
        component: withdrawApproval
    },

    {
        path: "/ewallet/balance",
        component: listWalletBalance
    },

    {
        path: "/ewallet/deposit",
        component: deposit
    },

    {
        path: "/ewallet/withdrawSecondApproval",
        component: withdrawSecondApproval
    },

    {
        path: "/ewallet/block",
        component: EwtBlock
    },
    {
        path: "/ewallet/cryptolist",
        component: CryptoList
    },
    {
        path: "/ewallet/depositApproval",
        component: DepositApproval
    }
];

export default routes;