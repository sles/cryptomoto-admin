import { Datagrid, DateField, List, TextField } from 'react-admin';
import AuthorLinkField from "../reports/AuthorLinkField";

export const ReportList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="title" />
            <AuthorLinkField/>
            <TextField source="reason" />
            <TextField source="comment" />
            <DateField source="createdAt" />
            <TextField source="status" />
        </Datagrid>
    </List>
);

export default ReportList