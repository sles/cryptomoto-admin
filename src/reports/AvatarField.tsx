import * as React from 'react';
import { Avatar, SxProps } from '@mui/material';
import { FieldProps, useRecordContext } from 'react-admin';
import {CustomArticle, Customer} from '../types';

interface Props extends FieldProps<Customer> {
    sx?: SxProps;
    size?: string;
}

const AvatarField = ({ size = '25', sx }: Props) => {
    const record = useRecordContext<CustomArticle>();
    if (!record) return null;
    return (
        <Avatar
            src={`${record?.user.profile_image?.downloadUrl}`}
            style={{ width: parseInt(size, 10), height: parseInt(size, 10) }}
            sx={sx}
        />
    );
};

export default AvatarField;
