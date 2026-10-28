<?php

namespace Modules\Support\Http\Controllers;

use Modules\Support\State;
use Illuminate\Http\Response;

class CountryStateController
{
    /**
     * Display a listing of the resource.
     *
     * @param string $countryCode
     *
     * @return Response
     */
    public function index($countryCode)
    {
        $states = State::get($countryCode);

        return response()->json($states);
    }


    /**
     * Display a listing of wards/communes for a given country and state.
     *
     * @param string $countryCode
     * @param string $stateCode
     *
     * @return Response
     */
    public function cities($countryCode, $stateCode)
    {
        $cities = State::wards($countryCode, $stateCode);

        return response()->json($cities);
    }
}
