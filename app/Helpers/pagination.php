<?php

use Illuminate\Contracts\Pagination\LengthAwarePaginator;

if (! function_exists('trimPagination')) {
    function trimPagination(array &$result): void
    {
        unset($result['path'], $result['first_page_url'], $result['last_page_url'], $result['prev_page_url'], $result['next_page_url'], $result['links']);
    }
}

if (! function_exists('mapPaginationItem')) {
    function mapPaginationItem(array &$result, callable $map): void
    {
        $result['data'] = array_map($map, $result['data']);
    }
}

if (! function_exists('preparePaginator')) {
    /**
     * Prepare Paginator for Response as Good Looking Array.
     *
     * @param LengthAwarePaginator $paginator
     * @param callable|null $itemMapCallback
     *
     * @return array
     */
    function preparePaginator(LengthAwarePaginator $paginator, ?callable $itemMapCallback = null): array
    {
        $result = $paginator->toArray();

        if ($itemMapCallback !== null) {
            mapPaginationItem($result, $itemMapCallback);
        }

        trimPagination($result);

        return $result;
    }
}

if (! function_exists('mapPaginatorItem')) {
    /**
     * Prepare Paginator for Response as Good Looking Array.
     *
     * @param LengthAwarePaginator $paginator
     * @param callable $itemMapCallback
     *
     * @return LengthAwarePaginator
     */
    function mapPaginatorItem(LengthAwarePaginator $paginator, callable $itemMapCallback): LengthAwarePaginator
    {
        $paginator->setCollection($paginator->getCollection()->map($itemMapCallback));
        return $paginator;
    }
}
