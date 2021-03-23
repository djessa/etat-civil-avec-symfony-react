<?php

namespace App\Entity;

use App\Repository\DeathRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=DeathRepository::class)
 * @ORM\Table(name="deaths")
 */
class Death
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $date_of_death;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $place_of_death;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $reason;

    /**
     * @ORM\OneToOne(targetEntity=Person::class, cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $person;

    /**
     * @ORM\ManyToOne(targetEntity=Person::class, inversedBy="declaration_deces")
     */
    private $declarant;


    /**
     * @ORM\ManyToOne(targetEntity=Person::class, inversedBy="mother_son_death")
     */
    private $mother;

    /**
     * @ORM\ManyToOne(targetEntity=Person::class, inversedBy="epoux_decede")
     */
    private $epoux;

    /**
     * @ORM\ManyToOne(targetEntity=Person::class, inversedBy="father_son_death")
     */
    private $father;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateOfDeath(): ?\DateTimeInterface
    {
        return $this->date_of_death;
    }

    public function setDateOfDeath(\DateTimeInterface $date_of_death): self
    {
        $this->date_of_death = $date_of_death;

        return $this;
    }

    public function getPlaceOfDeath(): ?string
    {
        return $this->place_of_death;
    }

    public function setPlaceOfDeath(string $place_of_death): self
    {
        $this->place_of_death = $place_of_death;

        return $this;
    }

    public function getReason(): ?string
    {
        return $this->reason;
    }

    public function setReason(string $reason): self
    {
        $this->reason = $reason;

        return $this;
    }

    public function getPerson(): ?Person
    {
        return $this->person;
    }

    public function setPerson(Person $person): self
    {
        $this->person = $person;

        return $this;
    }

    public function getDeclarant(): ?Person
    {
        return $this->declarant;
    }

    public function setDeclarant(?Person $declarant): self
    {
        $this->declarant = $declarant;

        return $this;
    }

    public function getMother(): ?Person
    {
        return $this->mother;
    }

    public function setMother(?Person $mother): self
    {
        $this->mother = $mother;

        return $this;
    }

    public function getEpoux(): ?Person
    {
        return $this->epoux;
    }

    public function setEpoux(?Person $epoux): self
    {
        $this->epoux = $epoux;

        return $this;
    }

    public function getFather(): ?Person
    {
        return $this->father;
    }

    public function setFather(?Person $father): self
    {
        $this->father = $father;

        return $this;
    }
}
