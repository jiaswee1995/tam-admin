import notiList from "../../pages/notification/list"
import notiAdd from "../../pages/notification/add"
import NotificationSend from "../../pages/notification/send/index"
import NotificationSendSponsor from "../../pages/notification/sendsponsor/index"

const routes = [
    {
        path: "/notification/list",
        component: notiList
    },

    {
        path: "/notification/add",
        component: notiAdd
    },
    {
        path: "/notification/sendsponsor",
        component: NotificationSendSponsor
    },
    {
        path: "/notification/send",
        component: NotificationSend
    },

];

export default routes;