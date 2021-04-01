<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
    /**
     * @Route("/administration")
     */
class AdministrationController extends AbstractController
{
    /**
     * @Route("/acte", name="administration_acte")
     */
    public function acte(): Response
    {
        return $this->json([], 200);
    }

    public function acte_new()
    {
        
    }
}
