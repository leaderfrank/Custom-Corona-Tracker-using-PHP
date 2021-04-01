<?php

if (!function_exists('__')) {
    function __($key, ...$vars)
    {
        global $translations;

        if (array_key_exists($key, $translations)) {
            return sprintf($translations[$key], ...$vars);
        }

        return $key;
    }
}

if (!function_exists('_n')) {
    function _n($n) {
        $n = (0+str_replace(__('number_separator'), '', $n));
        if (!is_numeric($n)) return false;
        if ($n > 1000000) return number_format(($n/1000000), 2, __('decimal_separator'), __('number_separator')).__('million');
        return number_format($n, 0, __('decimal_separator'), __('number_separator'));
    }
}
