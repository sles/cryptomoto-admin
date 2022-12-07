import * as React from 'react';
import {Stack, Chip, Typography} from '@mui/material';
import {FieldProps, useTranslate, useRecordContext, TextField} from 'react-admin';
import segments from '../segments/data';
import { Customer } from '../types';

const segmentsById = segments.reduce((acc, segment) => {
    acc[segment.id] = segment;
    return acc;
}, {} as { [key: string]: any });

const SegmentsField = (props: FieldProps) => {
    const translate = useTranslate();
    const record = useRecordContext<Customer>();
    if (!record || !record.accountLevel) {
        return null;
    }
    return (
        <Typography>
            {record.accountLevel.name}
        </Typography>
    );
};

export default SegmentsField;
