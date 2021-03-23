<?php

namespace App\Service;
use App\Repository\PersonRepository;
use Doctrine\ORM\EntityManagerInterface;

class PersonSerivce
{

	private $persons;
	private $manager;

	public function __construct(PersonRepository $persons, EntityManagerInterface $em)
	{
		$this->persons = $persons;
		$this->manager = $em;
	}

	public function isExist($person)
	{
		if($person === null)
			return false; 
		$person_info = [
    		'first_name' => $person->getFirstName(),
    		'last_name' => $person->getLastName(),
    		'birthdate' => $person->getBirthdate(),
    		'birthplace' => $person->getBirthplace(),
    	];
		$person_change = $this->persons->findOneBy($person_info);
    	if ($person_change) {
			$person_change->setProfession($person->getProfession());
			$person_change->setCity($person->getCity());
			$person_change->setAddress($person->getAddress());
			$this->manager->flush();
    		return $person_change;
    	} else {
    		return false;
    	}
	}
}