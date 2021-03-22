<?php

namespace App\Controller;

use App\Entity\Birth;
use App\Entity\Person;
use App\Repository\BirthRepository;
use App\Repository\PersonRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Knp\Component\Pager\PaginatorInterface;

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
    public function new (Request $request, SerializerInterface $serializer): Response
    {
        try {
            $birth = $serializer->deserialize($request->getContent(), Birth::class, 'json');
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
            return $this->json(['message' => 'Une fiche de naissance a bien été ajoutée avec succès', 'birth' => $birth], 200);
        } catch (\Exception $e) {
            return $this->json(['status' => 400, 'message' => 'Impossible d\'enregistrer : ' . $e->getMessage()], 400);
        }
    }

    /**
     * @Route ("/births", name="birth")
     */
    public function index(BirthRepository $birthRepository, SerializerInterface $serializer, PersonRepository $personRepository)
    {
        $naissances = [];
        $biths =  $birthRepository->findBy([], ['id' => 'DESC']);
        foreach ($biths as $key => $birth) {
            $naissance = [
                    'id' => $birth->getId(),
                    'enfant' => $serializer->serialize($personRepository->find($birth->getPerson()->getId()), 'json', ['groups' => 'read']) ,
                    'mere' => $serializer->serialize($personRepository->find($birth->getMother()->getId()), 'json', ['groups' => 'read']) ,
                    'pere' => $serializer->serialize($personRepository->find($birth->getFather()->getId()), 'json', ['groups' => 'read']) ,
                    'declarant' => $serializer->serialize($personRepository->find($birth->getDeclarant()->getId()), 'json', ['groups' => 'read']) ,
                    'date_declaration' => $birth->getDateDeclaration(),
                    'type_declaration' => $birth->getTypeDeclaration()
             ];
            $naissances[] = $serializer->serialize($naissance, 'json', []);
        }
        return $this->json($naissances, 200, []);
    }

    /**
     * @Route ("/birth/{id}", name="birth_show")
     */
    public function show (Birth $birth, SerializerInterface $serializer, PersonRepository $personRepository)
    {
        $naissance = [
                    'id' => $birth->getId(),
                    'enfant' => $serializer->serialize($personRepository->find($birth->getPerson()->getId()), 'json', ['groups' => 'read']) ,
                    'mere' => $serializer->serialize($personRepository->find($birth->getMother()->getId()), 'json', ['groups' => 'read']) ,
                    'pere' => $serializer->serialize($personRepository->find($birth->getFather()->getId()), 'json', ['groups' => 'read']) ,
                    'declarant' => $serializer->serialize($personRepository->find($birth->getDeclarant()->getId()), 'json', ['groups' => 'read']) ,
                    'date_declaration' => $birth->getDateDeclaration(),
                    'type_declaration' => $birth->getTypeDeclaration()
        ];
        return $this->json($naissance, 200, []);
    }
}
