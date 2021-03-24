<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210324074528 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE divorces DROP INDEX UNIQ_B395D454E3037FC8, ADD INDEX IDX_B395D454E3037FC8 (man_id)');
        $this->addSql('ALTER TABLE divorces DROP INDEX UNIQ_B395D454EC88A587, ADD INDEX IDX_B395D454EC88A587 (woman_id)');
        $this->addSql('ALTER TABLE divorces CHANGE man_id man_id INT DEFAULT NULL, CHANGE woman_id woman_id INT DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE divorces DROP INDEX IDX_B395D454E3037FC8, ADD UNIQUE INDEX UNIQ_B395D454E3037FC8 (man_id)');
        $this->addSql('ALTER TABLE divorces DROP INDEX IDX_B395D454EC88A587, ADD UNIQUE INDEX UNIQ_B395D454EC88A587 (woman_id)');
        $this->addSql('ALTER TABLE divorces CHANGE man_id man_id INT NOT NULL, CHANGE woman_id woman_id INT NOT NULL');
    }
}
