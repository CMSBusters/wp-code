import React from 'react';

import {Delete} from '../components/Delete/Delete.component';
import {Title} from '../components/Title/Title.component';

export const FORM_COLUMNS = [
    {
        title: 'Nazwa komponentu',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => {
            return <Title record={record}>{text}</Title>;
        },
    },
    {
        title: 'Cena',
        dataIndex: 'price',
        className: 'column-money',
        key: 'price'
    },
    {
        title: 'Akcja',
        key: 'action',
        dataIndex: 'action',
        render: (_, record) => {
            return (
                <>
                    <Delete record={record}/>
                </>
            );
        },
    },
];
