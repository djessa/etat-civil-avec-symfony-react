<?php

namespace App\DataFixtures;
use App\Entity\Commune;
use App\Entity\Province;
use App\Entity\Region;
use App\Entity\District;
use App\Entity\Officier;
use App\Entity\Personne;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
    	$province = new Province();
    	$province->setNom('Mahajanga');
    	$manager->persist($province);
    	$manager->flush();
    	$region = new Region();
    	$region->setNom('Boeny')
    		   ->setProvince($province);
    	$manager->persist($region);
    	$manager->flush();
    	$district = new District();
    	$district->setNom('Mahajanga-I')
				 ->setRegion($region);
		$manager->persist($district);
    	$manager->flush();
    	$commune = new Commune();
    	$commune->setNom('Mahajanga')
    			->setDistrict($district);
    	$manager->persist($commune);
    	$manager->flush();
    	$personne = new Personne();
    	$personne->setNom('Randria')
    			 ->setPrenom('Mamy')
    			 ->setSexe('Masculin')
    			 ->setProfession('Informaticien')
    			 ->setResidence('Tsararano Mahajanga');
    	$manager->persist($personne);
    	$manager->flush();
    	$officier = new Officier();
    	$officier->setInformationPersonnel($personne)
    			->setPoste($commune);
    	$manager->persist($officier);
    	$manager->flush();
    }
}
