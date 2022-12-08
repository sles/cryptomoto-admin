import * as React from 'react';
import { Link, FieldProps, useRecordContext } from 'react-admin';

import {Article, Customer} from '../types';
import TitleField from "../articles/TitleField";

const ArticleLinkField = (props: FieldProps<Article>) => {
    const record = useRecordContext<Article>();
    if (!record) {
        return null;
    }
    return (
        <Link to={`/articles/${record.id}`}>
            <TitleField />
        </Link>
    );
};

ArticleLinkField.defaultProps = {
    source: 'title',
};

export default ArticleLinkField;