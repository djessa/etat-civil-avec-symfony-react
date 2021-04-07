<?php
namespace App\Service;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
class JSONService {
    private $normalizer;
    public function __construct(NormalizerInterface $normalizer)
    {
        $this->normalizer = $normalizer;
    }
    public function normalize($data)
    {
        return $this->normalizer->normalize($data, 'json', ['groups' => 'read']);
    }
}