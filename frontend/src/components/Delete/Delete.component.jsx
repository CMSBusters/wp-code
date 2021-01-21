import React, {useContext} from 'react';
import {AppContext} from '../../App';

import {Popconfirm, Button} from 'antd';

export const Delete = ({record}) => {
    const [, dispatchItems] = useContext(AppContext);

    return (
        <Popconfirm title="Czy na pewno usunąć?"
                    onConfirm={() => {
                        dispatchItems({type: 'DELETE_ITEM', payload: record.key,});
                    }}>
            <Button type="primary" danger>Usuń</Button>
        </Popconfirm>
    );
};
