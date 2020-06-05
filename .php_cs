<?php

require_once __DIR__ . '/vendor/tareq1988/wp-php-cs-fixer/loader.php';

$header = <<<'EOF'
This file is part of weDocs.

(c) Tareq Hasan <tareq@wedevs.com>

This source file is subject to the GNU GPL v2 or later
that is bundled with this source code in the file LICENSE.
EOF;

$finder = PhpCsFixer\Finder::create()
    ->exclude('node_modules')
    ->exclude('vendors')
    ->exclude('assets')
    ->exclude('languages')
    ->in( __DIR__ )
;

$config = PhpCsFixer\Config::create()
    ->registerCustomFixers([
        new WeDevs\Fixer\SpaceInsideParenthesisFixer(),
        new WeDevs\Fixer\BlankLineAfterClassOpeningFixer()
    ])
    ->setRiskyAllowed(true)
    ->setUsingCache(false)
    ->setRules( WeDevs\Fixer\Fixer::rules() )
    ->setFinder( $finder )
;

return $config;
