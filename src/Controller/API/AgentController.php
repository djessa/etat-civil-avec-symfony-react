<?php

namespace App\Controller\API;

use App\Entity\Agent;
use App\Entity\Personne;
use App\Service\JSONService;
use App\Service\OnPersistPerson;
use App\Repository\AgentRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

/**
 * @Route("/api/agent")
 */
class AgentController extends AbstractController
{
    /**
     * @Route("", name="agent", methods="GET")
     */
    public function index(AgentRepository $agents, NormalizerInterface $normalizer)
    {
        return $this->json($normalizer->normalize($agents->findAll(), 'json', ['groups' => 'read']), 200);
    }

    /**
     * @Route("", name="agent_new", methods="POST")
     */
    public function new(Request $request, EntityManagerInterface $em, SerializerInterface $serializer, OnPersistPerson $peristPersonne, ValidatorInterface $validator)
    {
        try {
            $personne = $serializer->deserialize($request->getContent(), Personne::class, 'json');
            $errors = $validator->validate($personne);
            if (count($errors) > 0) {
                $data = [];
                foreach ($errors as $error) {
                    $data[$error->getPropertyPath()] = $error->getMessage();
                }
                return $this->json(['status' => 400, 'message' => $data]);
            }
            $personne = $peristPersonne->save($personne);
            if ($personne->getId() != null) {
                if ($em->getRepository(Agent::class)->findBy(['information_personnel' => $personne]))
                    return $this->json(['status' => 400, 'message' => 'Ce personne existe déjà dans la liste des agents']);
            }
            $agent = new Agent;
            $em->persist($agent);
            $agent->setInformationPersonnel($personne);
            $em->flush();
            return $this->json(['status' => 200, 'message' => 'Enregistré avec succès'], 200);
        } catch (NotEncodableValueException $e) {
            return $this->json(['status' => 404, 'message' => $e->getMessage()], 404);
        }
    }

    /**
     * @Route("/{id}", name="agent_edit", methods="PUT")
     */
    public function edit(Agent $agent, Request $request, ValidatorInterface $validator, EntityManagerInterface $em)
    {
        try {
            $info_perso =  $agent->getInformationPersonnel();
            $data = json_decode($request->getContent());
            foreach ($data as $key => $value) {
                if ($key == 'id')
                    continue;
                if (str_contains($key, '_')) {
                    $key = str_replace('_naissance', 'Naissance', $key);
                }
                $method = 'set' . \ucfirst($key);
                if ($key == 'dateNaissance')
                    $info_perso->$method(new \DateTime($value));
                else
                    $info_perso->$method($value);
            }
            $errors = $validator->validate($info_perso);
            if (count($errors) > 0) {
                $data = [];
                foreach ($errors as $error) {
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
     * @Route("/{id}", name="agent_show", methods="GET")
     */
    public function show(JSONService $json, $id, AgentRepository $agents)
    {
        $agent = $agents->find($id);
        if ($agent) {
            return $this->json($json->normalize($agent->getInformationPersonnel()), 200);
        }
        return $this->json(['status' => 400, 'message' => 'Aucune agent pour cet numéro'], 200);
    }
    /**
     * @Route("/{id}", name="agent_delete", methods="DELETE")
     */
    public function delete(AgentRepository $agentRepository, EntityManagerInterface $em, $id)
    {
        $agent = $agentRepository->find($id);
        if ($agent) {
            $em->remove($agent);
            $em->flush();
            return $this->json(['status' => 200, 'message' => 'Suppression réussie'], 200);
        }
        return $this->json(['status' => 400, 'message' => 'Impossible de supprimer'], 200);
    }
}
