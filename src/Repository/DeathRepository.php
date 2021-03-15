<?php

namespace App\Repository;

use App\Entity\Death;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Death|null find($id, $lockMode = null, $lockVersion = null)
 * @method Death|null findOneBy(array $criteria, array $orderBy = null)
 * @method Death[]    findAll()
 * @method Death[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DeathRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Death::class);
    }

    // /**
    //  * @return Death[] Returns an array of Death objects
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
    public function findOneBySomeField($value): ?Death
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
