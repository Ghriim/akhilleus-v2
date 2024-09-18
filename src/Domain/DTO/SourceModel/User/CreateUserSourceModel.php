<?php

namespace App\Domain\DTO\SourceModel\User;

use App\Domain\DTO\SourceModel\SourceModelInterface;

final class CreateUserSourceModel implements SourceModelInterface
{
    public string $login;

    public string $email;

    public string $plainPassword;
}