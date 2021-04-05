import { ATUALIZAR_DEVICES, SELECT_DEVICE } from './actions';

const initialState = {
    devices: [],
    selectedDevice: ''
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case ATUALIZAR_DEVICES:
           
            return {
                ...state,
                devices: payload
            }
        case SELECT_DEVICE:
            return {
                ...state,
                selectedDevice: payload
            }
        default:
            return state
    }
}