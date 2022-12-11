import * as React from 'react';
import {
    Datagrid,
    Edit,
    EditButton,
    NumberField,
    Labeled,
    ReferenceManyField,
    SimpleForm,
    TextInput,
    useTranslate,
    useRecordContext, TextField, ShowButton, DeleteButton, SelectArrayInput, useGetList, useList,
} from 'react-admin';

import ThumbnailField from '../products/ThumbnailField';
import ProductRefField from '../products/ProductRefField';
import {Category, Order, PrivateChat} from '../types';
import ArticleRefField from "../articles/ArticleRefField";
import AvatarField from "../visitors/AvatarField";
const ArticleShowButton = () => <ShowButton label="Show" resource="/customers" />;
const ArticleDeleteButton = () => <DeleteButton label="Delete" redirect={''}/>;


const PrivateChatEdit = () => {

    const { data, isLoading } = useGetList(
        'users',
    );
    const listContext = useList({ data, isLoading });
    const users = !isLoading ? data?.map(user => {
        return {
            id: user.id,
            name: `${user.first_name} ${user.last_name}`
        }
    }) : []
    return (
        <Edit title={<PrivateChatTitle />}>
            <SimpleForm>
                <TextInput source="name" />
                <TextInput source="icon" />
                <SelectArrayInput source="users" choices={users} />
                <Labeled label="Users" fullWidth>
                    <ReferenceManyField
                        reference="users"
                        target="id"

                    >
                        <Datagrid
                            sx={{
                                '& .column-thumbnail': {
                                    width: 25,
                                    padding: 0,
                                },
                            }}
                            bulkActionButtons={false}
                        >
                            <AvatarField />
                            <TextField source="first_name" />
                            <TextField source="last_name" />
                            <ArticleShowButton/>
                            <ArticleDeleteButton/>
                        </Datagrid>
                    </ReferenceManyField>
                </Labeled>
            </SimpleForm>
        </Edit>
    );
}


const PrivateChatTitle = () => {
    const record = useRecordContext<Category>();
    const translate = useTranslate();

    return record ? (
        <span>
            {translate('resources.categories.name', { smart_count: 1 })} &quot;
            {record.name}&quot;
        </span>
    ) : null;
};

export default PrivateChatEdit;
