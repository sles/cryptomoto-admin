import { Datagrid, DateField, EmailField, List, TextField } from 'react-admin';
import AvatarField from "../blocked-users/AvatarField";

export const BlockedUserList = () => (
    <List exporter={false} pagination={false}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <AvatarField/>
            <TextField source="first_name" />
            <TextField source="last_name" />
            <EmailField source="email" />
            <TextField source="cause" />
            <DateField source="blockDate" />
        </Datagrid>
    </List>
);

export default BlockedUserList