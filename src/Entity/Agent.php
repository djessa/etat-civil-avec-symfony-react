<?php

namespace App\Entity;

use App\Repository\AgentRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=AgentRepository::class)
 */
class Agent
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity=Personne::class, cascade={"persist", "remove"})
     */
    private $information_personnel;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getInformationPersonnel(): ?Personne
    {
        return $this->information_personnel;
    }

    public function setInformationPersonnel(?Personne $information_personnel): self
    {
        $this->information_personnel = $information_personnel;

        return $this;
    }
}
