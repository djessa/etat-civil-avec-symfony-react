<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210315091136 extends AbstractMigration
{
    public function getDescription() : string
    {
        return 'Creation des tables';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE births (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, person_id INTEGER NOT NULL, declarant_id INTEGER DEFAULT NULL, father_id INTEGER NOT NULL, mother_id INTEGER NOT NULL, date_declaration DATETIME NOT NULL, type_declaration VARCHAR(255) NOT NULL, judgment_number VARCHAR(255) DEFAULT NULL)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_963A737C217BBB47 ON births (person_id)');
        $this->addSql('CREATE INDEX IDX_963A737CEC439BC ON births (declarant_id)');
        $this->addSql('CREATE INDEX IDX_963A737C2055B9A2 ON births (father_id)');
        $this->addSql('CREATE INDEX IDX_963A737CB78A354D ON births (mother_id)');
        $this->addSql('CREATE TABLE deaths (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, person_id INTEGER NOT NULL, date_of_death DATETIME NOT NULL, place_of_death VARCHAR(255) NOT NULL, reason VARCHAR(255) NOT NULL)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_C73F8511217BBB47 ON deaths (person_id)');
        $this->addSql('CREATE TABLE divorces (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, man_id INTEGER NOT NULL, woman_id INTEGER NOT NULL, date_etablissement DATETIME NOT NULL, decision_number VARCHAR(255) NOT NULL, date_decision DATETIME NOT NULL)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_B395D454E3037FC8 ON divorces (man_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_B395D454EC88A587 ON divorces (woman_id)');
        $this->addSql('CREATE TABLE marriages (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, man_id INTEGER NOT NULL, woman_id INTEGER NOT NULL, witness_man_id INTEGER DEFAULT NULL, witness_woman_id INTEGER DEFAULT NULL, created_at DATETIME NOT NULL, lieu VARCHAR(255) NOT NULL)');
        $this->addSql('CREATE INDEX IDX_E1DF582BE3037FC8 ON marriages (man_id)');
        $this->addSql('CREATE INDEX IDX_E1DF582BEC88A587 ON marriages (woman_id)');
        $this->addSql('CREATE INDEX IDX_E1DF582BA9F25623 ON marriages (witness_man_id)');
        $this->addSql('CREATE INDEX IDX_E1DF582B13B05D3D ON marriages (witness_woman_id)');
        $this->addSql('CREATE TABLE persons (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, sexe VARCHAR(255) NOT NULL, birthdate DATETIME NOT NULL, birthplace VARCHAR(255) NOT NULL, profession VARCHAR(255) DEFAULT NULL, city VARCHAR(255) DEFAULT NULL, address VARCHAR(255) DEFAULT NULL)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE births');
        $this->addSql('DROP TABLE deaths');
        $this->addSql('DROP TABLE divorces');
        $this->addSql('DROP TABLE marriages');
        $this->addSql('DROP TABLE persons');
    }
}
