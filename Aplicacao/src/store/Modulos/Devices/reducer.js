import { ATUALIZAR_DEVICES, SELECT_DEVICE, CADASTRO_EVERY } from './actions';

const initialState = {
    devices: [],
    selectedDevice: '',
    cadastroEvery:[]
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
        case CADASTRO_EVERY:
            return{
                ...state,
                cadastroEvery: payload
            }
        default:
            return state
    }
}