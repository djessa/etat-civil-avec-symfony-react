<?php

namespace App\Service;

use App\Repository\OfficierRepository;
use App\Repository\PersonneRepository;
use App\Repository\NaissanceRepository;
use Doctrine\ORM\EntityManagerInterface;

class DeclarationService {

    private $manager;
    private $officiers;
    private $naissances;
    private $personnes;

    public function  __construct(EntityManagerInterface $em, OfficierRepository $officiers, NaissanceRepository $naissances, PersonneRepository $personnes)
    {
        $this->manager = $em;
        $this->officiers = $officiers;
        $this->naissances = $naissances;
        $this->personnes = $personnes;
    }

    public function onPersistPerson($personne)
    {
        $predicat = [
            'nom' => $personne->getNom(),
            'prenom' => $personne->getPrenom(),
            'sexe' => $personne->getSexe(),
            'date_naissance' => $personne->getDateNaissance(),
            'lieu_naissance' => $personne->getLieuNaissance()
        ];
        $personneEnBase = $this->personnes->findOneBy($predicat);
        if($personneEnBase) {
            return $personneEnBase;
        } else {
            $this->manager->persist($personne);
            return $personne;
        }
    }

    public function naissance($naissance, $enfant, $pere, $mere, $declarant, $officier)
    {
        try {
            $naissance->setOfficier($officier);
            $naissance->addParent($pere);
            $naissance->addParent($mere);
            $naissance->setDeclarant($declarant);
            $naissance->setEnfant($enfant);
            $this->manager->persist($naissance);
            $this->manager->flush();
            return ['status' => 200, 'message' => 'Un fait d\'état civil a bien été enregistré avec succès'];
        } catch(Exception $e) {
            return ['status' => 400, 'message' => 'Impossible d\'enregistrer'];
        }
    }

    public function getOfficierFromDataRequest($data)
    {
        return $this->officiers->find($data->officier);
    }

    public function getManager()
    {
        return $this->manager;
    }
}