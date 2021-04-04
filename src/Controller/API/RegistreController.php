<?php

namespace App\Controller\API;

use App\Entity\Personne;
use App\Entity\Naissance;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
/**
* @Route("/registre")
*/
class RegistreController extends AbstractController
{
    private $manager;

    public function __construct(EntityManagerInterface $em)
    {
        $this->manager = $em;
    }

    /**
     * @Route("/naissance", name="registre_naissance")
     */
    public function naissance (NormalizerInterface $nomalizer, Request $request): Response
    {
        $naissanceRepository = $this->manager->getRepository(Naissance::class);
        $page = $request->query->get('page', 0);
        $offset = $page * 2;
        $naissances = $naissanceRepository->getAll($offset);
        if($page == 0) {
            $pages = ($naissanceRepository->total() / 2);
            return $this->json($nomalizer->normalize(['naissances' => $naissances, 'total' => $pages], 'json', ['groups' => 'read']), 200);
        }
        return $this->json($nomalizer->normalize($naissances, 'json', ['groups' => 'read']), 200);
    }

    /**
     * @Route("/naissance/search", name="registre_naissance_search")
     */
    public function search_naissance (NormalizerInterface $nomalizer, Request $request): Response
    {
        $naissanceRepository = $this->manager->getRepository(Naissance::class);
        $personneRepository = $this->manager->getRepository(Personne::class);
        $data = json_decode($request->getContent(), true);
        $naissances = [];
        $personnes = $personneRepository->findBy($data);
        foreach ($personnes as $personne) {
            $naissances[] = $personne->getNaissance();
        }
        if(count($naissances) > 0)
            return $this->json($nomalizer->normalize(['naissances' => $naissances, 'vide' => false], 'json', ['groups' => 'read']), 200);
        return $this->json(['vide' => true], 200);
    }
}
