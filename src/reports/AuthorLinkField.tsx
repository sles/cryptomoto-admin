import * as React from 'react';
import { Link, FieldProps, useRecordContext } from 'react-admin';

import FullNameField from './FullNameField';
import {CustomArticle, Customer} from '../types';

const AuthorLinkField = (props: FieldProps<CustomArticle>) => {
    const record = useRecordContext<CustomArticle>();
    if (!record) {
        return null;
    }
    return (
        <Link to={`/customers/${record.user.id}`}>
            <FullNameField />
        </Link>
    );
};

AuthorLinkField.defaultProps = {
    source: 'author_id',
};

export default AuthorLinkField;
