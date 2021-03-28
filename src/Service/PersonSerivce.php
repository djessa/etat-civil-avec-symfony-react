<?php

namespace App\Service;

use App\Repository\OfficierRepository;
use App\Repository\PersonneRepository;
use Doctrine\ORM\EntityManagerInterface;

class PersonSerivce
{

	private $persons;
	private $officiers;
	private $manager;

	public function __construct(PersonneRepository $persons, EntityManagerInterface $em, OfficierRepository $officierRepository)
	{
		$this->persons = $persons;
		$this->manager = $em;
		$this->officiers = $officierRepository;
	}

	public function save($person)
	{
		$person_info = [
    		'nom' => $person->getNom(),
    		'prenom' => $person->getPrenom()
    	];
		$person_change = $this->persons->findOneBy($person_info);
    	if ($person_change) {
			$person_change->setProfession($person->getProfession());
			$person_change->setResidence($person->getResidence());
			$this->manager->flush();
			return $person_change;
    	} else {
    		$this->manager->persist($person);
			return $person;
    	}
	}

	public function getOfficier($information)
	{
		$info = $this->persons->findOneBy(['nom' => $information->getNom(), 'prenom' => $information->getPrenom()]);
		$officier = $this->officiers->findOneBy(['information_personnel' => $info]);
		return $officier;
	}
}