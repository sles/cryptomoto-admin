import {DateField, ImageField, Show, SimpleShowLayout, TextField} from 'react-admin';

export const ArticleShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <ImageField source="cover_image.downloadUrl" title="title" />
            <TextField source="title" />
            <TextField source="short_description" />
            <TextField source="description" />
            <TextField source="viewed_count" />
            <TextField source="likes_count" />
            <TextField source="dislikes_count" />
            <TextField source="comments_count" />

            {/*<TextField source="cover_image.__typename" />*/}
            {/*<TextField source="categories" />*/}
            {/*<TextField source="likes" />*/}
            {/*<TextField source="dislikes" />*/}
            {/*<TextField source="comments" />*/}
        </SimpleShowLayout>
    </Show>
);