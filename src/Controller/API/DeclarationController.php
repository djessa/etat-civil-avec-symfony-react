<?php

namespace App\Controller\API;

use App\Entity\Personne;
use App\Entity\Naissance;
use App\Service\DeclarationService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\Exception\NotNormalizableValueException;
/**
* @Route("/api/declaration")
*/
class DeclarationController extends AbstractController
{

    private $service;

    public function __construct(DeclarationService $declarationService)
    {
        $this->service = $declarationService;
    }
    /**
     * @Route("/naissance", name="declaration_naissance", methods="POST")
     */
    public function naissance(Request $request, SerializerInterface $serializer): Response
    {
        try {
            try {
                $data = json_decode($request->getContent());
                $errors = [];
                // en evitant le problème que javascript ne puisse pas être resoudre
                if(isset($data->naissance->date_jugement) && $data->naissance->date_jugement == '') {
                    $data->naissance->date_jugement = null;
                    if(isset($data->naissance->numero_jugement))
                        $data->naissance->numero_jugement = null;
                }
                if($data->naissance->type_declaration == 'Jugement') {
                    if(!($data->naissance->date_jugement))
                        $errors['naissance']['date_jugement'] =  'Date du jugement invalide';
                    if(!($data->naissance->numero_jugement))
                        $errors['naissance']['numero_jugement'] = 'Numéro du jugement invalide';
                } 
                $officier = $this->service->getOfficierFromDataRequest($data);
                if(!$officier)
                    $errors['officier'] = 'Officier introuvable';
                if(!isset($data->pere) || !isset($data->mere) || !isset($data->enfant) || !isset($data->naissance))
                    return $this->json(['status' => 400, 'message' => ['Obligatoire' => 'Un categorie d\'information introuvable']]);
                $pere = $serializer->deserialize(json_encode($data->pere), Personne::class, 'json');
                if($this->service->isErrorExist($pere)) {
                    $errors['pere'] = $this->service->isErrorExist($pere);
                }
                $mere = $serializer->deserialize(json_encode($data->mere), Personne::class, 'json');
                if($this->service->isErrorExist($mere)) {
                    $errors['mere'] = $this->service->isErrorExist($mere);
                }
                $declarant = null;
                if(isset($data->declarant)) {
                    $declarant = $serializer->deserialize(json_encode($data->declarant), Personne::class, 'json');
                    if($this->service->isErrorExist($declarant)) {
                        $errors['declarant'] = $this->service->isErrorExist($declarant);
                    } else {
                        $declarant = $this->service->onPersistPerson($declarant);
                    }
                }
                $enfant = $serializer->deserialize(json_encode($data->enfant), Personne::class, 'json');
                if($this->service->isErrorExist($enfant)) {
                    $errors['enfant'] = $this->service->isErrorExist($enfant);
                }
                if($this->service->isExistPerson($enfant))
                    $errors['enfant'] = ['doublons' => 'Cet enfant a déjà un fiche de naissance'];
                $naissance = $serializer->deserialize(json_encode($data->naissance), Naissance::class, 'json');
                if($this->service->isErrorExist($naissance)) {
                    if(!key_exists('naissance', $errors))
                        $errors['naissance'] = [];
                    foreach($this->service->isErrorExist($naissance) as $key => $value) {
                        $errors['naissance'][$key] = $value;
                    }
                }
                if(count($errors) > 0) 
                    return $this->json(['status' => 400, 'message' => $errors]);
                $pere = $this->service->onPersistPerson($pere);
                $mere = $this->service->onPersistPerson($mere);
                $this->service->getManager()->persist($enfant);
                $reponse = $this->service->naissance($naissance, $enfant, $pere, $mere, $declarant, $officier);
                return $this->json($reponse, 200);
            } catch(NotNormalizableValueException $e) {
                return $this->json(['status' => 400, 'message' => $e->getMessage()], 400);
            }
        } catch (NotEncodableValueException $e) {
            return $this->json(['message' => $e->getMessage()], 400);
        }
    }
}
