<?php

if(!function_exists('sanitize')) {
    /**
     * @inheritDoc
     * @param string $input User input
     *
     * @return string
     */
    function sanitize($input) {
        return htmlspecialchars(stripslashes(trim($input)));
    }
}

