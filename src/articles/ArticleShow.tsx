import {DateField, ImageField, Show, SimpleShowLayout, TextField} from 'react-admin';

export const ArticleShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField label="ID" source="id" />
            <ImageField label="Image" source="cover_image.downloadUrl" title="title" />
            <TextField label="Title" source="title" />
            <TextField label="Short description" source="short_description" />
            <TextField label="Description" source="description" />
            <TextField label="Viewed Count" source="viewed_count" />
            <TextField label="Likes_Count" source="likes_count" />
            <TextField label="Dislikes Count" source="dislikes_count" />
            <TextField label="Comments Count" source="comments_count" />

            {/*<TextField source="cover_image.__typename" />*/}
            {/*<TextField source="categories" />*/}
            {/*<TextField source="likes" />*/}
            {/*<TextField source="dislikes" />*/}
            {/*<TextField source="comments" />*/}
        </SimpleShowLayout>
    </Show>
);