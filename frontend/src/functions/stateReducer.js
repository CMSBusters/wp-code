import {v4 as uuidv4} from 'uuid';
import {openNotification} from './openNotification';

export function stateReducer(state, action) {
    const [title] = action.payload || '';

    switch (action.type) {
        case 'ADD_ITEM':
            openNotification('bottomLeft', 'Zapisano!');
            state.push({title, key: uuidv4()});
            break;
        case 'DELETE_ITEM':
            openNotification('bottomLeft', 'Skasowano!');
            return state.filter((item) => item.key !== action.payload);
        case 'DELETE_ITEMS':
            return state.filter((item) => item.key !== action.payload);
        default:
            openNotification('bottomLeft', 'Wystąpił błąd!');
            throw new Error();
    }
}
