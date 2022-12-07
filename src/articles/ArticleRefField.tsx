import * as React from 'react';
import { Link } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import { useRecordContext } from 'react-admin';
import { Product } from '../types';

const ArticleRefField = () => {
    const record = useRecordContext<Product>();
    return record ? (
        <MuiLink
            component={Link}
            to={`/articles/${record.id}`}
            underline="none"
        >
            {record.title}
        </MuiLink>
    ) : null;
};

ArticleRefField.defaultProps = {
    source: 'id',
    label: 'Title',
};

export default ArticleRefField;
