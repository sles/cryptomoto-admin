import {ApolloQueryResult, createHttpLink, InMemoryCache} from '@apollo/client';
import buildApolloClient, {
    buildQuery as buildQueryFactory,
} from 'ra-data-graphql-simple';
import { BuildQueryFactory } from 'ra-data-graphql';
import {CREATE, DataProvider, DELETE, GET_LIST, GET_ONE} from 'react-admin';
import gql from 'graphql-tag';
import { IntrospectionType } from 'graphql';
import {setContext} from "@apollo/client/link/context";

const getGqlResource = (resource: string) => {
    switch (resource) {
        case 'customers':
            return 'Customer';

        case 'categories':
            return 'Category';

        // case 'commands':
        //     return 'Command';

        case 'products':
            return 'Product';

        case 'reviews':
            return 'Review';

        case 'invoices':
            return 'Invoice';
        case 'login':
            return 'Login'
        default:
            throw new Error(`Unknown resource ${resource}`);
    }
};

const customBuildQuery: BuildQueryFactory = introspectionResults => {
    const buildQuery = buildQueryFactory(introspectionResults);

    console.log('customBuildQuery');

    return (type, resource, params) => {
        console.log('customBuildQuery return');

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
                        gender
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
                    console.log('!!!!!!!!!', token)
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
        uri: "http://localhost:3000/graphql",
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
