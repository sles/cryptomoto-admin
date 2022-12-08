import { Datagrid, List, NumberField, TextField } from 'react-admin';
import ArticleLinkField from "../articles/ArticleLinkField";
import { ShowButton, DeleteButton } from 'react-admin';

const ArticleShowButton = () => <ShowButton label="Show" />;
const ArticleDeleteButton = () => <DeleteButton label="Delete"/>;

export const ArticleList = () => (
    <List exporter={false}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <ArticleLinkField/>
            <TextField source="short_description" />
            <TextField source="description" />
            <NumberField source="viewed_count" />
            <NumberField source="likes_count" />
            <NumberField source="dislikes_count" />
            <NumberField source="comments_count" />
            <ArticleShowButton/>
            <ArticleDeleteButton/>
        </Datagrid>
    </List>
);