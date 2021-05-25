import api from "../../../../api/api";

const CalendarActions = {
    GetData: async (callback) => {
        await api.get(`/?${new Date().getTime()}`).then(response => {
            try {
                return callback(response.data);
            } catch (error) { }
        })
    },
    UpdateData: async (data, callback) => {
        await api.post('/update_room', data).then(response => {
            try {
                return callback(response.data);
            } catch (error) { }
        })
    }
}

export default CalendarActions;