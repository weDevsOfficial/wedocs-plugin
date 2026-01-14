<?php

declare(strict_types=1);

namespace WeDevs\Fixer;

/**
 * The Fixer Trait.
 */
trait FixerName
{
    public function getName(): string
    {
        $name = parent::getName();

        return 'WeDevs/'.$name;
    }
}
