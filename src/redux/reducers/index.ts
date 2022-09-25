import { combineReducers } from 'redux'
import alertaReducer from './alertaReducer';
import tareasReducer from './tareasReducer'


export default combineReducers({
    tareas_state: tareasReducer,
    tareas_alert : alertaReducer
});