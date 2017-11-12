import FileNameListView from '../sql/list/FileNameListView'
import QueryResultsView from '../sql/query/QueryResultsView'
import LogsListView from '../log/LogsListView'

export function getRoutesDefinition(rootStore) {

    const {
        translationStore,
        queryResultsStore,
        fileNameListStore,
        logsListStore,
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
            onMatch: (fileName) => queryResultsStore.fetchQueryResults(fileName)
        },
        {
            pathPattern: '/logs',
            component: LogsListView,
            getTitle: () => getText('app.logs.list.title'),
            onMatch: () => logsListStore.fetchLogsList()
        }
    ]
}

export const onNoRouteFound = {
    redirectTo: '/sql',
    // displayComponent: NoRouteFoundView
};