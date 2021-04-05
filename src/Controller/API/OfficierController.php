<?php

namespace App\Controller\API;

use App\Entity\Officier;
use App\Entity\Personne;
use App\Service\JSONService;
use App\Service\OnPersistPerson;
use App\Repository\OfficierRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Validator\Validator\ValidatorInterface;
    /**
     * @Route("/api/officier")
     */
class OfficierController extends AbstractController
{
    /**
     * @Route("", name="officier", methods="GET")
     */
    public function index(OfficierRepository $officierRepository, JSONService $json)
    {
        $officiers = [];
        foreach ($officierRepository->findAll() as $officier) {
            $officiers[] =  $officier->getInformationPersonnel();
        }
        return $this->json($json->normalize($officiers), 200);
    }

    /**
     * @Route("/{id}", name="officier_show", methods="GET")
     */
    public function show(OfficierRepository $officierRepository, JSONService $json, $id)
    {
        $officier = $officierRepository->find($id);
        if($officier){
            return $this->json($json->normalize($officier->getInformationPersonnel()), 200);
        }
        return $this->json(['status' => 400, 'message' => 'Aucun officier pour cet numéro'], 200);
    }

    /**
     * @Route("", name="officier_new", methods="POST")
     */
    public function new(Request $request, EntityManagerInterface $em, SerializerInterface $serializer, OnPersistPerson $peristPersonne, ValidatorInterface $validator)
    {
        try {
            $personne = $serializer->deserialize($request->getContent(), Personne::class, 'json');
            $errors = $validator->validate($personne);
            if(count($errors) > 0) {
                $data = [];
                foreach($errors as $error) {
                    $data[$error->getPropertyPath()] = $error->getMessage();
                }
                return $this->json(['status' => 400, 'message' => $data]);
            }
            $personne = $peristPersonne->save($personne);
            $officier = new Officier;
            $officier->setInformationPersonnel($personne);
            $em->persist($officier);
            $em->flush();
            return $this->json(['status' => 200, 'message' => 'Enregistré avec succès'], 200);
        } catch (NotEncodableValueException $e) {
            return $this->json(['status' => 404, 'message' => $e->getMessage()], 404);
        }
    }

    /**
     * @Route("/{id}", name="officier_edit", methods="PUT")
     */
    public function edit(Officier $officier, Request $request, ValidatorInterface $validator, EntityManagerInterface $em)
    {
        try {
           $info_perso =  $officier->getInformationPersonnel();
           $data = json_decode($request->getContent());
           foreach ($data as $key => $value) {
               $method = 'set' . \ucfirst($key);
               $info_perso->$method($value);
           }
            $errors = $validator->validate($info_perso);
            if(count($errors) > 0) {
                $data = [];
                foreach($errors as $error) {
                    $data[$error->getPropertyPath()] = $error->getMessage();
                }
                return $this->json(['status' => 400, 'message' => $data]);
            }
            $em->flush();
            return $this->json(['status' => 200, 'message' => 'Modification efféctué avec succès'], 200);
        } catch (NotEncodableValueException $e) {
            return $this->json(['status' => 404, 'message' => $e->getMessage()], 404);
        }
    }
    /**
     * @Route("/{id}", name="officier_delete", methods="DELETE")
     */
    public function delete($id, EntityManagerInterface $em)
    {
        $officier = $em->getRepository(Officier::class)->find($id);
        if($officier) {
            $em->remove($officier);
            $em->flush();
            return $this->json(['status' => 200, 'message' => 'Suppression réussie'], 200);
        }
        return $this->json(['status' => 400, 'message' => 'Impossible de supprimer'], 200);
    }
}
