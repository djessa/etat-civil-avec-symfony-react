<?php

namespace App\Controller;

use App\Entity\Copie;
use App\Repository\CopieRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;

class CopieController extends AbstractController
{

    private $manager;

    public function __construct(EntityManagerInterface $em)
    {
        $this->manager = $em;
    }


    /**
     * @Route("/copie", name="copie")
     */
    public function index(CopieRepository $copies)
    {
        return $this->json($copies->findAll(), 200);
    }

    /**
     * @Route("/copie/new", name="copie_new")
     */
    public function new(Request $request, SerializerInterface $serializer): Response
    {
        try {
            $copie = $serializer->deserialize($request->getContent(), Copie::class, 'json');
            $this->manager->persist($copie);
            $this->manager->flush();
            return $this->json(['message' => 'Enregistré avec succès'], 200);
        } catch (NotEncodableValueException $e) {
            return $this->json(['message' => 'Impossible d\'enregistré'], 400);
        }
    }


    /**
     * @Route("/copie/delete/{id}", name="copie_delete")
     */
    public function delete (Copie $copie): Response
    {
        $this->manager->remove($copie);
        $this->manager->flush();
        return $this->json(['message' => 'Suppression réussi'], 200);
    }
}
