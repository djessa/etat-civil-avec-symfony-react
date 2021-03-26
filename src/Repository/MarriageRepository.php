<?php

namespace App\Repository;

use App\Entity\Marriage;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Marriage|null find($id, $lockMode = null, $lockVersion = null)
 * @method Marriage|null findOneBy(array $criteria, array $orderBy = null)
 * @method Marriage[]    findAll()
 * @method Marriage[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MarriageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Marriage::class);
    }

    // /**
    //  * @return Marriage[] Returns an array of Marriage objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Marriage
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
