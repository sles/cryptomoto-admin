import {
    DateInput,
    Edit,
    SelectArrayInput,
    SelectField,
    SelectInput,
    SimpleForm,
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


export const ArticleEdit = () => {
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
            <SimpleForm>
                <TextInput source="title" />
                <TextInput source="short_description" />
                <TextInput source="description" fullWidth  multiline />
            </SimpleForm>
        </Edit>
    );
}

