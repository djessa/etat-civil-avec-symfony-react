<?php
namespace App\Service;

use App\Repository\PersonneRepository;
use Doctrine\ORM\EntityManagerInterface;

class OnPersistPerson {

    private $manager;
    private $repository;
    private $validator;

    public function __construct(EntityManagerInterface $em, PersonneRepository $pr)
    {
        $this->manager = $em;
        $this->repository = $pr;
    }

    public function save($personne)
    {
        $predicat = [
            'nom' => $personne->getNom(),
            'prenom' => $personne->getPrenom(),
            'sexe' => $personne->getSexe(),
            'date_naissance' => $personne->getDateNaissance(),
            'lieu_naissance' => $personne->getLieuNaissance()
        ];
        $personneEnBase = $this->repository->findOneBy($predicat);
        if($personneEnBase) {
            $personneEnBase->setProfession($personne->getProfession());
            $personneEnBase->setResidence($personne->getResidence());
            return $personneEnBase;
        } else {
            $this->manager->persist($personne);
            return $personne;
        }
    }
}