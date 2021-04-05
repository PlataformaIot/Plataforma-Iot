export const ATUALIZAR_DEVICES = "ATUALIZAR_DEVICES";

export const atualizarDevices = evento => ({
    type: ATUALIZAR_DEVICES,
    payload: evento
})

export const SELECT_DEVICE = "SELECT_DEVICE";

export const selecionarDevice = evento => ({
    type: SELECT_DEVICE,
    payload: evento
})