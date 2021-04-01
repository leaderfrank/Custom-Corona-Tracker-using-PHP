<?php

error_reporting(E_ERROR);

define('CACHE_LOCATION', __DIR__ . '/.cache');

require_once(__DIR__ . '/includes/input.php');
require_once(__DIR__ . '/includes/http.php');

switch (strtolower(sanitize($_GET['action']))) {
    case 'flag':

        $countryCode = strtoupper(sanitize($_GET['country']));
        $key = 'flag_of_' . $countryCode . '.png';
        $cacheTtl = 365 * 24 * 60 * 60;

        header('Content-Type: image/png');
        header('Cache-Control: public, max-age: ' . $cacheTtl);
        header('ETag: ' . fileTTL(resolveCachePath($key)));

        echo cacheFetchURL(
            $key,
            'https://www.countryflags.io/' . $countryCode . '/flat/64.png',
            $cacheTtl
        );

        break;

    case 'geojson':

        $key = 'geojson.json';
        $cacheTtl = 365 * 24 * 60 * 60;

        header('Content-Type: application/json');
        header('Cache-Control: public, max-age: ' . $cacheTtl);
        header('ETag: ' . fileTTL(resolveCachePath($key)));

        echo cacheFetchURL(
            $key,
            'https://api.quarantine.country/geojson.json',
            $cacheTtl
        );

        break;

    case 'summary':

        $key = 'summary.json';
        $cacheTtl = 5 * 60;

        header('Content-Type: application/json');
        header('Cache-Control: private, max-age: ' . $cacheTtl);
        header('ETag: ' . fileTTL(resolveCachePath($key)));

        echo cacheFetchURL(
            $key,
            'https://api.quarantine.country/api/v1/summary/latest',
            5 * 60
        );

        break;

    case 'spots':

        $key = 'spots.json';
        $cacheTtl = 5 * 60;

        header('Content-Type: application/json');
        header('Cache-Control: private, max-age: ' . $cacheTtl);
        header('ETag: ' . fileTTL(resolveCachePath($key)));

        echo cacheFetchURL(
            $key,
            'https://api.quarantine.country/api/v1/spots/summary',
            $cacheTtl
        );

        break;

    case 'news':

        $key = 'news.json';
        $cacheTtl = 5 * 60;

        header('Content-Type: application/json');
        header('Cache-Control: private, max-age: ' . $cacheTtl);
        header('ETag: ' . fileTTL(resolveCachePath($key)));

        $response = json_decode(
            cacheFetchURL(
                $key,
                'https://tools.cdc.gov/api/v2/resources/media/404952.json',
                $cacheTtl
            ),
            true
        );

        echo json_encode($response['results'][0]['children']);

        break;

    case 'metal-prices':

        $key = 'gold-prices.json';
        $cacheTtl = 5 * 60;

        header('Content-Type: application/json');
        header('Cache-Control: private, max-age: ' . $cacheTtl);
        header('ETag: ' . fileTTL(resolveCachePath($key)));

        echo json_encode([
            'xau' => json_decode(cacheFetchURL(
                $key,
                'https://api.goldprice.pro/api/v1/symbols/4058?spot=1D',
                $cacheTtl
            ), true),
            'xag' => json_decode(cacheFetchURL(
                'silver-prices.json',
                'https://api.goldprice.pro/api/v1/symbols/4057?spot=1D',
                $cacheTtl
            ), true)
        ]);

        break;

    default:
        http_response_code(404);
        break;
}