import * as React from 'react';
import { SxProps, Typography } from '@mui/material';
import { memo } from 'react';

import { FieldProps, useRecordContext } from 'react-admin';
import { Article } from '../types';

interface Props extends FieldProps<Article> {
    size?: string;
    sx?: SxProps;
}

const TitleField = (props: Props) => {
    const { size } = props;
    const record = useRecordContext<Article>();

    return record ? (
        <Typography
            variant="body2"
            display="flex"
            flexWrap="nowrap"
            alignItems="center"
            component="div"
            sx={props.sx}
        >
            {record.title}
        </Typography>
    ) : null;
};

TitleField.defaultProps = {
    source: 'title',
    label: 'Title',
};

export default memo<Props>(TitleField);
