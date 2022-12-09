import { DateField, Show, SimpleShowLayout, TextField } from 'react-admin';
import AuthorLinkForSingleReportField from "../reports/AuthorLinkForSingleReportField";
import * as React from "react";

export const ReportShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="title" />
            <AuthorLinkForSingleReportField />
            <TextField source="user_comment" />
            <TextField source="user_message" />
            <TextField source="reason" />
            <TextField source="comment" />
            <DateField source="createdAt" />
            <TextField source="status" />
        </SimpleShowLayout>
    </Show>
);

export default ReportShow