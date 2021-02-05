import {v4 as uuidv4} from 'uuid';
import {openNotification} from './openNotification';

export function stateReducer(state, action) {
    const [title, price] = action.payload || '';

    switch (action.type) {
        case "CLEAR_LIST":
            openNotification('bottomRight', 'Dodano nowy produkt!');
            return [];
        case 'ADD_ITEM':
            openNotification('bottomRight', 'Zapisano!');
            state.push({title, price, key: uuidv4()});
            break;
        case 'DELETE_ITEM':
            openNotification('bottomRight', 'Skasowano!');
            return state.filter((item) => item.key !== action.payload);
        case 'DELETE_ITEMS':
            return state.filter((item) => item.key !== action.payload);
        default:
            openNotification('bottomRight', 'Wystąpił błąd!');
            throw new Error();
    }
}
