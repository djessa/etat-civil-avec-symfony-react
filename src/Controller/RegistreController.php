<?php

namespace App\Controller;

use App\Repository\NaissanceRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    /**
     * @Route("/registre")
     */
class RegistreController extends AbstractController
{
    /**
     * @Route("/naissance", name="registre_naissance")
     */
    public function index(NaissanceRepository $naissanceRepository, NormalizerInterface $nomalizer): Response
    {
        $naissances = $naissanceRepository->findBy([], ['id' => 'desc'], 3);
        return $this->json($nomalizer->normalize($naissances, 'json', ['groups' => 'read']), 200);
    }
}
