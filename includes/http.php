<?php

if(!function_exists('resolveCachePath')) {
    /**
     * @inheritDoc
     * @param string $file Path to cache file
     *
     * @return string
     */
    function resolveCachePath($file) {
        if(!file_exists(CACHE_LOCATION)) {
            if (!mkdir(CACHE_LOCATION, 0777, true) && !is_dir(CACHE_LOCATION)) {
                throw new \RuntimeException(sprintf('Directory "%s" was not created', CACHE_LOCATION));
            }
        }

        return CACHE_LOCATION . '/' . $file;
    }
}

if(!function_exists('fileTTL')) {
    /**
     * @inheritDoc
     * @param string $filePath Path to cache file
     *
     * @return int
     */
    function fileTTL($filePath) {
        if(!file_exists($filePath)) {
            return 0;
        }

        return filemtime($filePath);
    }
}

if(!function_exists('cacheFetchURL')) {
    /**
     * @inheritDoc
     * @param string $name Cache key
     * @param string $url URL to load data from
     * @param int $cacheFor Cache ttl in seconds
     *
     * @return bool|false|string
     */
    function cacheFetchURL($name, $url, $cacheFor = 600) {
        $cachePath = resolveCachePath($name);
        clearstatcache(true, $cachePath);

        if (!file_exists($cachePath) || fileTTL($cachePath) < time() - $cacheFor) {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_FAILONERROR, true);
            curl_setopt($ch, CURLOPT_URL, $url);

            $response = curl_exec($ch);
            $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

            if($responseCode === 200) {
                file_put_contents($cachePath, $response);
                touch($cachePath);
            }

            curl_close($ch);
        }

        return file_get_contents($cachePath);
    }
}