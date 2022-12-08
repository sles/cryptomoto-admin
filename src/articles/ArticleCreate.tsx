import * as React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    DateInput,
    required,
    NumberInput,
    SelectArrayInput,
    useGetList, useList
} from 'react-admin';

export const ArticleCreate = () => {
    const { data, isLoading } = useGetList(
        'categories',
    );
    const listContext = useList({ data, isLoading });
    const categories = !isLoading ? data?.map(category => {
        return {
            id: category.id,
            name: category.name
        }
    }) : []
    return (
    <Create>
        <SimpleForm>
        <TextInput source="title" validate={[required()]} fullWidth />
    <TextInput source="short_description" label="Short description" />
        <TextInput source="description" label="Description" fullWidth />
        <NumberInput label="Priority" source="priority"/>
        <SelectArrayInput source="categories" choices={categories} />
</SimpleForm>
</Create>
);
}


export default ArticleCreate
