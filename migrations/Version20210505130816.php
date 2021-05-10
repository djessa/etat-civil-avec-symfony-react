<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210505130816 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE agent (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, information_personnel_id INTEGER DEFAULT NULL)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_268B9C9D67D8646B ON agent (information_personnel_id)');
        $this->addSql('CREATE TABLE naissances (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, officier_id INTEGER DEFAULT NULL, declarant_id INTEGER DEFAULT NULL, date_declaration DATE DEFAULT NULL, type_declaration VARCHAR(255) DEFAULT NULL, numero_jugement VARCHAR(255) DEFAULT NULL, date_jugement DATETIME DEFAULT NULL, heure_declaration TIME DEFAULT NULL, heure_naissance TIME DEFAULT NULL)');
        $this->addSql('CREATE INDEX IDX_1C92D3CB8CE6079 ON naissances (officier_id)');
        $this->addSql('CREATE INDEX IDX_1C92D3CBEC439BC ON naissances (declarant_id)');
        $this->addSql('CREATE TABLE officiers (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, information_personnel_id INTEGER NOT NULL)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_B66F538767D8646B ON officiers (information_personnel_id)');
        $this->addSql('CREATE TABLE personnes (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, naissance_id INTEGER DEFAULT NULL, nom VARCHAR(255) NOT NULL, prenom VARCHAR(255) DEFAULT NULL, sexe VARCHAR(255) DEFAULT NULL, date_naissance DATE DEFAULT NULL, lieu_naissance VARCHAR(255) DEFAULT NULL, profession VARCHAR(255) DEFAULT NULL, residence VARCHAR(255) DEFAULT NULL)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_2BB4FE2BB9BA49AD ON personnes (naissance_id)');
        $this->addSql('CREATE TABLE personne_naissance (personne_id INTEGER NOT NULL, naissance_id INTEGER NOT NULL, PRIMARY KEY(personne_id, naissance_id))');
        $this->addSql('CREATE INDEX IDX_F7ADBE1AA21BD112 ON personne_naissance (personne_id)');
        $this->addSql('CREATE INDEX IDX_F7ADBE1AB9BA49AD ON personne_naissance (naissance_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE agent');
        $this->addSql('DROP TABLE naissances');
        $this->addSql('DROP TABLE officiers');
        $this->addSql('DROP TABLE personnes');
        $this->addSql('DROP TABLE personne_naissance');
    }
}
