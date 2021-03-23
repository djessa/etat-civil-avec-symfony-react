<?php

namespace App\Entity;

use App\Repository\PersonRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ORM\Entity(repositoryClass=PersonRepository::class)
 * @ORM\Table(name="persons")
 */
class Person
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups ("read")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Le prénom ne doit pas être vide")
     * @Groups ("read")
     */
    private $first_name;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Le nom ne doit pas être vide")
     * @Groups ("read")
     */
    private $last_name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Assert\NotBlank(message="Le sexe doit être préciser")
     * @Groups ("read")
     */
    private $sexe;

    /**
     * @ORM\Column(type="datetime")
     * @Assert\NotBlank(message="La date de naissance doit être indiquer")
     * @Groups ("read")
     */
    private $birthdate;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups ("read")
     */
    private $birthplace;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups ("read")
     */
    private $profession;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups ("read")
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups ("read")
     */
    private $address;

    /**
     * @ORM\OneToOne(targetEntity=Birth::class, mappedBy="person", cascade={"persist", "remove"})
     */
    private $birth;

    /**
     * @ORM\OneToMany(targetEntity=Birth::class, mappedBy="father")
     * Fait reference à son fils ou sa fille en tant que père
     */
    private $son_father;

    /**
     * @ORM\OneToMany(targetEntity=Birth::class, mappedBy="mother")
    * Fait reference à son fils ou sa fille en tant que mère
     */
    private $son_mother;

    /**
     * @ORM\OneToMany(targetEntity=Birth::class, mappedBy="declarant")
     * Fait reference à son fils ou sa fille en tant que declarant
     */
    private $son_declarant;

    /**
     * @ORM\OneToMany(targetEntity=Death::class, mappedBy="declarant")
     */
    private $declaration_deces;

    /**
     * @ORM\OneToMany(targetEntity=Death::class, mappedBy="mother")
     */
    private $mother_son_death;

    /**
     * @ORM\OneToMany(targetEntity=Death::class, mappedBy="epoux")
     */
    private $epoux_decede;

    /**
     * @ORM\OneToMany(targetEntity=Death::class, mappedBy="father")
     */
    private $father_son_death;

    public function __construct()
    {
        $this->son_father = new ArrayCollection();
        $this->son_mother = new ArrayCollection();
        $this->son_declarant = new ArrayCollection();
        $this->declaration_deces = new ArrayCollection();
        $this->mother_son_death = new ArrayCollection();
        $this->epoux_decede = new ArrayCollection();
        $this->father_son_death = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->first_name;
    }

    public function setFirstName(string $first_name): self
    {
        $this->first_name = $first_name;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->last_name;
    }

    public function setLastName(string $last_name): self
    {
        $this->last_name = $last_name;

        return $this;
    }

    public function getSexe(): ?string
    {
        return $this->sexe;
    }

    public function setSexe(string $sexe): self
    {
        $this->sexe = $sexe;

        return $this;
    }

    public function getBirthdate(): ?\DateTimeInterface
    {
        return $this->birthdate;
    }

    public function setBirthdate(\DateTimeInterface $birthdate): self
    {
        $this->birthdate = $birthdate;

        return $this;
    }

    public function getBirthplace(): ?string
    {
        return $this->birthplace;
    }

    public function setBirthplace(string $birthplace): self
    {
        $this->birthplace = $birthplace;

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

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(?string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getBirth(): ?Birth
    {
        return $this->birth;
    }

    public function setBirth(Birth $birth): self
    {
        // set the owning side of the relation if necessary
        if ($birth->getPerson() !== $this) {
            $birth->setPerson($this);
        }

        $this->birth = $birth;

        return $this;
    }

    /**
     * @return Collection|Birth[]
     */
    public function getSonFather(): Collection
    {
        return $this->son_father;
    }

    public function addSonFather(Birth $sonFather): self
    {
        if (!$this->son_father->contains($sonFather)) {
            $this->son_father[] = $sonFather;
            $sonFather->setFather($this);
        }

        return $this;
    }

    public function removeSonFather(Birth $sonFather): self
    {
        if ($this->son_father->removeElement($sonFather)) {
            // set the owning side to null (unless already changed)
            if ($sonFather->getFather() === $this) {
                $sonFather->setFather(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Birth[]
     */
    public function getSonMother(): Collection
    {
        return $this->son_mother;
    }

    public function addSonMother(Birth $sonMother): self
    {
        if (!$this->son_mother->contains($sonMother)) {
            $this->son_mother[] = $sonMother;
            $sonMother->setMother($this);
        }

        return $this;
    }

    public function removeSonMother(Birth $sonMother): self
    {
        if ($this->son_mother->removeElement($sonMother)) {
            // set the owning side to null (unless already changed)
            if ($sonMother->getMother() === $this) {
                $sonMother->setMother(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Birth[]
     */
    public function getSonDeclarant(): Collection
    {
        return $this->son_declarant;
    }

    public function addSonDeclarant(Birth $sonDeclarant): self
    {
        if (!$this->son_declarant->contains($sonDeclarant)) {
            $this->son_declarant[] = $sonDeclarant;
            $sonDeclarant->setDeclarant($this);
        }

        return $this;
    }

    public function removeSonDeclarant(Birth $sonDeclarant): self
    {
        if ($this->son_declarant->removeElement($sonDeclarant)) {
            // set the owning side to null (unless already changed)
            if ($sonDeclarant->getDeclarant() === $this) {
                $sonDeclarant->setDeclarant(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Death[]
     */
    public function getDeclarationDeces(): Collection
    {
        return $this->declaration_deces;
    }

    public function addDeclarationDece(Death $declarationDece): self
    {
        if (!$this->declaration_deces->contains($declarationDece)) {
            $this->declaration_deces[] = $declarationDece;
            $declarationDece->setDeclarant($this);
        }

        return $this;
    }

    public function removeDeclarationDece(Death $declarationDece): self
    {
        if ($this->declaration_deces->removeElement($declarationDece)) {
            // set the owning side to null (unless already changed)
            if ($declarationDece->getDeclarant() === $this) {
                $declarationDece->setDeclarant(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Death[]
     */
    public function getMotherSonDeath(): Collection
    {
        return $this->mother_son_death;
    }

    public function addMotherSonDeath(Death $motherSonDeath): self
    {
        if (!$this->mother_son_death->contains($motherSonDeath)) {
            $this->mother_son_death[] = $motherSonDeath;
            $motherSonDeath->setMother($this);
        }

        return $this;
    }

    public function removeMotherSonDeath(Death $motherSonDeath): self
    {
        if ($this->mother_son_death->removeElement($motherSonDeath)) {
            // set the owning side to null (unless already changed)
            if ($motherSonDeath->getMother() === $this) {
                $motherSonDeath->setMother(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Death[]
     */
    public function getEpouxDecede(): Collection
    {
        return $this->epoux_decede;
    }

    public function addEpouxDecede(Death $epouxDecede): self
    {
        if (!$this->epoux_decede->contains($epouxDecede)) {
            $this->epoux_decede[] = $epouxDecede;
            $epouxDecede->setEpoux($this);
        }

        return $this;
    }

    public function removeEpouxDecede(Death $epouxDecede): self
    {
        if ($this->epoux_decede->removeElement($epouxDecede)) {
            // set the owning side to null (unless already changed)
            if ($epouxDecede->getEpoux() === $this) {
                $epouxDecede->setEpoux(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Death[]
     */
    public function getFatherSonDeath(): Collection
    {
        return $this->father_son_death;
    }

    public function addFatherSonDeath(Death $fatherSonDeath): self
    {
        if (!$this->father_son_death->contains($fatherSonDeath)) {
            $this->father_son_death[] = $fatherSonDeath;
            $fatherSonDeath->setFather($this);
        }

        return $this;
    }

    public function removeFatherSonDeath(Death $fatherSonDeath): self
    {
        if ($this->father_son_death->removeElement($fatherSonDeath)) {
            // set the owning side to null (unless already changed)
            if ($fatherSonDeath->getFather() === $this) {
                $fatherSonDeath->setFather(null);
            }
        }

        return $this;
    }
}
