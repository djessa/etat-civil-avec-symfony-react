<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210404070245 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE agents (id INT AUTO_INCREMENT NOT NULL, information_personnel_id INT DEFAULT NULL, UNIQUE INDEX UNIQ_268B9C9D67D8646B (information_personnel_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE naissances (id INT AUTO_INCREMENT NOT NULL, officier_id INT DEFAULT NULL, declarant_id INT DEFAULT NULL, date_declaration DATE DEFAULT NULL, type_declaration VARCHAR(255) DEFAULT NULL, numero_jugement VARCHAR(255) DEFAULT NULL, date_jugement DATETIME DEFAULT NULL, heure_declaration TIME DEFAULT NULL, heure_naissance TIME DEFAULT NULL, INDEX IDX_1C92D3CB8CE6079 (officier_id), INDEX IDX_1C92D3CBEC439BC (declarant_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE officiers (id INT AUTO_INCREMENT NOT NULL, information_personnel_id INT NOT NULL, UNIQUE INDEX UNIQ_B66F538767D8646B (information_personnel_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE personnes (id INT AUTO_INCREMENT NOT NULL, naissance_id INT DEFAULT NULL, nom VARCHAR(255) NOT NULL, prenom VARCHAR(255) DEFAULT NULL, sexe VARCHAR(255) DEFAULT NULL, date_naissance DATE DEFAULT NULL, lieu_naissance VARCHAR(255) DEFAULT NULL, profession VARCHAR(255) DEFAULT NULL, residence VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_2BB4FE2BB9BA49AD (naissance_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE parents_naissance (personne_id INT NOT NULL, naissance_id INT NOT NULL, INDEX IDX_F7ADBE1AA21BD112 (personne_id), INDEX IDX_F7ADBE1AB9BA49AD (naissance_id), PRIMARY KEY(personne_id, naissance_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE agents ADD CONSTRAINT FK_268B9C9D67D8646B FOREIGN KEY (information_personnel_id) REFERENCES personnes (id)');
        $this->addSql('ALTER TABLE naissances ADD CONSTRAINT FK_1C92D3CB8CE6079 FOREIGN KEY (officier_id) REFERENCES officiers (id)');
        $this->addSql('ALTER TABLE naissances ADD CONSTRAINT FK_1C92D3CBEC439BC FOREIGN KEY (declarant_id) REFERENCES personnes (id)');
        $this->addSql('ALTER TABLE officiers ADD CONSTRAINT FK_B66F538767D8646B FOREIGN KEY (information_personnel_id) REFERENCES personnes (id)');
        $this->addSql('ALTER TABLE personnes ADD CONSTRAINT FK_2BB4FE2BB9BA49AD FOREIGN KEY (naissance_id) REFERENCES naissances (id)');
        $this->addSql('ALTER TABLE parents_naissance ADD CONSTRAINT FK_F7ADBE1AA21BD112 FOREIGN KEY (personne_id) REFERENCES personnes (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE parents_naissance ADD CONSTRAINT FK_F7ADBE1AB9BA49AD FOREIGN KEY (naissance_id) REFERENCES naissances (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE personnes DROP FOREIGN KEY FK_2BB4FE2BB9BA49AD');
        $this->addSql('ALTER TABLE personne_naissance DROP FOREIGN KEY FK_F7ADBE1AB9BA49AD');
        $this->addSql('ALTER TABLE naissances DROP FOREIGN KEY FK_1C92D3CB8CE6079');
        $this->addSql('ALTER TABLE agent DROP FOREIGN KEY FK_268B9C9D67D8646B');
        $this->addSql('ALTER TABLE naissances DROP FOREIGN KEY FK_1C92D3CBEC439BC');
        $this->addSql('ALTER TABLE officiers DROP FOREIGN KEY FK_B66F538767D8646B');
        $this->addSql('ALTER TABLE personne_naissance DROP FOREIGN KEY FK_F7ADBE1AA21BD112');
        $this->addSql('DROP TABLE agent');
        $this->addSql('DROP TABLE naissances');
        $this->addSql('DROP TABLE officiers');
        $this->addSql('DROP TABLE personnes');
        $this->addSql('DROP TABLE personne_naissance');
    }
}
