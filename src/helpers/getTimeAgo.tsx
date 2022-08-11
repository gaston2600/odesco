import moment from "moment"
export const getTimeAgo = (id: any) => {
    try {
        return moment(new Date(parseInt(id.toString().substring(0, 8), 16) * 1000)).fromNow()
    } catch (error) {
        return (moment(new Date()).fromNow())
    }
}