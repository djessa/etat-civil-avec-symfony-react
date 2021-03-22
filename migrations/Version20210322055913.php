<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210322055913 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE births (id INT AUTO_INCREMENT NOT NULL, person_id INT NOT NULL, father_id INT NOT NULL, mother_id INT NOT NULL, declarant_id INT DEFAULT NULL, date_declaration DATETIME NOT NULL, type_declaration VARCHAR(255) NOT NULL, judgment_number VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_963A737C217BBB47 (person_id), INDEX IDX_963A737C2055B9A2 (father_id), INDEX IDX_963A737CB78A354D (mother_id), INDEX IDX_963A737CEC439BC (declarant_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE deaths (id INT AUTO_INCREMENT NOT NULL, person_id INT NOT NULL, date_of_death DATETIME NOT NULL, place_of_death VARCHAR(255) NOT NULL, reason VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_C73F8511217BBB47 (person_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE divorces (id INT AUTO_INCREMENT NOT NULL, man_id INT NOT NULL, woman_id INT NOT NULL, date_etablissement DATETIME NOT NULL, decision_number VARCHAR(255) NOT NULL, date_decision DATETIME NOT NULL, UNIQUE INDEX UNIQ_B395D454E3037FC8 (man_id), UNIQUE INDEX UNIQ_B395D454EC88A587 (woman_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE marriages (id INT AUTO_INCREMENT NOT NULL, man_id INT NOT NULL, woman_id INT NOT NULL, witness_man_id INT DEFAULT NULL, witness_woman_id INT DEFAULT NULL, created_at DATETIME NOT NULL, lieu VARCHAR(255) NOT NULL, INDEX IDX_E1DF582BE3037FC8 (man_id), INDEX IDX_E1DF582BEC88A587 (woman_id), INDEX IDX_E1DF582BA9F25623 (witness_man_id), INDEX IDX_E1DF582B13B05D3D (witness_woman_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE persons (id INT AUTO_INCREMENT NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, sexe VARCHAR(255) DEFAULT NULL, birthdate DATETIME NOT NULL, birthplace VARCHAR(255) DEFAULT NULL, profession VARCHAR(255) DEFAULT NULL, city VARCHAR(255) DEFAULT NULL, address VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE births ADD CONSTRAINT FK_963A737C217BBB47 FOREIGN KEY (person_id) REFERENCES persons (id)');
        $this->addSql('ALTER TABLE births ADD CONSTRAINT FK_963A737C2055B9A2 FOREIGN KEY (father_id) REFERENCES persons (id)');
        $this->addSql('ALTER TABLE births ADD CONSTRAINT FK_963A737CB78A354D FOREIGN KEY (mother_id) REFERENCES persons (id)');
        $this->addSql('ALTER TABLE births ADD CONSTRAINT FK_963A737CEC439BC FOREIGN KEY (declarant_id) REFERENCES persons (id)');
        $this->addSql('ALTER TABLE deaths ADD CONSTRAINT FK_C73F8511217BBB47 FOREIGN KEY (person_id) REFERENCES persons (id)');
        $this->addSql('ALTER TABLE divorces ADD CONSTRAINT FK_B395D454E3037FC8 FOREIGN KEY (man_id) REFERENCES persons (id)');
        $this->addSql('ALTER TABLE divorces ADD CONSTRAINT FK_B395D454EC88A587 FOREIGN KEY (woman_id) REFERENCES persons (id)');
        $this->addSql('ALTER TABLE marriages ADD CONSTRAINT FK_E1DF582BE3037FC8 FOREIGN KEY (man_id) REFERENCES persons (id)');
        $this->addSql('ALTER TABLE marriages ADD CONSTRAINT FK_E1DF582BEC88A587 FOREIGN KEY (woman_id) REFERENCES persons (id)');
        $this->addSql('ALTER TABLE marriages ADD CONSTRAINT FK_E1DF582BA9F25623 FOREIGN KEY (witness_man_id) REFERENCES persons (id)');
        $this->addSql('ALTER TABLE marriages ADD CONSTRAINT FK_E1DF582B13B05D3D FOREIGN KEY (witness_woman_id) REFERENCES persons (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE births DROP FOREIGN KEY FK_963A737C217BBB47');
        $this->addSql('ALTER TABLE births DROP FOREIGN KEY FK_963A737C2055B9A2');
        $this->addSql('ALTER TABLE births DROP FOREIGN KEY FK_963A737CB78A354D');
        $this->addSql('ALTER TABLE births DROP FOREIGN KEY FK_963A737CEC439BC');
        $this->addSql('ALTER TABLE deaths DROP FOREIGN KEY FK_C73F8511217BBB47');
        $this->addSql('ALTER TABLE divorces DROP FOREIGN KEY FK_B395D454E3037FC8');
        $this->addSql('ALTER TABLE divorces DROP FOREIGN KEY FK_B395D454EC88A587');
        $this->addSql('ALTER TABLE marriages DROP FOREIGN KEY FK_E1DF582BE3037FC8');
        $this->addSql('ALTER TABLE marriages DROP FOREIGN KEY FK_E1DF582BEC88A587');
        $this->addSql('ALTER TABLE marriages DROP FOREIGN KEY FK_E1DF582BA9F25623');
        $this->addSql('ALTER TABLE marriages DROP FOREIGN KEY FK_E1DF582B13B05D3D');
        $this->addSql('DROP TABLE births');
        $this->addSql('DROP TABLE deaths');
        $this->addSql('DROP TABLE divorces');
        $this->addSql('DROP TABLE marriages');
        $this->addSql('DROP TABLE persons');
    }
}
