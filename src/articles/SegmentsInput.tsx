import * as React from 'react';
import {SelectArrayInput, SelectArrayInputProps, useRecordContext} from 'react-admin';

import segments from '../segments/data';
import {Category} from "../types";

const SegmentsInput = (props: SelectArrayInputProps) => {
    console.log(props)
    const record = useRecordContext<Category>();
    return (
        <SelectArrayInput
            {...props}
            source="categories"
            translateChoice
            optionValue={record.categories}
        />
    );
}


export default SegmentsInput;
