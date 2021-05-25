import api from "../../../../api/api";

const CalendarActions = {
    GetData: async (callback) => {
        await api.get('/posts?per_page=100').then(response => {
            try {
                return callback(response.data);
            } catch (error) { }
        })
    }
}

export default CalendarActions;