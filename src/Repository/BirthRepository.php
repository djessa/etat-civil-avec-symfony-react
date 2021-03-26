<?php

namespace App\Repository;

use App\Entity\Birth;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Birth|null find($id, $lockMode = null, $lockVersion = null)
 * @method Birth|null findOneBy(array $criteria, array $orderBy = null)
 * @method Birth[]    findAll()
 * @method Birth[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BirthRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Birth::class);
    }

    // /**
    //  * @return Birth[] Returns an array of Birth objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Birth
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
