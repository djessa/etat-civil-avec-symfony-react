<?php

namespace App\Controller\API;

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
        $officiers = [];
        foreach ($officierRepository->findAll() as $officier) {
            array_push($officiers, $officier->getInformationPersonnel());
        }
        return $this->json($normalizerInterface->normalize($officiers, 'json', ['groups' => 'read']), 200);
    }
}
