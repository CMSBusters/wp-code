import React from 'react';

import {Delete} from '../components/Delete/Delete.component';
import {Title} from '../components/Title/Title.component';

export const FORM_COLUMNS = [
    {
        title: 'Nazwa komponentu',
        dataIndex: 'title',
        key: 'title',
        onFilter: (_, record) => record.completed === 'false',
        render: (text, record) => {
            return <Title record={record}>{text}</Title>;
        },
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
