import * as React from 'react';
import {
    Create,
    DateInput,
    SimpleForm,
    TextInput,
    useTranslate,
    PasswordInput,
    email, BooleanInput, NumberField,
} from 'react-admin';
import { Box, Typography } from '@mui/material';

export const validateForm = (
    values: Record<string, any>
): Record<string, any> => {
    const errors = {} as any;
    if (!values.first_name) {
        errors.first_name = 'ra.validation.required';
    }
    if (!values.last_name) {
        errors.last_name = 'ra.validation.required';
    }
    if (!values.email) {
        errors.email = 'ra.validation.required';
    } else {
        const error = email()(values.email);
        if (error) {
            errors.email = error;
        }
    }
    if (values.password && values.password !== values.confirm_password) {
        errors.confirm_password =
            'resources.customers.errors.password_mismatch';
    }
    return errors;
};

const VisitorCreate = () => (
    <Create>
        <SimpleForm
            sx={{ maxWidth: 500 }}
            // Here for the GQL provider
            defaultValues={{
                birthday: new Date(),
            }}
            validate={validateForm}
        >
            <SectionTitle label="resources.users.fieldGroups.identity" />
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                    <TextInput source="first_name" isRequired fullWidth />
                </Box>
                <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                    <TextInput source="last_name" isRequired fullWidth />
                </Box>
            </Box>
            <Box>
                <BooleanInput label="Activated" source="status" />
            </Box>
            <TextInput type="email" source="email" isRequired fullWidth />
            <DateInput label="Birthday" source="dob" />
            <Separator />
            <Typography variant="h6" gutterBottom>
                {"Address"}
            </Typography>
            <TextInput
                source="country"
                multiline
                fullWidth
                helperText={false}
            />
            <Box display={{ xs: 'block', sm: 'flex' }}>
                <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                    <TextInput
                        source="city"
                        fullWidth
                        helperText={false}
                    />
                </Box>
            </Box>

            <Box mt="1em" />
            <Separator/>
            <SectionTitle label="resources.users.about_me" />
            <TextInput label="resources.users.about_me" source="about_me" multiline fullWidth={true}  />
            <TextInput label="Phone" source="phone"/>
            <Separator />
            <SectionTitle label="resources.users.fieldGroups.password" />
            <Box display={{ xs: 'block', sm: 'flex' }}>
                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                    <PasswordInput source="password" fullWidth />
                </Box>
                <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                    <PasswordInput source="confirm_password" fullWidth />
                </Box>
            </Box>
        </SimpleForm>
    </Create>
);

const SectionTitle = ({ label }: { label: string }) => {
    const translate = useTranslate();

    return (
        <Typography variant="h6" gutterBottom>
            {translate(label as string)}
        </Typography>
    );
};

const Separator = () => <Box pt="1em" />;

export default VisitorCreate;
