<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DecesController extends AbstractController
{
    /**
     * @Route("/deces", name="deces")
     */
    public function index(): Response
    {
        return $this->render('deces/index.html.twig', [
            'controller_name' => 'DecesController',
        ]);
    }
}
