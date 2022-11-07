import actions from './actions'
import _ from 'lodash'

const initState = {
    connection: [],
    tab: '0',
    meta: null,
    SelectedCurrentUser: null,
    permissions: [],
    domain: null,
    entity: null,
    clientInstance_url: null,
    networkname: null,
    userContactId: null,
    SelectedPage: 0,
    SelectedUMA: '',
}

export default function AuthReducer(state = initState, action) {
    switch (action.type) {
        case actions.Auth_REQUEST:
            return {
                ...state,
                connection: action.payload.connection,
            }
        case actions.Auth_ERROR:
            return {
                ...state,
                error: action.payload.error,
            }
        case actions.Auth_Meta_Success:
            console.log(action.payload.data);
            return {
                ...state,

                meta: _.get(action.payload.data, 'meta'),
                domain: _.get(action.payload.data, 'domain'),
                entity: _.get(action.payload.data, 'entity'),
                internal: _.get(action.payload.data, 'internal'),
                clientInstance_url: _.get(action.payload.data, 'instance_url'),
                networkname: _.get(action.payload.data, 'network'),
            }
        case actions.Selected_Tab:
            return {
                ...state,
                tab: action.payload.tab,
            }
        case actions.Selected_Page:
            return {
                ...state,
                SelectedPage: action.payload.record,
            }
        case actions.Selected_UMA:
            return {
                ...state,
                SelectedUMA: action.payload.record,
            }
        case actions.Selected_Name:
            return {
                ...state,
                SelectedName: action.payload.record,
            }
        case actions.SELECTED_CURRENT_USER:
            return {
                ...state,
                SelectedCurrentUser: action.payload.record,
            }
        case actions.PERMISSIONS:
            return {
                ...state,
                permissions: action.payload.record,
            }
        case actions.USER_CONTACT_ID:
            return {
                ...state,
                userContactId: action.payload.record,
            }
        default:
            return state
    }
}
