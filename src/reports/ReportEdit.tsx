
import {
    BooleanInput,
    Edit, SelectInput,
    SimpleForm,
    TextInput
} from 'react-admin';
import {Grid} from "@mui/material";
import * as React from "react";

export const ReportEdit = () => {

    return (

    <Grid item xs={6} md={4}>

    <Edit>
        <SimpleForm>

            <SelectInput source="status" choices={[
                { id: 'rejected', name: 'rejected' },
                { id: 'approved', name: 'approved' },
            ]} />

            <TextInput source="comment" />
        </SimpleForm>
    </Edit>

    </Grid>
);
}
export default ReportEdit