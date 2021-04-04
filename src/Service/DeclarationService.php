<?php

namespace App\Service;

use App\Service\OnPersistPerson;
use App\Repository\OfficierRepository;
use App\Repository\PersonneRepository;
use App\Repository\NaissanceRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class DeclarationService {

    private $manager;
    private $officiers;
    private $naissances;
    private $personnes;
    private $persistence;
    private $validator;

    public function  __construct(EntityManagerInterface $em, OfficierRepository $officiers, NaissanceRepository $naissances, PersonneRepository $personnes, OnPersistPerson $p, ValidatorInterface $validator)
    {
        $this->manager = $em;
        $this->officiers = $officiers;
        $this->naissances = $naissances;
        $this->personnes = $personnes;
        $this->persistence = $p;
        $this->validator = $validator;
    }

    public function onPersistPerson($personne)
    {
        return $this->persistence->save($personne);
    }

    public function naissance($naissance, $enfant, $pere, $mere, $declarant, $officier)
    {
        try {
            $naissance->setOfficier($officier);
            $naissance->addParent($pere);
            $naissance->addParent($mere);
            if($declarant !=  null)
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
        if(isset($data->officier)) {
            return $this->officiers->find($data->officier) ?: false;
        }
        return false;
    }

    public function getManager()
    {
        return $this->manager;
    }

    public function isErrorExist($object)
    {
        $errors = $this->validator->validate($object);
        if(count($errors) > 0) {
            $data = [];
            foreach($errors as $error) {
                $data[$error->getPropertyPath()] = $error->getMessage();
            }
            return $data;
        }
        return false;
    }

    public function isExistPerson($personne)
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
            if($personneEnBase->getNaissance() != null)
                return true;
        }
        return false;
    }
}