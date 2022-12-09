import {Datagrid, List, ShowButton, TextField, DeleteWithConfirmButton, EditButton} from 'react-admin';
import AuthorLinkField from "../custom-articles/AuthorLinkField";
import CustomArticleListAside from "../custom-articles/CustomArticleListAside";
import * as React from "react";


const ArticleShowButton = () => <ShowButton label="Show" />;
const ArticleDeleteWithConfirmButton = ()=> <DeleteWithConfirmButton label="Delete"/>

const ArticleEditButton = () => <EditButton label="approve"/>
export const CustomArticleList = () => (
    <List
        exporter={false}
        aside={<CustomArticleListAside />}
    >
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="short_description" />
            <AuthorLinkField/>
            <ArticleShowButton/>
            <ArticleEditButton/>
            <ArticleDeleteWithConfirmButton/>
        </Datagrid>
    </List>
);

export default CustomArticleList