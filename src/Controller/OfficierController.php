<?php

namespace App\Controller;
use App\Repository\OfficierRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class OfficierController extends AbstractController
{
    /**
     * @Route("/officier", name="officier")
     */
    public function index(OfficierRepository $officierRepository, NormalizerInterface $normalizerInterface)
    {
        return $this->json($normalizerInterface->normalize($officierRepository->findAll(), 'json', ['groups' => 'read']), 200);
    }
}
