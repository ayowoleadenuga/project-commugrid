import { combineReducers } from "redux";
import authReducer from "./components/Auth/Redux/authReducer";
import { alert } from "./utils/Alert/reducers/alert.reducer";

export default combineReducers({
    alert: alert,
    auth: authReducer,
})