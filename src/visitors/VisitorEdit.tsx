import * as React from 'react';
import {
    DateInput,
    Edit,
    NullableBooleanInput,
    TextInput,
    PasswordInput,
    SimpleForm,
    useTranslate, BooleanInput, TextField, DateField,
} from 'react-admin';
import { Grid, Box, Typography } from '@mui/material';

import Aside from './Aside';
import FullNameField from './FullNameField';
import SegmentsInput from './SegmentsInput';
import { validateForm } from './VisitorCreate';

const VisitorEdit = () => {
    const translate = useTranslate();
    return (
        <Edit title={<VisitorTitle />} aside={<Aside />}>
            <SimpleForm validate={validateForm}>
                <div>
                    <Grid container width={{ xs: '100%', xl: 800 }} spacing={2}>
                        <Grid item xs={12} md={8}>
                            <Typography variant="h6" gutterBottom>
                                {translate(
                                    'resources.users.fieldGroups.identity'
                                )}
                            </Typography>
                            <Box display={{ xs: 'block', sm: 'flex' }}>
                                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                                    <TextInput
                                        source="first_name"
                                        isRequired
                                        fullWidth
                                    />
                                </Box>
                                <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                                    <TextInput
                                        source="last_name"
                                        isRequired
                                        fullWidth
                                    />
                                </Box>
                            </Box>
                            <Box>
                                <BooleanInput label="Activated" source="is_activated" />
                            </Box>
                            {/*<TextInput*/}
                            {/*    type="email"*/}
                            {/*    source="email"*/}
                            {/*    isRequired*/}
                            {/*    fullWidth*/}
                            {/*/>*/}
                            <Box display={{ xs: 'block', sm: 'flex' }}>
                                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                                    <DateInput label="Birthday" source="dob" />
                                </Box>
                                <Box flex={2} ml={{ xs: 0, sm: '0.5em' }} />
                            </Box>

                            <Box mt="1em" />

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
                            <Box display={{ xs: 'block', sm: 'flex' }}>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <BooleanInput label="Block user" source="isBlocked" />
                            <TextInput name="Reason For Blocking" source={"reasonForBlocking.cause"} fullWidth={true}/>
                            <DateField source="reasonForBlocking.createdAt"/>
                        </Grid>
                    </Grid>
                </div>
            </SimpleForm>
        </Edit>
    );
};

const VisitorTitle = () => <FullNameField size="32" sx={{ margin: '5px 0' }} />;

export default VisitorEdit;
