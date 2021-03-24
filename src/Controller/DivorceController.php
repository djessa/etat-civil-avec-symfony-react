<?php 

namespace App\Controller;

use App\Entity\Divorce;
use App\Service\PersonSerivce;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;

/**
* @Route("/divorce")
*/
class DivorceController extends AbstractController
{

    private $manager;

    private $personService;

    public function __construct(EntityManagerInterface $em,  PersonSerivce $ps)
    {
        $this->manager = $em;
        $this->personService = $ps;
    }

    /**
     * @Route("/new", name="divorce_new")
     */
    public function new(Request $request, SerializerInterface $serializer, ValidatorInterface $validator): Response
    {
        try {
           $divorce = $serializer->deserialize($request->getContent(), Divorce::class, 'json'); 
           $divorce->setDateEtablissement(new \DateTime);
           // Man property
           $man = $this->personService->isExist($divorce->getMan());
           if($man) {
               $divorce->setMan($man);
           } else {
               $this->manager->persist($divorce->getMan());
           }
           // Woman property
           $woman = $this->personService->isExist($divorce->getWoman());
           if($woman) {
               $divorce->setWoman($woman);
           } else {
               $this->manager->persist($divorce->getWoman());
           }
           $this->manager->persist($divorce);
           $this->manager->flush();

           return $this->json(['message' => 'Enregistré avec succès'], 200);
        
        } catch (NotEncodableValueException $e) {

            return $this->json(['message' => $e->getMessage()], 400);
        }
    }
}
