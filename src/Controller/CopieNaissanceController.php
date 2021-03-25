<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CopieNaissanceController extends AbstractController
{
    /**
     * @Route("/copie/naissance", name="copie_naissance")
     */
    public function index(): Response
    {
        return $this->render('copie_naissance/index.html.twig');
    }
}
