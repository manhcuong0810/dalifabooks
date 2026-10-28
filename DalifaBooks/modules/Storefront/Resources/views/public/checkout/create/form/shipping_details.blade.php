<div class="shipping-details">
    <div class="row">
        <div class="col-md-18">
            <div class="form-group ship-to-different-address-label">
                <div class="form-check">
                    <input
                        type="checkbox"
                        name="ship_to_a_different_address"
                        id="ship-to-different-address"
                        x-model="form.ship_to_a_different_address"
                    >

                    <label for="ship-to-different-address" class="form-check-label">
                        {{ trans('checkout::attributes.ship_to_a_different_address') }}
                    </label>
                </div>
            </div>

            <div x-cloak x-show="form.ship_to_a_different_address" class="ship-to-different-address-form">
                <h4 class="section-title">{{ trans('storefront::checkout.shipping_details') }}</h4>

                <template x-if="hasAddress">
                    <div class="address-card-wrap">
                        <div class="row">
                            <template x-for="address in addresses" :key="address.id">
                                <div class="col d-flex">
                                    <address
                                        class="address-card"
                                        :class="{
                                            active: form.shippingAddressId === address.id && !form.newShippingAddress,
                                            'cursor-default': form.newShippingAddress
                                        }"
                                        @click="changeShippingAddress(address)"
                                    >
                                        <svg class="address-card-selected-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z" fill="#292D32"/>
                                        </svg>  
                                        
                                        <template x-if="defaultAddress.address_id === address.id">
                                            <span class="badge">
                                                {{ trans('storefront::checkout.default') }}
                                            </span>
                                        </template>
                                        
                                        <div class="address-card-data">
                                            <span x-text="address.full_name"></span>
                                            <span x-text="address.address_1"></span>

                                            <template x-if="address.address_2">
                                                <span x-text="address.address_2"></span>
                                            </template>

                                            <span x-html="`${address.city}, ${address.state_name ?? address.state}${address.zip ? ' ' + address.zip : ''}`"></span>
                                            <template x-if="!hasSingleCountry">
                                                <span x-text="address.country_name"></span>
                                            </template>
                                        </div>

                                        @guest
                                            <button
                                                type="button"
                                                class="btn-delete-guest-address"
                                                @click.stop="deleteGuestAddress(address.id)"
                                                title="Xóa địa chỉ đã lưu"
                                                style="position: absolute; bottom: 10px; right: 12px; border: none; background: transparent; color: #dc3545; font-size: 13px; padding: 2px 6px; cursor: pointer; opacity: 0.8;"
                                            >
                                                <i class="las la-trash"></i>
                                            </button>
                                        @endguest
                                    </address>
                                </div>
                            </template>
                        </div>

                        <template x-if="form.ship_to_a_different_address && !form.newShippingAddress && !form.shippingAddressId">
                            <span class="error-message">
                                {{ trans('storefront::checkout.you_must_select_an_address') }}
                            </span>
                        </template>
                    </div>
                </template>

                <div class="add-new-address-wrap">
                    <template x-if="hasAddress">
                        <button
                            type="button"
                            class="btn btn-add-new-address"
                            @click="addNewShippingAddress"
                        >
                            <span x-text="form.newShippingAddress ? '-' : '+'"></span>
                            
                            {{ trans('storefront::checkout.add_new_address') }}
                        </button>
                    </template>

                    <div class="add-new-address-form" x-show="!hasAddress || form.newShippingAddress">
                        <div class="row">
                            <div class="col-md-18">
                                <div class="form-group">
                                    <label for="shipping-first-name">
                                        {{ trans('checkout::attributes.shipping.first_name') }}<span>*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="shipping[first_name]"
                                        id="shipping-first-name"
                                        class="form-control"
                                        x-model="form.shipping.first_name"
                                    >

                                    <template x-if="errors.has('shipping.first_name')">
                                        <span class="error-message" x-text="errors.get('shipping.first_name')"></span>
                                    </template>
                                </div>
                            </div>

                            <div class="col-md-18" x-cloak x-show="!hasSingleCountry">
                                <div class="form-group">
                                    <label for="shipping-country">
                                        {{ trans('checkout::attributes.shipping.country') }}<span>*</span>
                                    </label>

                                    <select
                                        name="shipping[country]"
                                        id="shipping-country"
                                        class="form-control arrow-black"
                                        :value="form.shipping.country || ''"
                                        @change="changeShippingCountry($event.target.value)"
                                    >
                                        <option value="">{{ trans('storefront::checkout.please_select') }}
                                        </option>

                                        <template x-for="(name, code) in countries" :key="code">
                                            <option :value="code" :selected="form.shipping.country === code" x-text="name"></option>
                                        </template>
                                    </select>

                                    <template x-if="errors.has('shipping.country')">
                                        <span class="error-message" x-text="errors.get('shipping.country')"></span>
                                    </template>
                                </div>
                            </div>

                            <div class="col-md-9">
                                <div class="form-group">
                                    <label for="shipping-state">
                                        {{ trans('checkout::attributes.shipping.state') }}<span>*</span>
                                    </label>

                                    <template x-if="!hasShippingStates">
                                        <input
                                            type="text"
                                            name="shipping[state]"
                                            id="shipping-state"
                                            class="form-control"
                                            x-model="form.shipping.state"
                                        >
                                    </template>

                                    <template x-if="hasShippingStates">
                                        <select
                                            x-cloak
                                            name="shipping[state]"
                                            id="shipping-state"
                                            class="form-control arrow-black"
                                            :value="form.shipping.state || ''"
                                            @change="changeShippingState($event.target.value)"
                                        >
                                            <option value="">{{ trans('storefront::checkout.please_select') }}
                                            </option>

                                            <template x-for="(name, code) in states.shipping" :key="code">
                                                <option :value="code" :selected="form.shipping.state === code" x-html="name"></option>
                                            </template>
                                        </select>
                                    </template>

                                    <template x-if="errors.has('shipping.state')">
                                        <span class="error-message" x-text="errors.get('shipping.state')"></span>
                                    </template>
                                </div>
                            </div>

                            <div class="col-md-9">
                                <div class="form-group">
                                    <label for="shipping-city">
                                        {{ trans('checkout::attributes.shipping.city') }}<span>*</span>
                                    </label>

                                    <template x-if="!shouldUseShippingWardSelect">
                                        <input
                                            type="text"
                                            name="shipping[city]"
                                            :value="form.shipping.city || ''"
                                            id="shipping-city"
                                            class="form-control"
                                            @change="changeShippingCity($event.target.value)"
                                        >
                                    </template>

                                    <template x-if="shouldUseShippingWardSelect">
                                        <select
                                            name="shipping[city]"
                                            id="shipping-city"
                                            class="form-control arrow-black"
                                            :value="form.shipping.city || ''"
                                            @change="changeShippingCity($event.target.value)"
                                        >
                                            <option value="">{{ trans('storefront::checkout.please_select') }}</option>

                                            <template x-for="ward in wards.shipping" :key="ward">
                                                <option :value="ward" :selected="form.shipping.city === ward" x-text="ward"></option>
                                            </template>
                                        </select>
                                    </template>

                                    <template x-if="errors.has('shipping.city')">
                                        <span class="error-message" x-text="errors.get('shipping.city')"></span>
                                    </template>
                                </div>
                            </div>

                            <div class="{{ setting('storefront_zip_code_enabled') ? 'col-md-9' : 'col-md-18' }}">
                                <div class="form-group">
                                    <label for="shipping-address-1">
                                        {{ trans('checkout::attributes.street_address') }}<span>*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="shipping[address_1]"
                                        id="shipping-address-1"
                                        class="form-control"
                                        placeholder="{{ trans('checkout::attributes.shipping.address_1') }}"
                                        x-model="form.shipping.address_1"
                                    >

                                    <template x-if="errors.has('shipping.address_1')">
                                        <span class="error-message" x-text="errors.get('shipping.address_1')"></span>
                                    </template>
                                </div>
                            </div>

                            @if (setting('storefront_zip_code_enabled'))
                                <div class="col-md-9">
                                    <div class="form-group">
                                        <label for="shipping-zip">
                                            {{ trans('checkout::attributes.shipping.zip') }}<span>*</span>
                                        </label>

                                        <input
                                            type="text"
                                            name="shipping[zip]"
                                            :value="form.shipping.zip"
                                            id="shipping-zip"
                                            class="form-control"
                                            @change="changeShippingZip($event.target.value)"
                                        >

                                        <template x-if="errors.has('shipping.zip')">
                                            <span class="error-message" x-text="errors.get('shipping.zip')"></span>
                                        </template>
                                    </div>
                                </div>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
