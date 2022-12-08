import * as React from 'react';
import {Admin, CustomRoutes, EditGuesser, ListGuesser, Resource, ShowGuesser} from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import { Route } from 'react-router';

import authProvider from './authProvider';
import { Login, Layout } from './layout';
import englishMessages from './i18n/en';
import { lightTheme } from './layout/themes';

import visitors from './visitors';
import products from './products';
import invoices from './invoices';
import categories from './categories';
import dataProviderFactory from './dataProvider';
import Configuration from './configuration/Configuration';
import Segments from './segments/Segments';
import { createBrowserHistory as createHistory } from 'history';
import {ArticleList} from "./articles/ArticleList";
import {ArticleEdit} from "./articles/ArticleEdit";
import {ArticleShow} from "./articles/ArticleShow";
import ArticleCreate from "./articles/ArticleCreate";

const i18nProvider = polyglotI18nProvider(locale => {
    if (locale === 'fr') {
        return import('./i18n/fr').then(messages => messages.default);
    }

    // Always fallback on english
    return englishMessages;
}, 'en');


const history = createHistory();
const App = () => {
    return (
        <Admin
            history={history}
            title=""
            dataProvider={dataProviderFactory(
                process.env.REACT_APP_DATA_PROVIDER || ''
            )}
            authProvider={authProvider}
            // dashboard={Dashboard}
            loginPage={Login}
            layout={Layout}
            i18nProvider={i18nProvider}
            disableTelemetry
            theme={lightTheme}
        >
            <CustomRoutes>
                <Route path="/configuration" element={<Configuration />} />
                <Route path="/segments" element={<Segments />} />
            </CustomRoutes>
            <Resource name="customers" {...visitors} />
            {/*<Resource*/}
            {/*    name="commands"*/}
            {/*    {...orders}*/}
            {/*    options={{ label: 'Orders' }}*/}
            {/*/>*/}
            <Resource name="invoices" {...invoices} />
            <Resource name="products" {...products} />
            <Resource name="categories" {...categories} />

            <Resource name="articles" list={ArticleList}
                      create={ArticleCreate}
                      edit={ArticleEdit}
                      show={ArticleShow} />
            {/*<Resource name="reviews" {...reviews} />*/}
        </Admin>
    );
};

export default App;
