<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210327093045 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE commune_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE district_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE naissance_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE officier_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE personne_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE province_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE region_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE commune (id INT NOT NULL, district_id INT NOT NULL, nom VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_E2E2D1EEB08FA272 ON commune (district_id)');
        $this->addSql('CREATE TABLE district (id INT NOT NULL, region_id INT NOT NULL, nom VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_31C1548798260155 ON district (region_id)');
        $this->addSql('CREATE TABLE naissance (id INT NOT NULL, officier_id INT NOT NULL, declarant_id INT DEFAULT NULL, date_declaration TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, type_declaration VARCHAR(255) NOT NULL, numero_jugement VARCHAR(255) DEFAULT NULL, date_jugement TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, date_naissance TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, lieu_naissance VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_F1D8D9048CE6079 ON naissance (officier_id)');
        $this->addSql('CREATE INDEX IDX_F1D8D904EC439BC ON naissance (declarant_id)');
        $this->addSql('CREATE TABLE officier (id INT NOT NULL, information_personnel_id INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_614CA6A67D8646B ON officier (information_personnel_id)');
        $this->addSql('CREATE TABLE personne (id INT NOT NULL, naissance_id INT NOT NULL, nom VARCHAR(255) NOT NULL, prenom VARCHAR(255) DEFAULT NULL, sexe VARCHAR(255) DEFAULT NULL, profession VARCHAR(255) DEFAULT NULL, residence VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_FCEC9EFB9BA49AD ON personne (naissance_id)');
        $this->addSql('CREATE TABLE personne_naissance (personne_id INT NOT NULL, naissance_id INT NOT NULL, PRIMARY KEY(personne_id, naissance_id))');
        $this->addSql('CREATE INDEX IDX_F7ADBE1AA21BD112 ON personne_naissance (personne_id)');
        $this->addSql('CREATE INDEX IDX_F7ADBE1AB9BA49AD ON personne_naissance (naissance_id)');
        $this->addSql('CREATE TABLE province (id INT NOT NULL, nom VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE region (id INT NOT NULL, province_id INT NOT NULL, nom VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_F62F176E946114A ON region (province_id)');
        $this->addSql('ALTER TABLE commune ADD CONSTRAINT FK_E2E2D1EEB08FA272 FOREIGN KEY (district_id) REFERENCES district (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE district ADD CONSTRAINT FK_31C1548798260155 FOREIGN KEY (region_id) REFERENCES region (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE naissance ADD CONSTRAINT FK_F1D8D9048CE6079 FOREIGN KEY (officier_id) REFERENCES officier (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE naissance ADD CONSTRAINT FK_F1D8D904EC439BC FOREIGN KEY (declarant_id) REFERENCES personne (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE officier ADD CONSTRAINT FK_614CA6A67D8646B FOREIGN KEY (information_personnel_id) REFERENCES personne (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE personne ADD CONSTRAINT FK_FCEC9EFB9BA49AD FOREIGN KEY (naissance_id) REFERENCES naissance (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE personne_naissance ADD CONSTRAINT FK_F7ADBE1AA21BD112 FOREIGN KEY (personne_id) REFERENCES personne (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE personne_naissance ADD CONSTRAINT FK_F7ADBE1AB9BA49AD FOREIGN KEY (naissance_id) REFERENCES naissance (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE region ADD CONSTRAINT FK_F62F176E946114A FOREIGN KEY (province_id) REFERENCES province (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE commune DROP CONSTRAINT FK_E2E2D1EEB08FA272');
        $this->addSql('ALTER TABLE personne DROP CONSTRAINT FK_FCEC9EFB9BA49AD');
        $this->addSql('ALTER TABLE personne_naissance DROP CONSTRAINT FK_F7ADBE1AB9BA49AD');
        $this->addSql('ALTER TABLE naissance DROP CONSTRAINT FK_F1D8D9048CE6079');
        $this->addSql('ALTER TABLE naissance DROP CONSTRAINT FK_F1D8D904EC439BC');
        $this->addSql('ALTER TABLE officier DROP CONSTRAINT FK_614CA6A67D8646B');
        $this->addSql('ALTER TABLE personne_naissance DROP CONSTRAINT FK_F7ADBE1AA21BD112');
        $this->addSql('ALTER TABLE region DROP CONSTRAINT FK_F62F176E946114A');
        $this->addSql('ALTER TABLE district DROP CONSTRAINT FK_31C1548798260155');
        $this->addSql('DROP SEQUENCE commune_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE district_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE naissance_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE officier_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE personne_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE province_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE region_id_seq CASCADE');
        $this->addSql('DROP TABLE commune');
        $this->addSql('DROP TABLE district');
        $this->addSql('DROP TABLE naissance');
        $this->addSql('DROP TABLE officier');
        $this->addSql('DROP TABLE personne');
        $this->addSql('DROP TABLE personne_naissance');
        $this->addSql('DROP TABLE province');
        $this->addSql('DROP TABLE region');
    }
}
