<?php

namespace App\Entity;

use App\Repository\MarriageRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=MarriageRepository::class)
 * @ORM\Table(name="marriages")
 */
class Marriage
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
    private $createdAt;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $lieu;

    /**
     * @ORM\ManyToOne(targetEntity=Person::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $man;

    /**
     * @ORM\ManyToOne(targetEntity=Person::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $woman;

    /**
     * @ORM\ManyToOne(targetEntity=Person::class)
     */
    private $witness_man;

    /**
     * @ORM\ManyToOne(targetEntity=Person::class)
     */
    private $witness_woman;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $regime;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getLieu(): ?string
    {
        return $this->lieu;
    }

    public function setLieu(string $lieu): self
    {
        $this->lieu = $lieu;

        return $this;
    }

    public function getMan(): ?Person
    {
        return $this->man;
    }

    public function setMan(?Person $man): self
    {
        $this->man = $man;

        return $this;
    }

    public function getWoman(): ?Person
    {
        return $this->woman;
    }

    public function setWoman(?Person $woman): self
    {
        $this->woman = $woman;

        return $this;
    }

    public function getWitnessMan(): ?Person
    {
        return $this->witness_man;
    }

    public function setWitnessMan(?Person $witness_man): self
    {
        $this->witness_man = $witness_man;

        return $this;
    }

    public function getWitnessWoman(): ?Person
    {
        return $this->witness_woman;
    }

    public function setWitnessWoman(?Person $witness_woman): self
    {
        $this->witness_woman = $witness_woman;

        return $this;
    }

    public function getRegime(): ?string
    {
        return $this->regime;
    }

    public function setRegime(string $regime): self
    {
        $this->regime = $regime;

        return $this;
    }
}
