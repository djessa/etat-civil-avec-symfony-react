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

    public function __construct()
    {
        $this->son_father = new ArrayCollection();
        $this->son_mother = new ArrayCollection();
        $this->son_declarant = new ArrayCollection();
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
}
