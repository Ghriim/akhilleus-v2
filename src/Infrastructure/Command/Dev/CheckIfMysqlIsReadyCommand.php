<?php

namespace App\Infrastructure\Command\Dev;

use Doctrine\Persistence\ManagerRegistry;
use Exception;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

final class CheckIfMysqlIsReadyCommand extends Command
{
    private const TIMEOUT_SECONDS = 30;

    public function __construct(private ManagerRegistry $doctrine)
    {
        parent::__construct('app:mysql-wait');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        try {
            $connection = $this->doctrine->getConnection();
        } catch (Exception $e) {
            $output->writeln('<error>'.$e->getMessage().'</error>');

            return Command::FAILURE;
        }

        $output->writeln('<info>Waiting for database to be ready</info>');

        $ready = false;
        $time = 0;
        do {
            try {
                $connection->executeQuery('SHOW TABLES')->fetchAll();

                $ready = true;
            } catch (Exception) {
                $output->write('.');

                sleep(1);
                ++$time;
            }
        } while (false === $ready && self::TIMEOUT_SECONDS >= $time);

        $output->writeln('');

        if (self::TIMEOUT_SECONDS < $time) {
            $output->writeln('<error>Database timeout reached</error>');

            return Command::INVALID;
        }

        $output->writeln('<comment>Database is now ready</comment>');

        return Command::SUCCESS;
    }
}
