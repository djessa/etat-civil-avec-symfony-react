<?php

namespace App\Controller;

use Dompdf\Dompdf;
use Dompdf\Options;
use App\Entity\Birth;
use App\Entity\Person;
use App\Service\PersonSerivce;
use App\Repository\BirthRepository;
use App\Repository\PersonRepository;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;

class BirthController extends AbstractController
{
    private $manager;
    private $personService;

    public function __construct(EntityManagerInterface $em, PersonSerivce $ps)
    {
        $this->manager = $em;
        $this->personService = $ps;
    }
    
    /**
     * @Route("/birth/new", name="birth_new")
     */
    public function new (Request $request, SerializerInterface $serializer): Response
    {
        try {
            $birth = $serializer->deserialize($request->getContent(), Birth::class, 'json');
            $person = $this->personService->isExist($birth->getPerson());
            // person property
            if($person) {
                $birth->setPerson($person);
            } else {
                $this->manager->persist($birth->getPerson());
            }
            // father property
            $father = $this->personService->isExist($birth->getFather());
            if($father) {
                $birth->setFather($father);
            } else {
                $this->manager->persist($birth->getFather());
            }
            // mother property
            $mother = $this->personService->isExist($birth->getMother());
            if($mother) {
                $birth->setMother($mother);
            } else {
                $this->manager->persist($birth->getMother());
            }
            // declarant property
            $declarant = $this->personService->isExist($birth->getDeclarant());
            if($mother) {
                $birth->setDeclarant($declarant);
            } else {
                $this->manager->persist($birth->getDeclarant());
            }
            $birth->setDateDeclaration(new \DateTime);
            $this->manager->persist($birth);
            $this->manager->flush();
            return $this->json(['message' => 'Enregistré avec succès'], 200);
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
     * @Route ("/birth/copie/{id}", name="birth_copie")
     */
    public function copie (Birth $birth)
    {
        $pdfOptions = new Options();
        $pdfOptions->set('defaultFont', 'Arial');
        // Instantiate Dompdf with our options
        $dompdf = new Dompdf($pdfOptions);
        // Retrieve the HTML generated in our twig file

        $html = $this->renderView('template.html.twig');

        $dompdf->loadHtml($html);

        // (Optional) Setup the paper size and orientation 'portrait' or 'portrait'
        $dompdf->setPaper('A4', 'portrait');

        // Render the HTML as PDF
        $dompdf->render();

        // Output the generated PDF to Browser (inline view)
        $dompdf->stream("copie.pdf", [
            "Attachment" => false
        ]);
    }
}
