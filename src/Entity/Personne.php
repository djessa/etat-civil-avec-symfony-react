<?php

namespace App\Entity;

use App\Repository\PersonneRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PersonneRepository::class)
 */
class Personne
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $nom;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $prenom;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $sexe;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $profession;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $residence;

    /**
     * @ORM\OneToOne(targetEntity=Naissance::class, inversedBy="enfant", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $naissance;

    /**
     * @ORM\ManyToMany(targetEntity=Naissance::class, inversedBy="parents")
     */
    private $fils;

    /**
     * @ORM\OneToMany(targetEntity=Naissance::class, mappedBy="declarant")
     */
    private $naissances_declarees;

    public function __construct()
    {
        $this->fils = new ArrayCollection();
        $this->naissances_declarees = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(?string $prenom): self
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getSexe(): ?string
    {
        return $this->sexe;
    }

    public function setSexe(?string $sexe): self
    {
        $this->sexe = $sexe;

        return $this;
    }

    public function getProfession(): ?string
    {
        return $this->profession;
    }

    public function setProfession(?string $profession): self
    {
        $this->profession = $profession;

        return $this;
    }

    public function getResidence(): ?string
    {
        return $this->residence;
    }

    public function setResidence(?string $residence): self
    {
        $this->residence = $residence;

        return $this;
    }

    public function getNaissance(): ?Naissance
    {
        return $this->naissance;
    }

    public function setNaissance(Naissance $naissance): self
    {
        $this->naissance = $naissance;

        return $this;
    }

    /**
     * @return Collection|Naissance[]
     */
    public function getFils(): Collection
    {
        return $this->fils;
    }

    public function addFil(Naissance $fil): self
    {
        if (!$this->fils->contains($fil)) {
            $this->fils[] = $fil;
        }

        return $this;
    }

    public function removeFil(Naissance $fil): self
    {
        $this->fils->removeElement($fil);

        return $this;
    }

    /**
     * @return Collection|Naissance[]
     */
    public function getNaissancesDeclarees(): Collection
    {
        return $this->naissances_declarees;
    }

    public function addNaissancesDeclaree(Naissance $naissancesDeclaree): self
    {
        if (!$this->naissances_declarees->contains($naissancesDeclaree)) {
            $this->naissances_declarees[] = $naissancesDeclaree;
            $naissancesDeclaree->setDeclarant($this);
        }

        return $this;
    }

    public function removeNaissancesDeclaree(Naissance $naissancesDeclaree): self
    {
        if ($this->naissances_declarees->removeElement($naissancesDeclaree)) {
            // set the owning side to null (unless already changed)
            if ($naissancesDeclaree->getDeclarant() === $this) {
                $naissancesDeclaree->setDeclarant(null);
            }
        }

        return $this;
    }
}
