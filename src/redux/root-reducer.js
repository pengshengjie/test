import {combineReducers} from 'redux';
import Auth from "@redux/Auth/reducer";
import EditableTable from "@redux/EditableTable/reducer";

const rootReducer = combineReducers({
    Auth,
    EditableTable
});

export default rootReducer;
