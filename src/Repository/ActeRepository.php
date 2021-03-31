<?php

namespace App\Repository;

use App\Entity\Acte;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Acte|null find($id, $lockMode = null, $lockVersion = null)
 * @method Acte|null findOneBy(array $criteria, array $orderBy = null)
 * @method Acte[]    findAll()
 * @method Acte[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ActeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Acte::class);
    }

    // /**
    //  * @return Acte[] Returns an array of Acte objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Acte
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
