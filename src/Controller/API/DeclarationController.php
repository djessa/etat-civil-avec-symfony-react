<?php

namespace App\Controller\API;

use App\Entity\Personne;
use App\Entity\Naissance;
use App\Services\DeclarationService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
/**
* @Route("/declaration")
*/
class DeclarationController extends AbstractController
{

    private $service;

    public function __construct(DeclarationService $declarationService)
    {
        $this->service = $declarationService;
    }
    /**
     * @Route("/naissance", name="declaration_naissance")
     */
    public function naissance(Request $request, SerializerInterface $serializer): Response
    {
        try {

            $data = json_decode($request->getContent());
            // en evitant le problème que javascript ne puisse pas être resoudre
            if($data->naissance->date_jugement == '') {
                $data->naissance->date_jugement = null;
                $data->naissance->numero_jugement = null;
            }
            $officier = $this->service->getOfficierFromDataRequest($data);
            // recuperation de l'objet personne en  persistant s'il n'est pas encore persisté
            $pere = $this->service->onPersistPerson($serializer->deserialize(json_encode($data->pere), Personne::class, 'json'));
            $mere = $this->service->onPersistPerson($serializer->deserialize(json_encode($data->mere), Personne::class, 'json'));
            $declarant = $this->service->onPersistPerson($serializer->deserialize(json_encode($data->declarant), Personne::class, 'json'));
            $enfant = $serializer->deserialize(json_encode($data->enfant), Personne::class, 'json');
            $this->service->getManager()->persist($enfant);
            $naissance = $serializer->deserialize(json_encode($data->naissance), Naissance::class, 'json') ;
            $reponse = $this->service->naissance($naissance, $enfant, $pere, $mere, $declarant, $officier);
            return $this->json($reponse, 200);
        } catch (NotEncodableValueException $e) {
            return $this->json(['message' => $e->getMessage()], 400);
        }
    }
}
