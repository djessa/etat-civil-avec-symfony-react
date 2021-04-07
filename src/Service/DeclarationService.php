<?php
namespace App\Service;
use Doctrine\ORM\EntityManagerInterface;
class DeclarationService {
    private $manager;
    private $officiers;
    public function  __construct(EntityManagerInterface $em)
    {
        $this->manager = $em;
        $this->officiers = $em->getRepository();
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
}