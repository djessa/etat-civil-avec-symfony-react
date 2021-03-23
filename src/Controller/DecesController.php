<?php

namespace App\Controller;
use App\Service\PersonSerivce;
use App\Entity\Death;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
* @Route("/deces")
*/
class DecesController extends AbstractController
{

	private $manager;

	public function __construct(EntityManagerInterface $em)
	{
		$this->manager = $em;
	}

    /**
     * @Route("/new", name="deces_new")
     */
    public function new(Request $request, SerializerInterface $serializer, PersonSerivce $persons): Response
    {
    	try {
    		$deces = $serializer->deserialize($request->getContent(), Death::class, 'json');
    		// person property 
			$person = $persons->isExist($deces->getPerson());
			if ($person) {
    			$deces->setPerson($person);
    		} else {
    			$this->manager->persist($deces->getPerson());
    		}
			// father property
    		$father = $persons->isExist($deces->getFather());
			if ($father) {
    			$deces->setFather($father);
    		} else {
    			$this->manager->persist($deces->getFather());
    		}
    		// mother property 
			$mother = $persons->isExist($deces->getMother());
			if ($mother) {
    			$deces->setMother($mother);
    		} else {
    			$this->manager->persist($deces->getMother());
    		}
			// epoux property
    		$epoux = $persons->isExist($deces->getEpoux());
			if ($epoux) {
    			$deces->setEpoux($epoux);
    		} else {
				if ($deces->getEpoux() !== null) {
					$this->manager->persist($deces->getEpoux());
				}
    		}
			// declarant property
    		$declarant = $persons->isExist($deces->getDeclarant());
			if ($declarant) {
    			$deces->setDeclarant($declarant);
    		} else {
				if ($deces->getDeclarant() !== null) {
					$this->manager->persist($deces->getDeclarant());
				}
    		}
			$this->manager->persist($deces);
			$this->manager->flush();
			return $this->json(['message' => 'Enregistré avec succès'], 200);
    	} catch (NotEncodableValueException $e) {
            return $this->json(['status' => 400, 'message' => $e->getMessage()]);
        }
    }
}
