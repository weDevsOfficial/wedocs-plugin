# PHP CS Fixer: WordPress fixers

A set of custom fixers for [PHP CS Fixer](https://github.com/FriendsOfPHP/PHP-CS-Fixer), specially for WordPress.

### What is php-cs-fixer?

The [php-cs-fixer](https://github.com/FriendsOfPHP/PHP-CS-Fixer) or [PHP Coding Standards Fixer](https://cs.symfony.com/) is an awesome tool created by the super awesome people at [Symfony](https://symfony.com/).

It helps your PHP code/repository to follow a certain coding standard defined by you team.

### What are WordPress Fixers?

WordPress uses a bit different coding standard from the rest of the world. It doesn't follow PSR standards yet.

The aim of this WordPress specific fixers is to allow WordPress developers to standardize their code according to the [WordPress Coding Standard](https://make.wordpress.org/core/handbook/best-practices/coding-standards/php/).

#### Available Fixers

1. **Space Inside Parenthesis**: This fixer ensures that when defining functions, if/else blocks, or control structures which have parenthesis, a space after the starting parenthesis and before the ending parenthesis exists. Rule name: `WeDevs/space_inside_parenthesis`.
2. **Blank Line After Class Opening**: PSR standards have the class opening brace on a new line, WordPress follows the same line standard. This ensures after the opening brace, one blank line exists (equals to two `\n`). Rule name: `WeDevs/blank_line_after_class_opening`.

## Installation
PHP CS Fixer: custom fixers can be installed by running:

```bash
composer require --dev tareq1988/wp-php-cs-fixer
```

## Usage
In your PHP CS Fixer configuration (`.php-cs-fixer.dist.php`) register fixers and use them:

```diff
 <?php
 // add the custom fixers
+ require_once __DIR__ . '/vendor/tareq1988/wp-php-cs-fixer/loader.php';

 $finder = PhpCsFixer\Finder::create()
    ->exclude('node_modules')
    ->exclude('vendors')
    ->in( __DIR__ )
 ;

 $config = new PhpCsFixer\Config();
 $config
+    ->registerCustomFixers([
+        new WeDevs\Fixer\SpaceInsideParenthesisFixer(),
+        new WeDevs\Fixer\BlankLineAfterClassOpeningFixer()
+     ])
+    ->setRules( WeDevs\Fixer\Fixer::rules() )
     ->setFinder( $finder )
;

 return $config;
```

The `WeDevs\Fixer\Fixer::rules()` function simplifies the usage of the WordPress specific rules. However, if you want more control and have different taste, you can copy/paste the rules from the `WeDevs\Fixer\Fixer` class to the `.php_cs` file if you want to.

### Example File

The example [.php_cs.example](https://github.com/tareq1988/wp-php-cs-fixer/blob/master/.php-cs-fixer.dist.php.example) file should be a fine starting point for your plugins. Just drop the file into your plugin folder by renaming to `.php-cs-fixer.dist.php` and you are good to go.

Upon configuring everything, run `php-cs-fixer fix` from the commandline.
