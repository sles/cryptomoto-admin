import simpleRestProvider from 'ra-data-simple-rest';
import { DataProvider } from 'react-admin';

const originalRestProvider = simpleRestProvider('http://localhost:4000');

const restProvider: DataProvider = {
    ...originalRestProvider,
    getOne: (...args) => {
        console.log('getOne');
        console.log(args);

        return originalRestProvider.getOne(...args);
    },
    getMany: (...args) => {
        console.log('getMany');
        console.log(args);

        return originalRestProvider.getMany(...args);
    },
    banUser: (userId: number) => {
        console.log(`banUser, userId: ${userId}`);

        return 123;

        // return fetch(`/api/user/${userId}/ban`, { method: 'POST' })
        //     .then(response => response.json());
    },
};

const delayedDataProvider = new Proxy(restProvider, {
    get: (target, name, self) =>
        name === 'then' // as we await for the dataProvider, JS calls then on it. We must trap that call or else the dataProvider will be called with the then method
            ? self
            : (resource: string, params: any) =>
                  new Promise(resolve =>
                      setTimeout(
                          () =>
                              resolve(
                                  restProvider[name as string](resource, params)
                              ),
                          500
                      )
                  ),
});

export default delayedDataProvider;
