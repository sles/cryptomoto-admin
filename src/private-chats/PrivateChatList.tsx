import * as React from 'react';
import { EditButton, List, useListContext } from 'react-admin';
import inflection from 'inflection';
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
} from '@mui/material';

import { PrivateChat } from '../types';

const PrivateChatList = () => (
    <List
        sort={{ field: 'name', order: 'ASC' }}
        perPage={20}
        component="div"
        actions={false}
    >
        <PrivateChatGrid />
    </List>
);

const PrivateChatGrid = () => {
    const { data, isLoading } = useListContext<PrivateChat>();
    if (isLoading) {
        return null;
    }
    return (
        <Grid container spacing={2} sx={{ marginTop: '1em' }}>
            {data.map(record => (
                <Grid key={record.id} xs={12} sm={6} md={4} lg={3} xl={2} item>
                    <Card>
                        <CardMedia
                            image={`${record?.image?.downloadUrl}`}
                            sx={{ height: 140 }}
                        />
                        <CardContent sx={{ paddingBottom: '0.5em' }}>
                            <Typography
                                variant="h5"
                                component="h2"
                                align="center"
                            >
                                {inflection.humanize(record.name)}
                            </Typography>
                        </CardContent>
                        <CardActions
                            sx={{
                                '.MuiCardActions-spacing': {
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                },
                            }}
                        >
                            <EditButton record={record} />
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default PrivateChatList;
