<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210328120249 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE officier ADD poste_id INT NOT NULL');
        $this->addSql('ALTER TABLE officier ADD CONSTRAINT FK_614CA6AA0905086 FOREIGN KEY (poste_id) REFERENCES commune (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_614CA6AA0905086 ON officier (poste_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE officier DROP CONSTRAINT FK_614CA6AA0905086');
        $this->addSql('DROP INDEX IDX_614CA6AA0905086');
        $this->addSql('ALTER TABLE officier DROP poste_id');
    }
}
