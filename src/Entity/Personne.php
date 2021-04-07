<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\PersonneRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=PersonneRepository::class)
 * @ORM\Table(name="personnes")
 */
class Personne
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups("read")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("read")
     * @Assert\NotBlank(message="Le nom ne doit pas être vide")
     */
    private $nom;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("read")
     * @Assert\NotBlank(message="Le prénom ne doit pas être vide")
     */
    private $prenom;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("read")
     */
    private $sexe;

    /**
     * @ORM\Column(type="date", nullable=true)
     * @Groups("read")
     * @Assert\NotBlank(message="La date de naissance  doit  être indiquer")
     */
    private $date_naissance;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("read")
     * @Assert\NotBlank(message="Le lieu de naissance  doit  être indiquer")
     */
    private $lieu_naissance;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("read")
     */
    private $profession;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("read")
     */
    private $residence;

    /**
     * @ORM\OneToOne(targetEntity=Naissance::class, inversedBy="enfant", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=true)
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

    public function info ()
    {
        return [
            'nom' => $this->getNom(),
            'prenom' => $this->getPrenom(),
            'sexe' => $this->getSexe(),
            'date_naissance' => $this->getDateNaissance(),
            'lieu_naissance' => $this->getLieuNaissance()
        ];
    }
}
