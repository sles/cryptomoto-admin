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
    useRecordContext, TextField, ShowButton, DeleteButton,
} from 'react-admin';

import ThumbnailField from '../products/ThumbnailField';
import ProductRefField from '../products/ProductRefField';
import { Category } from '../types';
import ArticleRefField from "../articles/ArticleRefField";
const ArticleShowButton = () => <ShowButton label="Show" />;
const ArticleDeleteButton = () => <DeleteButton label="Delete"/>;
const CategoryEdit = () => (
    <Edit title={<CategoryTitle />}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="icon" />
            <Labeled label="Articles" fullWidth>
                <ReferenceManyField
                    reference="articles"
                    target="category_id"
                    perPage={20}
                >
                    <Datagrid
                        sx={{
                            '& .column-thumbnail': {
                                width: 25,
                                padding: 0,
                            },
                        }}
                    >
                        <ThumbnailField source="thumbnail" label="" />
                        <ArticleRefField source="title" />
                        <TextField source="short_description" />
                        <TextField source="description" />
                        <NumberField source="viewed_count" />
                        <NumberField source="likes_count" />
                        <NumberField source="dislikes_count" />
                        <NumberField source="comments_count" />
                        <ArticleShowButton/>
                        <ArticleDeleteButton/>
                    </Datagrid>
                </ReferenceManyField>
            </Labeled>
        </SimpleForm>
    </Edit>
);

const CategoryTitle = () => {
    const record = useRecordContext<Category>();
    const translate = useTranslate();

    return record ? (
        <span>
            {translate('resources.categories.name', { smart_count: 1 })} &quot;
            {record.name}&quot;
        </span>
    ) : null;
};

export default CategoryEdit;
