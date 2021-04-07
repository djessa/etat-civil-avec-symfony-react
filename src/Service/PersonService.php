<?php
namespace App\Service;
use App\Repository\PersonneRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
class PersonService {
    private $manager;
    private $repository;
    private $normalizer;
    public function __construct(EntityManagerInterface $em, PersonneRepository $pr, NormalizerInterface $n)
    {
        $this->manager = $em;
        $this->repository = $pr;
        $this->normalizer = $n;
    }
    public function getAll()
    {
        return $this->normalizer->normalize($this->repository->findBy([], ['id' => 'DESC']), 'json', ['groups' => 'read']);
    }
    public function get($id)
    {
        return $this->normalizer->normalize($this->repository->find($id), 'json', ['groups' => 'read']);
    }
    public function save($personne)
    {
        $personneEnBase = $this->repository->findOneBy($personne->info());
        if($personneEnBase) {
            $personneEnBase->setProfession($personne->getProfession());
            $personneEnBase->setResidence($personne->getResidence());
            return $personneEnBase;
        } else {
            $this->manager->persist($personne);
            return $personne;
        }
    }
    public function avoirFicheNaissance($personne)
    {
        $personneEnBase = $this->repository->findOneBy($personne->info());
        if($personneEnBase) {
            if($personneEnBase->getNaissance() != null)
                return true;
        }
        return false;
    }
}