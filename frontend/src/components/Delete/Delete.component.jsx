import React, {useContext} from 'react';
import {TodoContext} from '../../App';

import {Popconfirm, Button} from 'antd';

export const Delete = ({record}) => {
    const [, dispatchTodos] = useContext(TodoContext);

    return (
        <Popconfirm title="Czy na pewno usunąć?"
                    onConfirm={() => {
                        dispatchTodos({type: 'DELETE_ITEM', payload: record.key,});
                    }}>
            <Button type="primary" danger>Usuń</Button>
        </Popconfirm>
    );
};
