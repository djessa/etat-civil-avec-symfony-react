<?php

namespace App\Controller;
use App\Entity\Marriage;
use App\Service\PersonSerivce;
use App\Repository\PersonRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
 /**
 * @Route("/marriage")
 */
class MarriageController extends AbstractController
{

	private $manager;

	public function __construct(EntityManagerInterface $em)
	{
		$this->manager = $em;
	}

    /**
     * @Route("/new", name="marriage_new")
     */
    public function new(PersonSerivce $personnes, Request $request, SerializerInterface $serializer, PersonRepository $persons)
    {
    	try {
    		$marriage = $serializer->deserialize($request->getContent(), Marriage::class, 'json');
		} catch (NotEncodableValueException $e) {
            return $this->json(['status' => 400, 'message' => $e->getMessage()]);
        }
		try { 
			// Man property
			$man = $personnes->isExist($marriage->getMan());
    		if ($man) {
				$marriage->setMan($man);
    		} else {
    			$this->manager->persist($marriage->getMan());
    		}
			// Woman property
			$woman = $persons->findOneBy($marriage->getWoman());
    		if ($woman) {
				$marriage->setWoman($woman);
    		} else {
				$this->manager->persist($marriage->getWoman());
    		}
			// WitnessMan property
			$witnessMan = $persons->findOneBy($marriage->getWitnessMan());
    		if ($witnessMan) {
				$marriage->setWitnessMan($witnessMan);
    		} else {
    			$this->manager->persist($marriage->getWitnessMan());
    		}
			// WitnessWoman property
			$witnessWoman = $persons->findOneBy($marriage->getWitnessWoman());
    		if ($witnessWoman) {
    			$marriage->setWitnessWoman($witnessWoman);
    		} else {
				$this->manager->persist($marriage->getWitnessWoman());
    		}
    		$marriage->setCreatedAt(new \DateTime());
    		$this->manager->persist($marriage);
    		$this->manager->flush();
    		return $this->json(['message' => 'Enregistré avec succès'], 200);
    	} catch (Exception $e) {
            return $this->json(['status' => 400, 'message' => $e->getMessage()]);
        } 	
    }
}
