<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210323064105 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE deaths ADD declarant_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE deaths ADD CONSTRAINT FK_C73F8511EC439BC FOREIGN KEY (declarant_id) REFERENCES persons (id)');
        $this->addSql('CREATE INDEX IDX_C73F8511EC439BC ON deaths (declarant_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE deaths DROP FOREIGN KEY FK_C73F8511EC439BC');
        $this->addSql('DROP INDEX IDX_C73F8511EC439BC ON deaths');
        $this->addSql('ALTER TABLE deaths DROP declarant_id');
    }
}
