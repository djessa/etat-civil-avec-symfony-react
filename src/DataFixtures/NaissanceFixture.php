<?php
use App\Entity\Naissance;
use App\Entity\Personne;

namespace App\DataFixtures;

class NaissanceFixture {

	public function genererNaissance() {
		$naissance = new Naissance();
		$naissance->setDateDeclaration(new \DateTime());
		$naissance->setTypeDeclaration('Normal');
	}
}