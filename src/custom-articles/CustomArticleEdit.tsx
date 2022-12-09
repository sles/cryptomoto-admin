import {
    BooleanField, BooleanInput,
    DateInput,
    Edit,
    SelectArrayInput,
    SelectField,
    SelectInput, Show,
    SimpleForm, SimpleShowLayout, TextField,
    TextInput, useChoices, useGetList, useList,
    useRecordContext, useUnselectAll
} from 'react-admin';
import {Article, Category} from "../types";
import * as React from "react";
const authors = [
    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
    { id: 456, first_name: 'Jane', last_name: 'Austen' },
];
const optionRenderer = (choice: any) => `${choice.first_name} ${choice.last_name}`;


export const CustomArticleEdit = () => {
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
        <Edit >
                <SimpleShowLayout>
                    <TextField label="Title" source="title" />
                    <TextField label="Short description" source="short_description" />
                    <TextField label="Description" source="description" fullWidth />
                </SimpleShowLayout>
            <SimpleForm>
                <BooleanInput label="Approve" source="approve" />
            </SimpleForm>
        </Edit>
    );
}

export default CustomArticleEdit