import {BooleanField, DateField, EmailField, Show, SimpleShowLayout, TextField} from "react-admin";
import React from "react";

export const CustomerShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField label="ID" source="id" />
            {/*<TextField source="profile_image" />*/}
            <EmailField label="Email" source="email" />
            <TextField label="First name" source="first_name" />
            <TextField label="Last name" source="last_name" />
            <TextField label="Gender" source="gender" />
            <TextField label="Birthday" source="dob" />

            <TextField label="About me" source="about_me" />
            <BooleanField label="Activated" source="is_activated" />
            <TextField label="phone" source="phone" />
            <TextField label="Country" source="country" />
            <TextField label="City" source="city" />
        </SimpleShowLayout>
    </Show>
);

export default CustomerShow
