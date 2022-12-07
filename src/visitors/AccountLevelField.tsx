import * as React from 'react';
import { Link, FieldProps, useRecordContext } from 'react-admin';

import FullNameField from './FullNameField';
import { Customer } from '../types';

const AccountLevelField = (props: FieldProps<Customer>) => {
    const record = useRecordContext<Customer>();
    if (!record) {
        return null;
    }
    return (
        {record}
    );
};

AccountLevelField.defaultProps = {
    source: 'customer_id',
};

export default AccountLevelField;
