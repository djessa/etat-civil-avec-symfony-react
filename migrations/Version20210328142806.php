<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210328142806 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE naissance ADD heure_declaration TIME(0) WITHOUT TIME ZONE DEFAULT NULL');
        $this->addSql('ALTER TABLE naissance ADD heure_naissance TIME(0) WITHOUT TIME ZONE DEFAULT NULL');
        $this->addSql('ALTER TABLE naissance ALTER date_declaration TYPE DATE');
        $this->addSql('ALTER TABLE naissance ALTER date_declaration DROP DEFAULT');
        $this->addSql('ALTER TABLE naissance ALTER date_naissance TYPE DATE');
        $this->addSql('ALTER TABLE naissance ALTER date_naissance DROP DEFAULT');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE naissance DROP heure_declaration');
        $this->addSql('ALTER TABLE naissance DROP heure_naissance');
        $this->addSql('ALTER TABLE naissance ALTER date_declaration TYPE TIMESTAMP(0) WITHOUT TIME ZONE');
        $this->addSql('ALTER TABLE naissance ALTER date_declaration DROP DEFAULT');
        $this->addSql('ALTER TABLE naissance ALTER date_naissance TYPE TIMESTAMP(0) WITHOUT TIME ZONE');
        $this->addSql('ALTER TABLE naissance ALTER date_naissance DROP DEFAULT');
    }
}
