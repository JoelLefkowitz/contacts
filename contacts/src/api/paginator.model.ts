export interface PaginatorConfig {
    length: number;
    pageIndex: number;
    pageSize: number;
    previousPageIndex: number;
}

export type Paginated<T> = {
    count: number;
    next: number;
    previous: number;
    results: T[]
}

export const defaultPaginatorConfig = {
    length: 10,
    pageIndex: 0,
    pageSize: 0,
    previousPageIndex: 0,
}