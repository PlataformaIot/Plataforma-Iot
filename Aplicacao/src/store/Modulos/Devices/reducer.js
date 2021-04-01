import produce from 'immer';

export default function Devices(state = [], action) {
    switch (action.type) {
        case 'SELECT_DEVICE':
            return produce(state, draft => {
                draft.push(action.trip)
            });
        default:
            return state
    }
}