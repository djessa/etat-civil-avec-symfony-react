<?php

namespace App\Controller;

use App\Entity\Birth;
use App\Entity\Person;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;

class BirthController extends AbstractController
{
    private $manager;

    public function __construct(EntityManagerInterface $em)
    {
        $this->manager = $em;
    }
    /**
     * @Route("/birth/new", name="birth_new")
     */
    public function index(Request $request, SerializerInterface $serializer): Response
    {
        try {
            $data = $request->getContent();
            $birth = $serializer->deserialize($data, Birth::class, 'json');
            $person = $birth->getPerson();
            $this->manager->persist($person);
            $father = $birth->getFather();
            $father->setSexe('masculin');
            $this->manager->persist($father);
            $mother = $birth->getMother();
            $mother->setSexe('feminin');
            $this->manager->persist($mother);
            $declarant = $birth->getDeclarant();
            $this->manager->persist($declarant);
            $birth->setDateDeclaration(new \DateTime());
            $birth->setPerson($person)
                ->setFather($father)
                ->setMother($mother)
                ->setDeclarant($declarant);
            $this->manager->persist($birth);
            $this->manager->flush();
            return $this->json(['message' => 'Une fiche de naissance a bien été ajoutée avec succès', 'ok' => true], 200);
        } catch (\Exception $e) {
            return  $this->json(['message' => 'Il y a de problème au format de données que vous avez saisi', 'ok' => false], 400);
        }
    }
}
