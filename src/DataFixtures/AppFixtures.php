<?php

namespace App\DataFixtures;

use Faker;
use DateTime;
use App\Entity\Agent;
use App\Entity\Officier;
use App\Entity\Personne;
use App\Entity\Naissance;
use App\Service\Constant;
use App\Repository\OfficierRepository;
use App\Repository\PersonneRepository;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class AppFixtures extends Fixture
{
    private $personnes;
    private $officiers;
    public function __construct(PersonneRepository $ps, OfficierRepository $os)
    {
        $this->personnes = $ps;
        $this->officiers = $os;
    }
    public function load(ObjectManager $manager)
    {
        $faker = Faker\Factory::create();
        // creation de deux officiers
        for ($i = 0; $i < 2; $i++) {
            $officier = new Officier;
            $personne = new Personne;
            $sexe = Constant::SEXES[rand(0, 1)];
            $personne->setNom($faker->lastName)
                ->setPrenom($sexe == 'Masculin' ? $faker->firstNameMale : $faker->firstNameFemale)
                ->setSexe($sexe)
                ->setDateNaissance($faker->dateTimeBetween($startDate = '-40 years', $endDate = '1988-12-09T10:10:29+0000', $timezone = null))
                ->setLieuNaissance('Mahajanga')
                ->setProfession('Officier d\'état civil')
                ->setResidence(Constant::RESIDENCES[rand(0, 25)]);
            $manager->persist($personne);
            $officier->setInformationPersonnel($personne);
            $manager->persist($officier);
            $manager->flush();
        }
        // creation de deux agents
        for ($i = 0; $i < 2; $i++) {
            $agent = new Agent;
            $personne = new Personne;
            $sexe = Constant::SEXES[rand(0, 1)];
            $personne->setNom($faker->lastName)
                ->setPrenom($sexe == 'Masculin' ? $faker->firstNameMale : $faker->firstNameFemale)
                ->setSexe($sexe)
                ->setDateNaissance($faker->dateTimeBetween($startDate = '-40 years', $endDate = '1988-12-09T10:10:29+0000', $timezone = null))
                ->setLieuNaissance('Mahajanga')
                ->setProfession('Agent d\'état civil')
                ->setResidence(Constant::RESIDENCES[rand(0, 25)]);
            $manager->persist($personne);
            $agent->setInformationPersonnel($personne);
            $manager->persist($agent);
            $manager->flush();
        }
        // creation de dix parents
        $parents = [];
        for ($i = 0; $i < 10; $i++) {
            $pere = new Personne;
            $pere->setNom($faker->lastName)
                ->setPrenom($faker->firstNameMale)
                ->setSexe('Masculin')
                ->setDateNaissance($faker->dateTimeBetween($startDate = '-40 years', $endDate = '1988-12-09T10:10:29+0000', $timezone = null))
                ->setLieuNaissance('Mahajanga')
                ->setProfession(Constant::PROFESSIONS_MALE[rand(0, count(Constant::PROFESSIONS_MALE) - 1)])
                ->setResidence(Constant::RESIDENCES[rand(0, 25)]);
            $manager->persist($pere);
            $mere = new Personne;
            $mere->setNom($faker->lastName)
                ->setPrenom($faker->firstNameFemale)
                ->setSexe('Féminin')
                ->setDateNaissance($faker->dateTimeBetween($startDate = '-40 years', $endDate = '1988-12-09T10:10:29+0000', $timezone = null))
                ->setLieuNaissance('Mahajanga')
                ->setProfession(Constant::PROFESSIONS_FEMALE[rand(0, count(Constant::PROFESSIONS_FEMALE) - 1)])
                ->setResidence(Constant::RESIDENCES[rand(0, 25)]);
            $manager->persist($mere);
            $declarant = new Personne;
            $declarant->setNom($faker->lastName)
                ->setPrenom($faker->firstNameFemale)
                ->setSexe('Féminin')
                ->setDateNaissance($faker->dateTimeBetween($startDate = '-40 years', $endDate = '1988-12-09T10:10:29+0000', $timezone = null))
                ->setLieuNaissance('Mahajanga')
                ->setProfession('Sage femme')
                ->setResidence(Constant::RESIDENCES[rand(0, 25)]);
            $manager->persist($declarant);
            $manager->flush();
        }
        // creation de trente naissances
        for ($i = 0; $i < 30; $i++) {
            $enfant = new Personne;
            $sexe = Constant::SEXES[rand(0, 1)];
            $enfant->setNom($faker->lastName)
                ->setPrenom($sexe == 'Masculin' ? $faker->firstNameMale : $faker->firstNameFemale)
                ->setSexe($sexe)
                ->setDateNaissance($faker->dateTimeBetween($startDate = '-5 years', $endDate = 'now', $timezone = null))
                ->setLieuNaissance('Mahajanga');
            $manager->persist($enfant);
            $naissance = new Naissance;
            $pere_sur_lieu = [];
            $mere_sur_lieu = [];
            do {
                $pere_sur_lieu = $this->personnes->findBy(['sexe' => 'Masculin', 'residence' => Constant::RESIDENCES[rand(0, 25)]]);
            } while (!(count($pere_sur_lieu) > 0));
            do {
                $mere_sur_lieu = $this->personnes->findBy(['sexe' => 'Féminin', 'residence' => Constant::RESIDENCES[rand(0, 25)]]);
            } while (!(count($mere_sur_lieu) > 0));
            $pere = $pere_sur_lieu[array_rand($pere_sur_lieu)];
            $mere = $mere_sur_lieu[array_rand($mere_sur_lieu)];
            $naissance->setDateDeclaration($faker->dateTimeBetween($startDate = '-5 years', $endDate = 'now', $timezone = null))
                ->setHeureDeclaration(new DateTime($faker->time($format = 'H:i:s', $max = 'now')))
                ->setHeureNaissance(new DateTime($faker->time($format = 'H:i:s', $max = 'now')))
                ->setEnfant($enfant)
                ->setTypeDeclaration('Normal')
                ->setDeclarant($this->personnes->findBy(['profession' => 'Sage femme'])[rand(1, 10)])
                ->addParent($pere)
                ->addParent($mere)
                ->setOfficier($this->officiers->findAll()[array_rand($this->officiers->findAll())]);
            $manager->persist($naissance);
            $manager->flush();
        }
    }
}
