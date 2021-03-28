<?php

namespace App\Entity;

use App\Repository\NaissanceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=NaissanceRepository::class)
 */
class Naissance
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     */
    private $date_declaration;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $type_declaration;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $numero_jugement;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $date_jugement;

    /**
     * @ORM\Column(type="date")
     */
    private $date_naissance;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $lieu_naissance;

    /**
     * @ORM\OneToOne(targetEntity=Personne::class, mappedBy="naissance", cascade={"persist", "remove"})
     */
    private $enfant;

    /**
     * @ORM\ManyToMany(targetEntity=Personne::class, mappedBy="fils")
     */
    private $parents;

    /**
     * @ORM\ManyToOne(targetEntity=Officier::class, inversedBy="naissances_declarees")
     * @ORM\JoinColumn(nullable=false)
     */
    private $officier;

    /**
     * @ORM\ManyToOne(targetEntity=Personne::class, inversedBy="naissances_declarees")
     */
    private $declarant;

    /**
     * @ORM\Column(type="time", nullable=true)
     */
    private $heure_declaration;

    /**
     * @ORM\Column(type="time", nullable=true)
     */
    private $heure_naissance;

    public function __construct()
    {
        $this->parents = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateDeclaration(): ?\DateTimeInterface
    {
        return $this->date_declaration;
    }

    public function setDateDeclaration( $date_declaration): self
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

    public function getNumeroJugement(): ?string
    {
        return $this->numero_jugement;
    }

    public function setNumeroJugement(?string $numero_jugement): self
    {
        $this->numero_jugement = $numero_jugement;

        return $this;
    }

    public function getDateJugement(): ?\DateTimeInterface
    {
        return $this->date_jugement;
    }

    public function setDateJugement(?\DateTimeInterface $date_jugement): self
    {
        $this->date_jugement = $date_jugement;

        return $this;
    }

    public function getDateNaissance(): ?\DateTimeInterface
    {
        return $this->date_naissance;
    }

    public function setDateNaissance( $date_naissance): self
    {
        $this->date_naissance = $date_naissance;

        return $this;
    }

    public function getLieuNaissance(): ?string
    {
        return $this->lieu_naissance;
    }

    public function setLieuNaissance(string $lieu_naissance): self
    {
        $this->lieu_naissance = $lieu_naissance;

        return $this;
    }

    public function getEnfant(): ?Personne
    {
        return $this->enfant;
    }

    public function setEnfant(Personne $enfant): self
    {
        // set the owning side of the relation if necessary
        if ($enfant->getNaissance() !== $this) {
            $enfant->setNaissance($this);
        }

        $this->enfant = $enfant;

        return $this;
    }

    /**
     * @return Collection|Personne[]
     */
    public function getParents(): Collection
    {
        return $this->parents;
    }

    public function addParent(Personne $parent): self
    {
        if (!$this->parents->contains($parent)) {
            $this->parents[] = $parent;
            $parent->addFil($this);
        }

        return $this;
    }

    public function removeParent(Personne $parent): self
    {
        if ($this->parents->removeElement($parent)) {
            $parent->removeFil($this);
        }

        return $this;
    }

    public function getOfficier(): ?Officier
    {
        return $this->officier;
    }

    public function setOfficier(?Officier $officier): self
    {
        $this->officier = $officier;

        return $this;
    }

    public function getDeclarant(): ?Personne
    {
        return $this->declarant;
    }

    public function setDeclarant(?Personne $declarant): self
    {
        $this->declarant = $declarant;

        return $this;
    }

    public function getHeureDeclaration(): ?\DateTimeInterface
    {
        return $this->heure_declaration;
    }

    public function setHeureDeclaration( $heure_declaration): self
    {
        $this->heure_declaration = $heure_declaration;

        return $this;
    }

    public function getHeureNaissance(): ?\DateTimeInterface
    {
        return $this->heure_naissance;
    }

    public function setHeureNaissance($heure_naissance): self
    {
        $this->heure_naissance = $heure_naissance;

        return $this;
    }
}
