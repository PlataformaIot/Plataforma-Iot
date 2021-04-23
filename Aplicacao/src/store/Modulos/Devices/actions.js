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

export const CADASTRO_EVERY =  "CADASTRO_EVERY";

export const cadastroEvery = evento =>({
    type: CADASTRO_EVERY,
    payload: evento
})

export const DADOS_DEVICE = "DADOS_DEVICE";

export const dadosDevice = evento =>({
    type: DADOS_DEVICE,
    payload: evento
})