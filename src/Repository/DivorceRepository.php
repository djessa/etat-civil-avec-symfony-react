<?php

namespace App\Repository;

use App\Entity\Divorce;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Divorce|null find($id, $lockMode = null, $lockVersion = null)
 * @method Divorce|null findOneBy(array $criteria, array $orderBy = null)
 * @method Divorce[]    findAll()
 * @method Divorce[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DivorceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Divorce::class);
    }

    // /**
    //  * @return Divorce[] Returns an array of Divorce objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('d.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Divorce
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
