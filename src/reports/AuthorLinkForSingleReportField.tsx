import * as React from 'react';
import { Link, FieldProps, useRecordContext } from 'react-admin';

import FullNameField from './FullNameField';
import {CustomArticle, Customer} from '../types';

const AuthorLinkForSingleReportField = (props: FieldProps<CustomArticle>) => {
    const record = useRecordContext<CustomArticle>();
    if (!record) {
        return null;
    }
    return (
        <Link to={`/customers/${record.user.id}`}>
            <FullNameField size="100"/>
        </Link>
    );
};

AuthorLinkForSingleReportField.defaultProps = {
    source: 'author_id',
};

export default AuthorLinkForSingleReportField;
