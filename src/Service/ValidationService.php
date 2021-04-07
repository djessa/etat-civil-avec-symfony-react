<?php
namespace App\Service;
use Symfony\Component\Validator\Validator\ValidatorInterface;
class ValidationService
{
    private $validator;
    public function __construct(ValidatorInterface $v)
    {
        $this->validator  = $v; 
    }
    public function isErrorExist($object)
    {
        $errors = $this->validator->validate($object);
        if(count($errors) > 0) {
            $data = [];
            foreach($errors as $error) {
                $data[$error->getPropertyPath()] = $error->getMessage();
            }
            return $data;
        }
        return false;
    }
}