<?php

namespace App\Repository;

use App\Entity\Copie;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Copie|null find($id, $lockMode = null, $lockVersion = null)
 * @method Copie|null findOneBy(array $criteria, array $orderBy = null)
 * @method Copie[]    findAll()
 * @method Copie[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CopieRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Copie::class);
    }

    // /**
    //  * @return Copie[] Returns an array of Copie objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Copie
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
