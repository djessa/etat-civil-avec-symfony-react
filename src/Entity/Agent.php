<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\AgentRepository;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=AgentRepository::class)
 */
class Agent
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups("read")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity=Personne::class, cascade={"persist"})
     * @Groups("read")
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
