<?php

namespace App\Entity;

use App\Repository\CommuneRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=CommuneRepository::class)
 */
class Commune
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
     * @ORM\ManyToOne(targetEntity=District::class, inversedBy="communes")
     * @ORM\JoinColumn(nullable=false)
     */
    private $district;

    /**
     * @ORM\OneToMany(targetEntity=Officier::class, mappedBy="poste", orphanRemoval=true)
     */
    private $officiers;

    public function __construct()
    {
        $this->officiers = new ArrayCollection();
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

    public function getDistrict(): ?District
    {
        return $this->district;
    }

    public function setDistrict(?District $district): self
    {
        $this->district = $district;

        return $this;
    }

    /**
     * @return Collection|Officier[]
     */
    public function getOfficiers(): Collection
    {
        return $this->officiers;
    }

    public function addOfficier(Officier $officier): self
    {
        if (!$this->officiers->contains($officier)) {
            $this->officiers[] = $officier;
            $officier->setPoste($this);
        }

        return $this;
    }

    public function removeOfficier(Officier $officier): self
    {
        if ($this->officiers->removeElement($officier)) {
            // set the owning side to null (unless already changed)
            if ($officier->getPoste() === $this) {
                $officier->setPoste(null);
            }
        }

        return $this;
    }
}
