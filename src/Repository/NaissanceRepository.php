<?php

namespace App\Repository;

use App\Entity\Naissance;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Naissance|null find($id, $lockMode = null, $lockVersion = null)
 * @method Naissance|null findOneBy(array $criteria, array $orderBy = null)
 * @method Naissance[]    findAll()
 * @method Naissance[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NaissanceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Naissance::class);
    }

    // /**
    //  * @return Naissance[] Returns an array of Naissance objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('n.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Naissance
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
