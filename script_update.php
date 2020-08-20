<?php

// Check if is a Git repo
if ( shell_exec('git rev-parse --is-inside-work-tree') ) {
    // Download only the new code
    echo shell_exec('git checkout master');
    echo shell_exec('git pull origin master');

    // Load new files to projects if it has
    echo shell_exec('composer du');

    // Make database changes if it has
    echo shell_exec('php artisan migrate');

    // Reload Route, Config and others Caches
    echo shell_exec('php artisan optimize');

}else {
    echo 'This is not a GIT repo';
}
