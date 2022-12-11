import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useTranslate, useRecordContext } from 'react-admin';
import { stringify } from 'query-string';

import products from '../products';
import { PrivateChat } from '../types';

const LinkToRelatedArticles = () => {
    const record = useRecordContext<PrivateChat>();
    const translate = useTranslate();
    if (!record) return null;
    return (
        <Button
            size="small"
            color="primary"
            component={Link}
            to={{
                pathname: '/articles',
                search: stringify({
                    filter: JSON.stringify({ category_id: record.id }),
                }),
            }}
            sx={{ display: 'inline-flex', alignItems: 'center' }}
        >
            <products.icon sx={{ paddingRight: '0.5em' }} />
            {translate('resources.categories.fields.articles')}
        </Button>
    );
};

export default LinkToRelatedArticles;
