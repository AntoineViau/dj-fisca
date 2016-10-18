<?php

class AutoEntrepreneur
{
    private $ca;

    public function __construct($ca)
    {
        $this->ca = $ca;
    }

    public function getCotisations()
    {
        return $this->ca * 0.253;
    }
}
