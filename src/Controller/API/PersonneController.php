<?php 
namespace App\Controller\API;
use App\Service\PersonService;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
/**
 * @Route("/api/personne")
 */
class PersonneController extends AbstractController
{
    private $service;
    public function __construct(PersonService $ps)
    {
        $this->service = $ps;
    }
    /**
     * @Route("", name="personne", methods="GET")
     */
    public function index()
    {
        return $this->json($this->service->getAll(), 200);
    }
    /**
     * @Route("/{id}", name="personne", methods="GET")
     */
    public function search($id)
    {
        $personne = $this->service->get($id);
        if($personne)
            return $this->json($personne, 200);
        return $this->json(['message' => 'Il n\'existe pas de personne pour cet identifiant'], 400); 
    }
}