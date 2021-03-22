<?php

namespace App\Controller;
use App\Repository\PersonRepository;
use App\Entity\Marriage;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
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
    public function new(Request $request, SerializerInterface $serializer, PersonRepository $persons)
    {
    	try {
    		$marriage = $serializer->deserialize($request->getContent(), Marriage::class, 'json');
		} catch (NotEncodableValueException $e) {
            return $this->json(['status' => 400, 'message' => $e->getMessage()]);
        }
		try { 	
			$man_cle = [
    			'first_name' => $marriage->getMan()->getFirstName(), 
    			'last_name' =>  $marriage->getMan()->getLastName(),
    			'birthdate' =>  $marriage->getMan()->getBirthdate(),
    			'birthplace' => $marriage->getMan()->getBirthplace()
    		];
    		if (!$persons->findOneBy($man_cle)) {
    			$this->manager->persist($marriage->getMan());
    		} else {
    			$man = $persons->findOneBy($man_cle);
    			$marriage->getMan()->setId($man->getId());
    			$marriage->getMan()->setSexe($man->getSexe());
    		}
    		 $woman_cle = [
    			'first_name' => $marriage->getWoman()->getFirstName(), 
    			'last_name' =>  $marriage->getWoman()->getLastName(),
    			'birthdate' =>  $marriage->getWoman()->getBirthdate(),
    			'birthplace' => $marriage->getWoman()->getBirthplace()
    		];
    		if (!$persons->findOneBy($woman_cle)) {
    			$this->manager->persist($marriage->getWoman());
    		} else {
    			$woman = $persons->findOneBy($woman_cle);
    			$marriage->getWoman()->setId($woman->getId());
    			$marriage->getWoman()->setSexe($woman->getSexe());
    		}
    		$man_cle = [
    			'first_name' => $marriage->getWitnessMan()->getFirstName(), 
    			'last_name' =>  $marriage->getWitnessMan()->getLastName(),
    			'birthdate' =>  $marriage->getWitnessMan()->getBirthdate(),
    			'birthplace' => $marriage->getWitnessMan()->getBirthplace()
    		];
    		if (!$persons->findOneBy($man_cle)) {
    			$this->manager->persist($marriage->getWitnessMan());
    		} else {
    			$man = $persons->findOneBy($man_cle);
    			$marriage->getWitnessMan()->setId($man->getId());
    			$marriage->getWitnessMan()->setSexe($man->getSexe());
    		}
    		$man_cle = [
    			'first_name' => $marriage->getWitnessWoman()->getFirstName(), 
    			'last_name' =>  $marriage->getWitnessWoman()->getLastName(),
    			'birthdate' =>  $marriage->getWitnessWoman()->getBirthdate(),
    			'birthplace' => $marriage->getWitnessWoman()->getBirthplace()
    		];
    		if (!$persons->findOneBy($man_cle)) {
    			$this->manager->persist($marriage->getWitnessWoman());
    		} else {
    			$man = $persons->findOneBy($man_cle);
    			$marriage->getWitnessWoman()->setId($man->getId());
    			$marriage->getWitnessWoman()->setSexe($man->getSexe());
    		}
    		$marriage->setCreatedAt(new \DateTime());
    		$this->manager->persist($marriage);
    		$this->manager->flush();
    		return $this->json(['message' => 'Une acte de mariage a bien été crée'], 200);
    	} catch (Exception $e) {
            return $this->json(['status' => 400, 'message' => $e->getMessage()]);
        } 	
    }
}
