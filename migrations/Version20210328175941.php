<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210328175941 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE commune (id INT AUTO_INCREMENT NOT NULL, district_id INT NOT NULL, nom VARCHAR(255) NOT NULL, INDEX IDX_E2E2D1EEB08FA272 (district_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE district (id INT AUTO_INCREMENT NOT NULL, region_id INT NOT NULL, nom VARCHAR(255) NOT NULL, INDEX IDX_31C1548798260155 (region_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE naissance (id INT AUTO_INCREMENT NOT NULL, officier_id INT NOT NULL, declarant_id INT DEFAULT NULL, date_declaration DATE NOT NULL, type_declaration VARCHAR(255) NOT NULL, numero_jugement VARCHAR(255) DEFAULT NULL, date_jugement DATETIME DEFAULT NULL, date_naissance DATE NOT NULL, lieu_naissance VARCHAR(255) NOT NULL, heure_declaration TIME DEFAULT NULL, heure_naissance TIME DEFAULT NULL, INDEX IDX_F1D8D9048CE6079 (officier_id), INDEX IDX_F1D8D904EC439BC (declarant_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE officier (id INT AUTO_INCREMENT NOT NULL, information_personnel_id INT NOT NULL, UNIQUE INDEX UNIQ_614CA6A67D8646B (information_personnel_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE personne (id INT AUTO_INCREMENT NOT NULL, naissance_id INT DEFAULT NULL, nom VARCHAR(255) NOT NULL, prenom VARCHAR(255) DEFAULT NULL, sexe VARCHAR(255) DEFAULT NULL, profession VARCHAR(255) DEFAULT NULL, residence VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_FCEC9EFB9BA49AD (naissance_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE personne_naissance (personne_id INT NOT NULL, naissance_id INT NOT NULL, INDEX IDX_F7ADBE1AA21BD112 (personne_id), INDEX IDX_F7ADBE1AB9BA49AD (naissance_id), PRIMARY KEY(personne_id, naissance_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE province (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE region (id INT AUTO_INCREMENT NOT NULL, province_id INT NOT NULL, nom VARCHAR(255) NOT NULL, INDEX IDX_F62F176E946114A (province_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE commune ADD CONSTRAINT FK_E2E2D1EEB08FA272 FOREIGN KEY (district_id) REFERENCES district (id)');
        $this->addSql('ALTER TABLE district ADD CONSTRAINT FK_31C1548798260155 FOREIGN KEY (region_id) REFERENCES region (id)');
        $this->addSql('ALTER TABLE naissance ADD CONSTRAINT FK_F1D8D9048CE6079 FOREIGN KEY (officier_id) REFERENCES officier (id)');
        $this->addSql('ALTER TABLE naissance ADD CONSTRAINT FK_F1D8D904EC439BC FOREIGN KEY (declarant_id) REFERENCES personne (id)');
        $this->addSql('ALTER TABLE officier ADD CONSTRAINT FK_614CA6A67D8646B FOREIGN KEY (information_personnel_id) REFERENCES personne (id)');
        $this->addSql('ALTER TABLE personne ADD CONSTRAINT FK_FCEC9EFB9BA49AD FOREIGN KEY (naissance_id) REFERENCES naissance (id)');
        $this->addSql('ALTER TABLE personne_naissance ADD CONSTRAINT FK_F7ADBE1AA21BD112 FOREIGN KEY (personne_id) REFERENCES personne (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE personne_naissance ADD CONSTRAINT FK_F7ADBE1AB9BA49AD FOREIGN KEY (naissance_id) REFERENCES naissance (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE region ADD CONSTRAINT FK_F62F176E946114A FOREIGN KEY (province_id) REFERENCES province (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE commune DROP FOREIGN KEY FK_E2E2D1EEB08FA272');
        $this->addSql('ALTER TABLE personne DROP FOREIGN KEY FK_FCEC9EFB9BA49AD');
        $this->addSql('ALTER TABLE personne_naissance DROP FOREIGN KEY FK_F7ADBE1AB9BA49AD');
        $this->addSql('ALTER TABLE naissance DROP FOREIGN KEY FK_F1D8D9048CE6079');
        $this->addSql('ALTER TABLE naissance DROP FOREIGN KEY FK_F1D8D904EC439BC');
        $this->addSql('ALTER TABLE officier DROP FOREIGN KEY FK_614CA6A67D8646B');
        $this->addSql('ALTER TABLE personne_naissance DROP FOREIGN KEY FK_F7ADBE1AA21BD112');
        $this->addSql('ALTER TABLE region DROP FOREIGN KEY FK_F62F176E946114A');
        $this->addSql('ALTER TABLE district DROP FOREIGN KEY FK_31C1548798260155');
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
