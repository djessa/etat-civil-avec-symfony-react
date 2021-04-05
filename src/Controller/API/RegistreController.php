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
* @Route("/api/registre")
*/
class RegistreController extends AbstractController
{
    private $manager;

    public function __construct(EntityManagerInterface $em)
    {
        $this->manager = $em;
    }

    /**
     * @Route("/naissance", name="registre_naissance", methods="GET")
     */
    public function naissance (NormalizerInterface $nomalizer, Request $request): Response
    {
        \define('PER_PAGE', 7);
        $naissanceRepository = $this->manager->getRepository(Naissance::class);
        $page = $request->query->get('page', 0);
        $offset = $page * PER_PAGE;
        $naissances = $naissanceRepository->findBy([], ['id' => 'DESC'], PER_PAGE, $offset);
        if($page == 0) {
            $pages = ceil(($naissanceRepository->count([]) / PER_PAGE)) ;
            return $this->json($nomalizer->normalize(['naissances' => $naissances, 'total' => $pages], 'json', ['groups' => 'read']), 200);
        }
        return $this->json($nomalizer->normalize($naissances, 'json', ['groups' => 'read']), 200);
    }

    /**
     * @Route("/naissance/search", name="registre_naissance_search", methods="POST")
     */
    public function search_naissance (NormalizerInterface $nomalizer, Request $request): Response
    {
        $naissanceRepository = $this->manager->getRepository(Naissance::class);
        $personneRepository = $this->manager->getRepository(Personne::class);
        $data = json_decode($request->getContent(), true);
        $personnes = $personneRepository->search($data);
        $naissances = [];
        foreach($personnes as $personne) {
            if($personne->getNaissance() != null)
                $naissances[] = $personne->getNaissance();
        }
        return $this->json($nomalizer->normalize($naissances, 'json', ['groups' => 'read']), 200);
    }
}
