<?php

namespace Modules\Account\Http\Requests;

use Modules\Support\Country;
use Illuminate\Validation\Rule;
use Modules\Core\Http\Requests\Request;

class SaveAddressRequest extends Request
{
    /**
     * Available attributes.
     *
     * @var string
     */
    protected $availableAttributes = 'account::attributes.addresses';


    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation()
    {
        $supportedCountries = Country::supportedCodes();
        $defaultCountry = count($supportedCountries) === 1
            ? $supportedCountries[0]
            : setting('default_country', 'VN');

        $this->merge([
            'last_name' => $this->input('last_name', '') ?? '',
            'zip' => $this->input('zip', '') ?? '',
            'country' => $this->input('country') ?: $defaultCountry,
        ]);
    }


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name' => ['required'],
            'last_name' => ['nullable'],
            'address_1' => ['required'],
            'city' => ['required'],
            'zip' => [setting('storefront_zip_code_enabled') ? 'required' : 'nullable'],
            'country' => ['required', Rule::in(Country::supportedCodes())],
            'state' => ['required'],
        ];
    }
}
