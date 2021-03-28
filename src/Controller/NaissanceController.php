<?php

namespace App\Controller;

use App\Entity\Naissance;
use App\Service\PersonSerivce;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\SerializerInterface;

class NaissanceController extends AbstractController
{
    /**
     * @Route("/naissance", name="naissance")
     */
    public function index(): Response
    {
        return $this->render('naissance/index.html.twig', [
            'controller_name' => 'NaissanceController',
        ]);
    }

    /**
     * @Route("/naissance/declaration", name="naissance_declaration")
     */
    public function declaration(PersonSerivce $personSerivce, Request $request, EntityManagerInterface $em, SerializerInterface $serializerInterface): Response
    {
        try {
            $naissance = $serializerInterface->deserialize($request->getContent(), Naissance::class, 'json');
            $em->persist($naissance->getEnfant());
            $em->persist($naissance);
            $em->flush();
            return $this->json(['message' => 'Enregistré avec succès', 'naissance' => $naissance], 200);
        } catch(NotEncodableValueException $e) {
            return $this->json($e->getMessage(), 400);
        }
    }
}
