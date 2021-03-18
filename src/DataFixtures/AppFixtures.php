<?php

namespace App\DataFixtures;
use App\Entity\Person;
use App\Entity\Birth;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Faker;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        // $product = new Product();
        // $manager->persist($product);
        $faker = \Faker\Factory::create();
        $sexe = ['masculin', 'feminin'];
        $profession_father = ['Instituteur', 'Menusier', 'Electricien', 'Informaticien'];
        $profession_mother = ['Instituteur', 'Menagère'];
        $profession_declarant = ['Médecin', 'Sage femme'];
        $city = ['Mahajanga I', 'Mahajanga II'];
        $adresse = ['Mahabibo', 'Tsararano', 'Tanambao sotema', 'Tsaramandroso'];
        for($i=0; $i<30; $i++) {

        	$person = new Person;
        	$person->setFirstName($faker->name);
        	$person->setLastName($faker->lastName);
        	$person->setBirthdate(new \DateTime($faker->date));
        	$person->setBirthplace($faker->city);
        	$person->setSexe($sexe[rand(0, 1)]);
        	$father = new Person;
        	$father->setFirstName($faker->firstNameMale);
        	$father->setLastName($faker->lastName);
        	$father->setBirthdate(new \DateTime($faker->date));
        	$father->setBirthplace($faker->city);
            $father->setProfession($profession_father[rand(0, 3)]);
            $father->setCity($city[rand(0, 1)]);
            $person->setAddress($adresse[rand(0, 3)]);
        	$father->setSexe(0);
        	$mother = new Person;
        	$mother->setFirstName($faker->firstNameFemale);
        	$mother->setLastName($faker->lastName);
        	$mother->setBirthdate(new \DateTime($faker->date));
        	$mother->setBirthplace($faker->city);
            $mother->setCity($city[rand(0, 1)]);
            $mother->setAddress($adresse[rand(0, 3)]);
        	$mother->setSexe(1);
            $mother->setProfession($profession_mother[rand(0, 1)]);
            $declarant = new Person;
            $declarant->setFirstName($faker->firstNameMale);
            $declarant->setLastName($faker->lastName);
            $declarant->setBirthdate(new \DateTime($faker->date));
            $declarant->setBirthplace($faker->city);
            $declarant->setSexe($sexe[rand(0, 1)]);
            $declarant->setProfession($profession_declarant[rand(0, 1)]);
            $declarant->setAddress($adresse[rand(0, 3)]);
            $declarant->setCity($city[rand(0, 1)]);
            $declarant->setSexe(1);
            $manager->persist($person);
            $manager->persist($father);
            $manager->persist($mother);
            $manager->persist($declarant);
            $birth = new Birth;
            $birth->setDateDeclaration(new \DateTime())
                  ->setTypeDeclaration('normal')
                  ->setPerson($person)
                  ->setFather($father)
                  ->setMother($mother)
                  ->setDeclarant($declarant);
            $manager->persist($birth);
        }

        $manager->flush();
    }
}
