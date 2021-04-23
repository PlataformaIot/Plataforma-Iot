import { ATUALIZAR_DEVICES, SELECT_DEVICE, CADASTRO_EVERY, DADOS_DEVICE, dadosDevice } from './actions';

const initialState = {
    devices: [],
    selectedDevice: '',
    cadastroEvery: [],
    dadosDevice: []
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
            return {
                ...state,
                cadastroEvery: payload
            }
        case DADOS_DEVICE:
            return {
                ...state,
                dadosDevice: payload,
                selectedDevice: payload[0].device
            }
        default:
            return state
    }
}