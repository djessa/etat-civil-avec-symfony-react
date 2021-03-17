<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Person;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        // $product = new Product();
        // $manager->persist($product);
        $faker = Faker\Factory::create();

        for($i=0; $i<10; $i++) {

        }
        $manager->flush();
    }
}
