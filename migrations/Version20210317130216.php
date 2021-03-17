<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210317130216 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX IDX_963A737CB78A354D');
        $this->addSql('DROP INDEX IDX_963A737C2055B9A2');
        $this->addSql('DROP INDEX IDX_963A737CEC439BC');
        $this->addSql('DROP INDEX UNIQ_963A737C217BBB47');
        $this->addSql('CREATE TEMPORARY TABLE __temp__births AS SELECT id, person_id, declarant_id, father_id, mother_id, date_declaration, type_declaration, judgment_number FROM births');
        $this->addSql('DROP TABLE births');
        $this->addSql('CREATE TABLE births (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, person_id INTEGER NOT NULL, declarant_id INTEGER DEFAULT NULL, father_id INTEGER NOT NULL, mother_id INTEGER NOT NULL, date_declaration DATETIME NOT NULL, type_declaration VARCHAR(255) NOT NULL COLLATE BINARY, judgment_number VARCHAR(255) DEFAULT NULL COLLATE BINARY, CONSTRAINT FK_963A737C217BBB47 FOREIGN KEY (person_id) REFERENCES persons (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_963A737CEC439BC FOREIGN KEY (declarant_id) REFERENCES persons (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_963A737C2055B9A2 FOREIGN KEY (father_id) REFERENCES persons (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_963A737CB78A354D FOREIGN KEY (mother_id) REFERENCES persons (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO births (id, person_id, declarant_id, father_id, mother_id, date_declaration, type_declaration, judgment_number) SELECT id, person_id, declarant_id, father_id, mother_id, date_declaration, type_declaration, judgment_number FROM __temp__births');
        $this->addSql('DROP TABLE __temp__births');
        $this->addSql('CREATE INDEX IDX_963A737CB78A354D ON births (mother_id)');
        $this->addSql('CREATE INDEX IDX_963A737C2055B9A2 ON births (father_id)');
        $this->addSql('CREATE INDEX IDX_963A737CEC439BC ON births (declarant_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_963A737C217BBB47 ON births (person_id)');
        $this->addSql('DROP INDEX UNIQ_C73F8511217BBB47');
        $this->addSql('CREATE TEMPORARY TABLE __temp__deaths AS SELECT id, person_id, date_of_death, place_of_death, reason FROM deaths');
        $this->addSql('DROP TABLE deaths');
        $this->addSql('CREATE TABLE deaths (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, person_id INTEGER NOT NULL, date_of_death DATETIME NOT NULL, place_of_death VARCHAR(255) NOT NULL COLLATE BINARY, reason VARCHAR(255) NOT NULL COLLATE BINARY, CONSTRAINT FK_C73F8511217BBB47 FOREIGN KEY (person_id) REFERENCES persons (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO deaths (id, person_id, date_of_death, place_of_death, reason) SELECT id, person_id, date_of_death, place_of_death, reason FROM __temp__deaths');
        $this->addSql('DROP TABLE __temp__deaths');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_C73F8511217BBB47 ON deaths (person_id)');
        $this->addSql('DROP INDEX UNIQ_B395D454EC88A587');
        $this->addSql('DROP INDEX UNIQ_B395D454E3037FC8');
        $this->addSql('CREATE TEMPORARY TABLE __temp__divorces AS SELECT id, man_id, woman_id, date_etablissement, decision_number, date_decision FROM divorces');
        $this->addSql('DROP TABLE divorces');
        $this->addSql('CREATE TABLE divorces (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, man_id INTEGER NOT NULL, woman_id INTEGER NOT NULL, date_etablissement DATETIME NOT NULL, decision_number VARCHAR(255) NOT NULL COLLATE BINARY, date_decision DATETIME NOT NULL, CONSTRAINT FK_B395D454E3037FC8 FOREIGN KEY (man_id) REFERENCES persons (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_B395D454EC88A587 FOREIGN KEY (woman_id) REFERENCES persons (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO divorces (id, man_id, woman_id, date_etablissement, decision_number, date_decision) SELECT id, man_id, woman_id, date_etablissement, decision_number, date_decision FROM __temp__divorces');
        $this->addSql('DROP TABLE __temp__divorces');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_B395D454EC88A587 ON divorces (woman_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_B395D454E3037FC8 ON divorces (man_id)');
        $this->addSql('DROP INDEX IDX_E1DF582B13B05D3D');
        $this->addSql('DROP INDEX IDX_E1DF582BA9F25623');
        $this->addSql('DROP INDEX IDX_E1DF582BEC88A587');
        $this->addSql('DROP INDEX IDX_E1DF582BE3037FC8');
        $this->addSql('CREATE TEMPORARY TABLE __temp__marriages AS SELECT id, man_id, woman_id, witness_man_id, witness_woman_id, created_at, lieu FROM marriages');
        $this->addSql('DROP TABLE marriages');
        $this->addSql('CREATE TABLE marriages (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, man_id INTEGER NOT NULL, woman_id INTEGER NOT NULL, witness_man_id INTEGER DEFAULT NULL, witness_woman_id INTEGER DEFAULT NULL, created_at DATETIME NOT NULL, lieu VARCHAR(255) NOT NULL COLLATE BINARY, CONSTRAINT FK_E1DF582BE3037FC8 FOREIGN KEY (man_id) REFERENCES persons (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_E1DF582BEC88A587 FOREIGN KEY (woman_id) REFERENCES persons (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_E1DF582BA9F25623 FOREIGN KEY (witness_man_id) REFERENCES persons (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_E1DF582B13B05D3D FOREIGN KEY (witness_woman_id) REFERENCES persons (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO marriages (id, man_id, woman_id, witness_man_id, witness_woman_id, created_at, lieu) SELECT id, man_id, woman_id, witness_man_id, witness_woman_id, created_at, lieu FROM __temp__marriages');
        $this->addSql('DROP TABLE __temp__marriages');
        $this->addSql('CREATE INDEX IDX_E1DF582B13B05D3D ON marriages (witness_woman_id)');
        $this->addSql('CREATE INDEX IDX_E1DF582BA9F25623 ON marriages (witness_man_id)');
        $this->addSql('CREATE INDEX IDX_E1DF582BEC88A587 ON marriages (woman_id)');
        $this->addSql('CREATE INDEX IDX_E1DF582BE3037FC8 ON marriages (man_id)');
        $this->addSql('CREATE TEMPORARY TABLE __temp__persons AS SELECT id, first_name, last_name, sexe, birthdate, birthplace, profession, city, address FROM persons');
        $this->addSql('DROP TABLE persons');
        $this->addSql('CREATE TABLE persons (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, first_name VARCHAR(255) NOT NULL COLLATE BINARY, last_name VARCHAR(255) NOT NULL COLLATE BINARY, birthdate DATETIME NOT NULL, profession VARCHAR(255) DEFAULT NULL COLLATE BINARY, city VARCHAR(255) DEFAULT NULL COLLATE BINARY, address VARCHAR(255) DEFAULT NULL COLLATE BINARY, sexe VARCHAR(255) DEFAULT NULL, birthplace VARCHAR(255) DEFAULT NULL)');
        $this->addSql('INSERT INTO persons (id, first_name, last_name, sexe, birthdate, birthplace, profession, city, address) SELECT id, first_name, last_name, sexe, birthdate, birthplace, profession, city, address FROM __temp__persons');
        $this->addSql('DROP TABLE __temp__persons');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_963A737C217BBB47');
        $this->addSql('DROP INDEX IDX_963A737CEC439BC');
        $this->addSql('DROP INDEX IDX_963A737C2055B9A2');
        $this->addSql('DROP INDEX IDX_963A737CB78A354D');
        $this->addSql('CREATE TEMPORARY TABLE __temp__births AS SELECT id, person_id, declarant_id, father_id, mother_id, date_declaration, type_declaration, judgment_number FROM births');
        $this->addSql('DROP TABLE births');
        $this->addSql('CREATE TABLE births (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, person_id INTEGER NOT NULL, declarant_id INTEGER DEFAULT NULL, father_id INTEGER NOT NULL, mother_id INTEGER NOT NULL, date_declaration DATETIME NOT NULL, type_declaration VARCHAR(255) NOT NULL, judgment_number VARCHAR(255) DEFAULT NULL)');
        $this->addSql('INSERT INTO births (id, person_id, declarant_id, father_id, mother_id, date_declaration, type_declaration, judgment_number) SELECT id, person_id, declarant_id, father_id, mother_id, date_declaration, type_declaration, judgment_number FROM __temp__births');
        $this->addSql('DROP TABLE __temp__births');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_963A737C217BBB47 ON births (person_id)');
        $this->addSql('CREATE INDEX IDX_963A737CEC439BC ON births (declarant_id)');
        $this->addSql('CREATE INDEX IDX_963A737C2055B9A2 ON births (father_id)');
        $this->addSql('CREATE INDEX IDX_963A737CB78A354D ON births (mother_id)');
        $this->addSql('DROP INDEX UNIQ_C73F8511217BBB47');
        $this->addSql('CREATE TEMPORARY TABLE __temp__deaths AS SELECT id, person_id, date_of_death, place_of_death, reason FROM deaths');
        $this->addSql('DROP TABLE deaths');
        $this->addSql('CREATE TABLE deaths (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, person_id INTEGER NOT NULL, date_of_death DATETIME NOT NULL, place_of_death VARCHAR(255) NOT NULL, reason VARCHAR(255) NOT NULL)');
        $this->addSql('INSERT INTO deaths (id, person_id, date_of_death, place_of_death, reason) SELECT id, person_id, date_of_death, place_of_death, reason FROM __temp__deaths');
        $this->addSql('DROP TABLE __temp__deaths');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_C73F8511217BBB47 ON deaths (person_id)');
        $this->addSql('DROP INDEX UNIQ_B395D454E3037FC8');
        $this->addSql('DROP INDEX UNIQ_B395D454EC88A587');
        $this->addSql('CREATE TEMPORARY TABLE __temp__divorces AS SELECT id, man_id, woman_id, date_etablissement, decision_number, date_decision FROM divorces');
        $this->addSql('DROP TABLE divorces');
        $this->addSql('CREATE TABLE divorces (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, man_id INTEGER NOT NULL, woman_id INTEGER NOT NULL, date_etablissement DATETIME NOT NULL, decision_number VARCHAR(255) NOT NULL, date_decision DATETIME NOT NULL)');
        $this->addSql('INSERT INTO divorces (id, man_id, woman_id, date_etablissement, decision_number, date_decision) SELECT id, man_id, woman_id, date_etablissement, decision_number, date_decision FROM __temp__divorces');
        $this->addSql('DROP TABLE __temp__divorces');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_B395D454E3037FC8 ON divorces (man_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_B395D454EC88A587 ON divorces (woman_id)');
        $this->addSql('DROP INDEX IDX_E1DF582BE3037FC8');
        $this->addSql('DROP INDEX IDX_E1DF582BEC88A587');
        $this->addSql('DROP INDEX IDX_E1DF582BA9F25623');
        $this->addSql('DROP INDEX IDX_E1DF582B13B05D3D');
        $this->addSql('CREATE TEMPORARY TABLE __temp__marriages AS SELECT id, man_id, woman_id, witness_man_id, witness_woman_id, created_at, lieu FROM marriages');
        $this->addSql('DROP TABLE marriages');
        $this->addSql('CREATE TABLE marriages (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, man_id INTEGER NOT NULL, woman_id INTEGER NOT NULL, witness_man_id INTEGER DEFAULT NULL, witness_woman_id INTEGER DEFAULT NULL, created_at DATETIME NOT NULL, lieu VARCHAR(255) NOT NULL)');
        $this->addSql('INSERT INTO marriages (id, man_id, woman_id, witness_man_id, witness_woman_id, created_at, lieu) SELECT id, man_id, woman_id, witness_man_id, witness_woman_id, created_at, lieu FROM __temp__marriages');
        $this->addSql('DROP TABLE __temp__marriages');
        $this->addSql('CREATE INDEX IDX_E1DF582BE3037FC8 ON marriages (man_id)');
        $this->addSql('CREATE INDEX IDX_E1DF582BEC88A587 ON marriages (woman_id)');
        $this->addSql('CREATE INDEX IDX_E1DF582BA9F25623 ON marriages (witness_man_id)');
        $this->addSql('CREATE INDEX IDX_E1DF582B13B05D3D ON marriages (witness_woman_id)');
        $this->addSql('CREATE TEMPORARY TABLE __temp__persons AS SELECT id, first_name, last_name, sexe, birthdate, birthplace, profession, city, address FROM persons');
        $this->addSql('DROP TABLE persons');
        $this->addSql('CREATE TABLE persons (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, birthdate DATETIME NOT NULL, profession VARCHAR(255) DEFAULT NULL, city VARCHAR(255) DEFAULT NULL, address VARCHAR(255) DEFAULT NULL, sexe VARCHAR(255) NOT NULL COLLATE BINARY, birthplace VARCHAR(255) NOT NULL COLLATE BINARY)');
        $this->addSql('INSERT INTO persons (id, first_name, last_name, sexe, birthdate, birthplace, profession, city, address) SELECT id, first_name, last_name, sexe, birthdate, birthplace, profession, city, address FROM __temp__persons');
        $this->addSql('DROP TABLE __temp__persons');
    }
}
