<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210323071413 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE deaths ADD mother_id INT DEFAULT NULL, ADD epoux_id INT DEFAULT NULL, ADD father_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE deaths ADD CONSTRAINT FK_C73F8511B78A354D FOREIGN KEY (mother_id) REFERENCES persons (id)');
        $this->addSql('ALTER TABLE deaths ADD CONSTRAINT FK_C73F8511EE5AE7FC FOREIGN KEY (epoux_id) REFERENCES persons (id)');
        $this->addSql('ALTER TABLE deaths ADD CONSTRAINT FK_C73F85112055B9A2 FOREIGN KEY (father_id) REFERENCES persons (id)');
        $this->addSql('CREATE INDEX IDX_C73F8511B78A354D ON deaths (mother_id)');
        $this->addSql('CREATE INDEX IDX_C73F8511EE5AE7FC ON deaths (epoux_id)');
        $this->addSql('CREATE INDEX IDX_C73F85112055B9A2 ON deaths (father_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE deaths DROP FOREIGN KEY FK_C73F8511B78A354D');
        $this->addSql('ALTER TABLE deaths DROP FOREIGN KEY FK_C73F8511EE5AE7FC');
        $this->addSql('ALTER TABLE deaths DROP FOREIGN KEY FK_C73F85112055B9A2');
        $this->addSql('DROP INDEX IDX_C73F8511B78A354D ON deaths');
        $this->addSql('DROP INDEX IDX_C73F8511EE5AE7FC ON deaths');
        $this->addSql('DROP INDEX IDX_C73F85112055B9A2 ON deaths');
        $this->addSql('ALTER TABLE deaths DROP mother_id, DROP epoux_id, DROP father_id');
    }
}
