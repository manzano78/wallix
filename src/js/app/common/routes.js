import NamedQueryListView from '../sql/list/NamedQueryListView'
import NamedQueryResultsView from '../sql/NamedQueryResultsView'

export function getRoutesDefinition(rootStore) {

    const {
        translationStore,
        namedQueryResultsStore,
        namedQueryListStore
    } = rootStore;

    const {getText} = translationStore;

    return [
        {
            pathPattern: '/sql',
            component: NamedQueryListView,
            getTitle: () => getText('app.sql.queries.title'),
            onMatch: () => namedQueryListStore.fetchNamedQueries()
        },
        {
            pathPattern: '/sql/:namedQuery',
            component: NamedQueryResultsView,
            getTitle: () => getText('app.sql.results.title'),
            onMatch: (namedQuery) => namedQueryResultsStore.fetchRows(namedQuery)
        },
        {
            pathPattern: '/logs',
            component: NamedQueryListView,
            getTitle: () => getText('app.sql.list.title'),
            onMatch: () => namedQueryListStore.fetchNamedQueries()
        }
    ]
}

export const onNoRouteFound = {
    redirectTo: '/sql',
    // displayComponent: NoRouteFound
};