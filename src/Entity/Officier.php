<?php

namespace App\Entity;

use App\Repository\OfficierRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=OfficierRepository::class)
 */
class Officier
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity=Personne::class, cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $information_personnel;

    /**
     * @ORM\OneToMany(targetEntity=Naissance::class, mappedBy="officier", orphanRemoval=true)
     */
    private $naissances_declarees;

    public function __construct()
    {
        $this->naissances_declarees = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getInformationPersonnel(): ?Personne
    {
        return $this->information_personnel;
    }

    public function setInformationPersonnel(Personne $information_personnel): self
    {
        $this->information_personnel = $information_personnel;

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
            $naissancesDeclaree->setOfficier($this);
        }

        return $this;
    }

    public function removeNaissancesDeclaree(Naissance $naissancesDeclaree): self
    {
        if ($this->naissances_declarees->removeElement($naissancesDeclaree)) {
            // set the owning side to null (unless already changed)
            if ($naissancesDeclaree->getOfficier() === $this) {
                $naissancesDeclaree->setOfficier(null);
            }
        }

        return $this;
    }
}
