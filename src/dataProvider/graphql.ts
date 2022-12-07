import {ApolloQueryResult, createHttpLink, InMemoryCache} from '@apollo/client';
import buildApolloClient, {
    buildQuery as buildQueryFactory,
} from 'ra-data-graphql-simple';
import { BuildQueryFactory } from 'ra-data-graphql';
import {CREATE, DataProvider, DELETE, GET_LIST, GET_MANY_REFERENCE, GET_ONE, UPDATE} from 'react-admin';
import gql from 'graphql-tag';
import { IntrospectionType } from 'graphql';
import {setContext} from "@apollo/client/link/context";

const getGqlResource = (resource: string) => {
    switch (resource) {
        case 'customers':
            return 'Customer';

        case 'categories':
            return 'Category';

        case 'articles':
            return "Articles";

        case 'products':
            return 'Product';

        case 'reviews':
            return 'Review';

        case 'invoices':
            return 'Invoice';
        case 'login':
            return 'Login'
        case 'Customer':
            return 'Customer'
        default:
            throw new Error(`Unknown resource ${resource}`);
    }
};

const customBuildQuery: BuildQueryFactory = introspectionResults => {
    const buildQuery = buildQueryFactory(introspectionResults);

    console.log('customBuildQuery');

    return (type, resource, params) => {
        console.log('customBuildQuery return');
        console.log(type, resource, params)
        const token = localStorage.getItem("token");
        if (type === GET_LIST && resource === 'Category') {
            return {
                query: gql`query Query {
                    getCategoriesForAdmin {
                        id
                        name
                        icon
                    }
                }`,
                parseResponse: ({ data }: ApolloQueryResult<any>) => {
                    if (data.getCategoriesForAdmin) {
                        return  {data: data.getCategoriesForAdmin, total: 123};
                    }
                    throw new Error(`Could not delete ${resource}`);
                },
            };
        }

        if (type === GET_LIST && resource === 'Articles') {
            return {
                query: gql`query Query($search: String) {
                    getArticlesForAdmin(search: $search) {
                        id
                        title
                        short_description
                        description
                        viewed_count
                        likes_count
                        dislikes_count
                        comments_count
                    }
                }`,
                variables: {search: null},
                parseResponse: ({ data }: ApolloQueryResult<any>) => {
                    if (data.getArticlesForAdmin) {
                        return  {data: data.getArticlesForAdmin, total: 123};
                    }
                    throw new Error(`Could not delete ${resource}`);
                },
            };
        }
        if (type === DELETE && resource === 'Articles') {
            return {
                query: gql`
                    mutation Mutation($deleteArticleByAdminId: ID!) {
                        deleteArticleByAdmin(id: $deleteArticleByAdminId) {
                            code
                            message
                        }
                    }
                `,
                variables: {deleteArticleByAdminId: params.id},
                parseResponse: ({ data }: ApolloQueryResult<any>) => {
                    if (data.deleteArticleByAdmin) {
                        return {data: {id:params.id }};
                    }
                    throw new Error(`Error`);
                },
            }
        }
        if (type === UPDATE && resource === 'Category') {
            console.log('edhbvejhdbvjebv', params)
            return {
                query: gql`mutation Mutation($updateCategoryId: ID!, $category: CategoryUpdateInput!) {
                    updateCategory(id: $updateCategoryId, category: $category) {
                        code
                        message
                    }
                }`,
                variables: {
                    updateCategoryId: params.id,
                    category: {
                        "name": `${params.data.name}`,
                        "icon": `${params.data.icon}`
                    }
                    },
                parseResponse: ({ data }: ApolloQueryResult<any>) => {
                    if (data.updateCategory) {
                        return {data: {id: params.id}};
                    }
                    throw new Error(`Error`);
                },
            }
        }

        if (type === DELETE && resource === 'Category') {
            return {
                query: gql`mutation Mutation($deleteCategoryId: ID!) {
                    deleteCategory(id: $deleteCategoryId) {
                        code
                        message
                    }
                }`,
                variables: { deleteCategoryId: params.id },
                parseResponse: ({ data }: ApolloQueryResult<any>) => {
                    if (data[`deleteCategory`]) {
                        return { data: { id: params.id } };
                    }

                    throw new Error(`Could not delete ${resource}`);
                },
            };
        }
        if (type === UPDATE && resource === 'Customer') {
            return {
                query: gql`mutation Mutation($updateUserByAdmin: UpdateUserByAdminRequest) {
                    updateUserByAdmin(updateUserByAdmin: $updateUserByAdmin) {
                        code
                        message
                    }
                }`,
                variables: {
                    updateUserByAdmin: {
                        "userId": params.id,
                        "first_name": params.data.first_name,
                        "last_name": params.data.last_name,
                        "gender": params.data.gender,
                        "dob": params.data.dob,
                        "visibility": null,
                        "lat": null,
                        "lng": null,
                        "about_me": null,
                        "ready_to_meet": null,
                        "notification_radius": null,
                        "experience_points": null,
                        "phone": params.data.phone,
                        "country": params.data.country,
                        "city": params.data.city,
                        "image_id": null
                    }
                },
                parseResponse: ({ data }: ApolloQueryResult<any>) => {
                    if (data.updateUserByAdmin) {
                        return {data: {id: params.id}};
                    }
                    throw new Error(`Error`);
                },
            }
        }
        if (type === UPDATE && resource === 'Articles') {
            return {
                query: gql`mutation UpdateArticleByAdmin($updateArticleByAdminId: ID!, $updateArticleByAdminRequest: UpdateArticleByAdminRequest) {
                    updateArticleByAdmin(id: $updateArticleByAdminId, updateArticleByAdminRequest: $updateArticleByAdminRequest) {
                        ... on Result {
                            code
                            message
                        }
                        ... on Article {
                            id
                            title
                            short_description
                            description
                            viewed_count
                            likes_count
                            dislikes_count
                            comments_count
                            friendshipStatus
                            createdAt
                            updatedAt
                        }
                    }
                }`,
                variables: {
                    updateArticleByAdminId: params.id,
                    updateArticleByAdminRequest: {
                        title: params.data.title,
                        short_description: params.data.short_description,
                        description: params.data.description
                }},
                parseResponse: ({ data }: ApolloQueryResult<any>) => {
                    if (data.updateArticleByAdmin) {
                        return {data: data.updateArticleByAdmin};
                    }
                    throw new Error(`Error`);
                },
            }
        }
        if (type === GET_ONE && resource === 'Articles') {
            return {
                query: gql`query Query($articleId: ID!) {
                    article(id: $articleId) {
                        id
                        title
                        short_description
                        description
                        viewed_count
                        likes_count
                        dislikes_count
                        comments_count
                        cover_image {
                            downloadUrl
                        }
                        categories {
                            id
                            name
                        }
                        likes {
                            id
                            user_id
                            article_id
                            isLike
                            user {
                                id
                                first_name
                                last_name
                            }
                        }
                        dislikes {
                            id
                            user {
                                id
                                email
                                first_name
                                last_name
                            }
                        }
                        comments {
                            id
                            likes_count
                            dislikes_count
                            user {
                                id
                                email
                                first_name
                                last_name
                            }
                        }
                    }
                }`,
                variables: { articleId: params.id },
                parseResponse: ({ data }: ApolloQueryResult<any>) => {
                    if (data.article) {
                        return  {data: data.article};
                    }
                    throw new Error(`Error`);
                },
            };
        }
        if (type  === GET_MANY_REFERENCE && "Articles") {
            return {
                query: gql`query Query($categoryId: ID!) {
                    getArticlesByCategoryId(categoryId: $categoryId) {
                        id
                        title
                        short_description
                        description
                        viewed_count
                        likes_count
                        dislikes_count
                        comments_count
                    }
                }`,
                variables: { categoryId: params.id },
                parseResponse: ({ data }: ApolloQueryResult<any>) => {
                    if (data.getArticlesByCategoryId) {
                        return  {data: data.getArticlesByCategoryId, total: 123};
                    }
                    throw new Error(`Error`);
                },
            };
        }
        if (type === GET_ONE && resource === 'Category') {
            return {
                query: gql`query Query($categoryId: ID!) {
                    category(id: $categoryId) {
                        id
                        name
                        icon
                    }
                }`,
                variables: { categoryId: params.id },
                parseResponse: ({ data }: ApolloQueryResult<any>) => {
                    if (data.category) {
                        return  {data: data.category};
                    }
                    throw new Error(`Error`);
                },
            };
        }
        if (type === GET_ONE && resource === 'Customer') {
            return {
                query: gql`query Query($userId: ID!) {
                    user(id: $userId) {
                        id
                        email
                        first_name
                        last_name
                        dob
                        gender
                        phone
                        country
                        city
                    },
                }`,
                variables: { userId: params.id },
                parseResponse: ({ data }: ApolloQueryResult<any>) => {
                    if (data.user) {
                        return  {data: data.user};
                    }
                    throw new Error(`Error`);
                },
            };
        }
        if (type === CREATE && resource === 'Login') {
            return {
                query: gql`mutation Mutation($email: String!, $password: String!) {
                    loginAdmin(email: $email, password: $password) {
                        ... on Token {
                            token
                            first_name
                            last_name
                        }
                        ... on BadRequestError {
                            code
                        }
                        ... on NotFoundError {
                            code
                            message
                        }
                    }
                }`,
                variables: {
                        email: params.data.email,
                        password: params.data.password
                    },
                parseResponse: ({ data }: ApolloQueryResult<any>) => {
                    const token = data.loginAdmin?.token
                    if (token) {
                        return  {data: {id: 1, token,
                                first_name: data.loginAdmin?.first_name,
                                last_name: data.loginAdmin?.last_name,
                        }};
                    }
                    throw new Error(data.loginAdmin.message);
                },
            };
        }
        if (type === GET_LIST && resource === 'Product') {
            return {
                query: gql`query Query {
                    articles {
                        id
                        title
                        short_description
                        description
                        viewed_count
                        likes_count
                        dislikes_count
                        comments_count
                        cover_image {
                            downloadUrl
                        }
                        user {
                            id
                            first_name
                            last_name
                        }
                        categories {
                            id
                            name
                            icon
                        }
                        comments {
                            id
                            text
                            likes_count
                            dislikes_count
                        }
                    }
                }`,
                parseResponse: ({ data }: ApolloQueryResult<any>) => {
                    if (data.articles) {
                        return  {data: data.articles, total: 123};
                    }
                    throw new Error(`Error articles`);
                },
            };
        }
        if (type === GET_LIST && resource === 'Customer') {
            return {
                query: gql`query Query {
                    users {
                        id
                        email
                        first_name
                        last_name
                        createdAt
                        profile_image {
                            downloadUrl
                        }
                        experience_points
                        accountLevel {
                            name
                            id
                        }
                    }
                }`,
                parseResponse: ({ data }: ApolloQueryResult<any>) => {
                    if (data.users) {
                        return  {data: data.users, total: 123};
                    }
                    throw new Error(`Could not delete ${resource}`);
                },
            };
        }
        if (type === DELETE) {
            return {
                query: gql`mutation remove${resource}($id: ID!) {
                    remove${resource}(id: $id) {
                        id
                    }
                }`,
                variables: { id: params.id },
                parseResponse: ({ data }: ApolloQueryResult<any>) => {
                    if (data[`remove${resource}`]) {
                        return { data: { id: params.id } };
                    }

                    throw new Error(`Could not delete ${resource}`);
                },
            };
        }

        if (resource === 'Customer' && type === CREATE) {
            return {
                query: gql`
                    mutation createCustomer(
                        $first_name: String!
                        $last_name: String!
                        $email: String!
                        $address: String
                        $zipcode: String
                        $city: String
                        $stateAbbr: String
                        $birthday: Date
                        $first_seen: Date!
                        $last_seen: Date!
                        $has_ordered: Boolean!
                        $latest_purchase: Date
                        $has_newsletter: Boolean!
                        $groups: [String]!
                        $nb_commands: Int!
                        $total_spent: Float!
                    ) {
                        createCustomer(
                            first_name: $first_name
                            last_name: $last_name
                            email: $email
                            address: $address
                            zipcode: $zipcode
                            city: $city
                            stateAbbr: $stateAbbr
                            birthday: $birthday
                            first_seen: $first_seen
                            last_seen: $last_seen
                            has_ordered: $has_ordered
                            latest_purchase: $latest_purchase
                            has_newsletter: $has_newsletter
                            groups: $groups
                            nb_commands: $nb_commands
                            total_spent: $total_spent
                        ) {
                            id
                        }
                    }
                `,
                variables: params.data,
                parseResponse: ({ data }: ApolloQueryResult<any>) => {
                    if (data.createCustomer) {
                        return { data: { id: data.createCustomer.id } };
                    }

                    throw new Error(`Could not create Customer`);
                },
            };
        }

        return buildQuery(type, resource, params);
    };
};

export default async () => {
    const token = localStorage.getItem("token");
    const authLink = setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists
        const token = localStorage.getItem("token");
        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            },
        };
    });
    const httpLink = createHttpLink({
        uri: `https://cryptomoto.app/graphql`,
    });
    const dataProvider = await buildApolloClient({
        clientOptions: {
            link: authLink.concat(httpLink),
            cache: new InMemoryCache()
        },
        introspection: {
            operationNames: {
                [DELETE]: (resource: IntrospectionType) =>
                    `remove${resource.name}`,
            },
        },
        buildQuery: customBuildQuery,
    });
    return new Proxy<DataProvider>(defaultDataProvider, {
        get: (target, name) => {
            if (typeof name === 'symbol' || name === 'then') {
                return;
            }
            return async (resource: string, params: any) => {
                console.log('NAME', name)
                return dataProvider[name](getGqlResource(resource), params);
            };
        },
    });
};
// Only used to initialize proxy
const defaultDataProvider: DataProvider = {
    create: () => Promise.reject({ data: null }), // avoids adding a context in tests
    delete: () => Promise.reject({ data: null }), // avoids adding a context in tests
    deleteMany: () => Promise.resolve({ data: [] }), // avoids adding a context in tests
    getList: () => Promise.resolve({ data: [], total: 0 }), // avoids adding a context in tests
    getMany: () => Promise.resolve({ data: [] }), // avoids adding a context in tests
    getManyReference: () => Promise.resolve({ data: [], total: 0 }), // avoids adding a context in tests
    getOne: () => Promise.reject({ data: null }), // avoids adding a context in tests
    update: () => Promise.reject({ data: null }), // avoids adding a context in tests
    updateMany: () => Promise.resolve({ data: [] }), // avoids adding a context in tests
    login: () => Promise.resolve({ data: [] }), // avoids adding a context in tests
};
