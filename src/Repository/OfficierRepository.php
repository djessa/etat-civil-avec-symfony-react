<?php

namespace App\Repository;

use App\Entity\Officier;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Officier|null find($id, $lockMode = null, $lockVersion = null)
 * @method Officier|null findOneBy(array $criteria, array $orderBy = null)
 * @method Officier[]    findAll()
 * @method Officier[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class OfficierRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Officier::class);
    }

    // /**
    //  * @return Officier[] Returns an array of Officier objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('o.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Officier
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
