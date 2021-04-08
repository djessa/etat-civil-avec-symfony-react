<?php

namespace App\Controller\API;

use App\Repository\PersonneRepository;
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
    public function index(PersonneRepository $personnes, NormalizerInterface $normalizer)
    {
        return $this->json($normalizer->normalize($personnes->findBy([], ['id' => 'DESC']), 'json', ['groups' => 'read']), 200);
    }
}
