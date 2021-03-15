<?php

namespace App\Entity;

use App\Repository\BirthRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=BirthRepository::class)
 * @ORM\Table(name="births")
 */
class Birth
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     * @Assert\Date(message="La date n'est pas valide")
     */
    private $date_declaration;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Le type de déclaration est obligatoire")
     */
    private $type_declaration;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $judgment_number;

    /**
     * @ORM\OneToOne(targetEntity=Person::class, inversedBy="birth", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $person;

    /**
     * @ORM\ManyToOne(targetEntity=Person::class)
     * @ORM\JoinColumn(nullable=true)
     */
    private $declarant;

    /**
     * @ORM\ManyToOne(targetEntity=Person::class, inversedBy="sons")
     * @ORM\JoinColumn(nullable=false)
     */
    private $father;

    /**
     * @ORM\ManyToOne(targetEntity=Person::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $mother;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateDeclaration(): ?\DateTimeInterface
    {
        return $this->date_declaration;
    }

    public function setDateDeclaration(\DateTimeInterface $date_declaration): self
    {
        $this->date_declaration = $date_declaration;

        return $this;
    }

    public function getTypeDeclaration(): ?string
    {
        return $this->type_declaration;
    }

    public function setTypeDeclaration(string $type_declaration): self
    {
        $this->type_declaration = $type_declaration;

        return $this;
    }

    public function getJudgmentNumber(): ?string
    {
        return $this->judgment_number;
    }

    public function setJudgmentNumber(string $judgment_number): self
    {
        $this->judgment_number = $judgment_number;

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

    public function getFather(): ?Person
    {
        return $this->father;
    }

    public function setFather(?Person $father): self
    {
        $this->father = $father;

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
}
