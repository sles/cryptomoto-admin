
import {BooleanInput, DateField, DateInput, Edit, NumberField, SimpleForm, TextField, TextInput} from 'react-admin';
import AvatarField from "../blocked-users/AvatarField";

export const BlockedUserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextField label="ID" source="id" />
            <AvatarField size="50"/>
            <BooleanInput label="Block user" source="isBlocked" />
            <TextField label="Email" source="email" />
            <TextField label="First name" source="first_name" />
            <TextField label="Last name" source="last_name" />
            <TextField label="Gender" source="gender" />
            <DateField label="Birthday" source="dob" />
            <TextField label="About me" source="about_me" />
            <TextField label="Phone" source="phone" />
            <TextField label="Country" source="country" />
            <TextField label="City" source="city" />
            <NumberField label="Friend Count" source="friendCount" />
            <NumberField label="Follower Count" source="followerCount" />
            <TextField label="Account Level" source="accountLevel.name" />
        </SimpleForm>
    </Edit>
);

export default BlockedUserEdit