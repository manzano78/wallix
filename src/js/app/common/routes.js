import FileNameListView from '../sql/list/FileNameListView'
import QueryResultsView from '../sql/query/QueryResultsView'

export function getRoutesDefinition(rootStore) {

    const {
        translationStore,
        queryResultsStore,
        fileNameListStore
    } = rootStore;

    const {getText} = translationStore;

    return [
        {
            pathPattern: '/sql',
            component: FileNameListView,
            getTitle: () => getText('app.sql.list.title'),
            onMatch: () => fileNameListStore.fetchFileNameList()
        },
        {
            pathPattern: '/sql/:fileName',
            component: QueryResultsView,
            getTitle: () => getText('app.sql.query.title'),
            onMatch: (fileName) => queryResultsStore.fetchRows(fileName)
        },
        {
            pathPattern: '/logs',
            component: FileNameListView,
            getTitle: () => getText('app.sql.list.title'),
            onMatch: () => fileNameListStore.fetchFileNameList()
        }
    ]
}

export const onNoRouteFound = {
    redirectTo: '/sql',
    // displayComponent: NoRouteFound
};