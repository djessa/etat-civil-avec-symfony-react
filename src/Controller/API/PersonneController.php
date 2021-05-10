<?php

namespace App\Controller\API;

use App\Service\Constant;
use App\Service\JSONService;
use App\Repository\PersonneRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/api/personne")
 */
class PersonneController extends AbstractController
{
    /**
     * @Route("", name="personne", methods="GET")
     */
    public function index(PersonneRepository $personnes, NormalizerInterface $normalizer, Request $request)
    {
        $page = $request->query->get('page', 0);
        $offset = $page * Constant::PER_PAGE;
        $data = $personnes->findBy([], ['id' => 'DESC'], Constant::PER_PAGE, $offset);
        $registre  = $normalizer->normalize($data, 'json', ['groups' => 'read']);
        if ($page == 0) {
            $pages = ceil((count($personnes->findAll()) / Constant::PER_PAGE));
            return $this->json(['registre' => $registre, 'total' => $pages], 200);
        }
        return $this->json($registre, 200);
    }
    /**
     * @Route("/{id}", name="personne_show", methods="GET")
     */
    public function show(PersonneRepository $personnes, JSONService $json, $id)
    {
        $personne = $personnes->find($id);
        if ($personne) {
            return $this->json($json->normalize($personne), 200);
        }
        return $this->json([], 400);
    }
    /**
     * @Route("/search", name="personne_search", methods="POST")
     */
    public function search(JSONService $json, Request $request, PersonneRepository $personnes)
    {
        return $this->json($json->normalize($personnes->search(json_decode($request->getContent(), true))), 200);
    }
    /**
     * @Route("/naissance/{id}", name="personne_naissance", methods="GET")
     */
    public function naissance(NormalizerInterface $normalizer, Request $request, PersonneRepository $personnes, $id)
    {
        $personne = $personnes->find($id);
        if ($personne) {
            return $this->json($normalizer->normalize($personne->getNaissance(), 'json', ['groups' => 'read']), 200);
        }
        return $this->json([], 200);
    }
    /**
     * @Route("/parent/{id}", name="personne_pere", methods="GET")
     */
    public function getParent(NormalizerInterface $normalizer, Request $request, PersonneRepository $personnes, $id)
    {
        $personne = $personnes->find($id);
        if ($personne) {
            $naissance = $personne->getNaissance();
            if ($naissance) {
                return $this->json($normalizer->normalize($naissance->getParents(), 'json', ['groups' => 'read']), 200);
            }
        }
        return $this->json([], 200);
    }
}
