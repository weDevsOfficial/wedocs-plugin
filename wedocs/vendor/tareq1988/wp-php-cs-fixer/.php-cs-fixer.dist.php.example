<?php
require_once __DIR__ . '/vendor/tareq1988/wp-php-cs-fixer/loader.php';

$finder = PhpCsFixer\Finder::create()
    ->exclude('node_modules')
    ->exclude('vendors')
    ->in( __DIR__ )
;

$config = new PhpCsFixer\Config();
$config
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
