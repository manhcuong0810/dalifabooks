<?php

namespace Modules\Support;

class State
{
    /**
     * Path of the resource.
     *
     * @var string
     */
    const RESOURCE_PATH = __DIR__ . '/Resources/states';

    /**
     * Path of the wards/communes resource.
     *
     * @var string
     */
    const WARDS_RESOURCE_PATH = __DIR__ . '/Resources/wards';

    /**
     * Array of states.
     *
     * @var array
     */
    private static $states;

    /**
     * Array of wards/communes by country code.
     *
     * @var array
     */
    private static $wards;


    public static function name($countryCode, $stateCode)
    {
        if (empty($stateCode)) {
            return '';
        }

        $states = self::all($countryCode) ?? [];

        return array_get($states, $stateCode, $stateCode);
    }


    /**
     * Get all raw states of the given country code from the config file.
     *
     * @param string $code
     *
     * @return array|null
     */
    public static function all($code)
    {
        if (isset(self::$states[$code])) {
            return self::$states[$code];
        }

        $path = self::RESOURCE_PATH . "/{$code}.php";

        if (file_exists($path)) {
            return self::$states[$code] = require $path;
        }

        return null;
    }


    /**
     * Get supported/configured states of the given country code.
     *
     * @param string $code
     *
     * @return array|null
     */
    public static function get($code)
    {
        $states = self::all($code);

        if ($code === 'VN' && is_array($states)) {
            $supportedVnStates = setting('supported_vn_states');

            if (is_array($supportedVnStates) && !empty($supportedVnStates)) {
                return array_filter($states, function ($stateCode) use ($supportedVnStates) {
                    return in_array($stateCode, $supportedVnStates);
                }, ARRAY_FILTER_USE_KEY);
            }
        }

        return $states;
    }


    /**
     * Get wards/communes of the given country code and state code.
     *
     * @param string $countryCode
     * @param string|null $stateCode
     *
     * @return array
     */
    public static function wards($countryCode, $stateCode = null)
    {
        if (!isset(self::$wards[$countryCode])) {
            $path = self::WARDS_RESOURCE_PATH . "/{$countryCode}.php";

            self::$wards[$countryCode] = file_exists($path) ? require $path : [];
        }

        if (is_null($stateCode)) {
            return self::$wards[$countryCode];
        }

        return self::$wards[$countryCode][$stateCode] ?? [];
    }
}
