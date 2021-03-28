<?php

namespace App\Controller;

use App\Entity\Naissance;
use App\Repository\PersonneRepository;
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
    public function declaration(Request $request, SerializerInterface $serializerInterface, EntityManagerInterface $em): Response
    {
        try {
            $naissance = $serializerInterface->deserialize($request->getContent(), Naissance::class, 'json');
            $enfant = $naissance->getEnfant();
            $em->persist($enfant);
            $pere = $naissance->getParents()[0];
            $em->persist($pere);
            $mere = $naissance->getParents()[1];
            $em->persist($mere);
            $declarant = $naissance->getDeclarant();
            $em->persist($declarant);
            $officier = $naissance->getOfficier();
            $info_officier = $officier->getInformationPersonnel();
            $em->persist($info_officier);
            $em->persist($officier);
            $em->flush();
            return $this->json(['message' => 'Enregistré avec succès'], 200);
        } catch(NotEncodableValueException $e) {
            return $this->json($e->getMessage(), 400);
        }
    }
}
