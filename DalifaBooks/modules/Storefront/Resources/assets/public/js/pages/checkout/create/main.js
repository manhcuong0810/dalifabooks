import Errors from "../../../components/Errors";
import "../../../components/CartItem";

Alpine.data(
    "Checkout",
    ({
        customerEmail,
        customerPhone,
        addresses,
        defaultAddress,
        gateways,
        countries,
    }) => ({
        addresses,
        defaultAddress,
        gateways,
        countries,
        form: {
            customer_email: customerEmail,
            customer_phone: customerPhone,
            billing: {},
            shipping: {},
            billingAddressId: null,
            shippingAddressId: null,
            newBillingAddress: false,
            newShippingAddress: false,
            ship_to_a_different_address: false,
        },
        states: {
            billing: {},
            shipping: {},
        },
        wards: {
            billing: [],
            shipping: [],
        },
        controller: null,
        shippingMethodName: null,
        applyingCoupon: false,
        couponCode: null,
        couponError: null,
        placingOrder: false,
        stripe: null,
        stripeElements: null,
        authorizeNetToken: null,
        payFastFormFields: {},
        errors: new Errors(),

        get cartFetched() {
            return this.$store.cart.fetched;
        },

        get cart() {
            return this.$store.cart.cart;
        },

        get cartIsEmpty() {
            return this.$store.cart.isEmpty;
        },

        get hasAddress() {
            return Object.keys(this.addresses).length !== 0;
        },

        get hasSingleCountry() {
            return Object.keys(this.countries).length === 1;
        },

        get firstCountry() {
            return Object.keys(this.countries)[0];
        },

        get hasBillingStates() {
            return Object.keys(this.states.billing).length !== 0;
        },

        get hasShippingStates() {
            return Object.keys(this.states.shipping).length !== 0;
        },

        get hasBillingWards() {
            return (
                Array.isArray(this.wards.billing) &&
                this.wards.billing.length !== 0
            );
        },

        get hasShippingWards() {
            return (
                Array.isArray(this.wards.shipping) &&
                this.wards.shipping.length !== 0
            );
        },

        get shouldUseBillingWardSelect() {
            return (
                (this.form.billing.country || this.firstCountry) === "VN" ||
                this.hasBillingWards
            );
        },

        get shouldUseShippingWardSelect() {
            return (
                (this.form.shipping.country || this.firstCountry) === "VN" ||
                this.hasShippingWards
            );
        },

        get hasNoPaymentMethod() {
            return Object.keys(this.gateways).length === 0;
        },

        get firstPaymentMethod() {
            return Object.keys(this.gateways)[0];
        },

        get shouldShowPaymentInstructions() {
            return ["bank_transfer", "check_payment"].includes(
                this.form.payment_method
            );
        },

        get paymentInstructions() {
            if (this.shouldShowPaymentInstructions) {
                return this.gateways[this.form.payment_method].instructions;
            }
        },

        get hasShippingMethod() {
            return Object.keys(this.cart.availableShippingMethods).length !== 0;
        },

        get hasFreeShipping() {
            return this.cart.coupon?.free_shipping ?? false;
        },

        get firstShippingMethod() {
            return Object.keys(this.cart.availableShippingMethods)[0];
        },

        init() {
            Alpine.effect(() => {
                if (this.cartFetched) {
                    this.hideSkeleton();
                    this.changePaymentMethod(this.firstPaymentMethod);

                    if (this.cart.shippingMethodName) {
                        this.changeShippingMethod(this.cart.shippingMethodName);
                    } else {
                        this.updateShippingMethod(this.firstShippingMethod);
                    }

                    if (
                        DalifaBooks.stripeEnabled &&
                        DalifaBooks.stripeIntegrationType === "embedded_form"
                    ) {
                        this.renderStripeElements();
                    }
                }
            });

            this.$watch("form.billing.city", (newCity) => {
                if (newCity) {
                    this.addTaxes();
                }
            });

            this.$watch("form.shipping.city", (newCity) => {
                if (newCity) {
                    this.addTaxes();
                }
            });

            this.$watch("form.billing.zip", (newZip) => {
                if (newZip) {
                    this.addTaxes();
                }
            });

            this.$watch("form.shipping.zip", (newZip) => {
                if (newZip) {
                    this.addTaxes();
                }
            });

            this.$watch("form.billing.state", (newState) => {
                if (newState) {
                    this.addTaxes();
                }
            });

            this.$watch("form.shipping.state", (newState) => {
                if (newState) {
                    this.addTaxes();
                }
            });

            this.$watch("form.ship_to_a_different_address", (newValue) => {
                if (newValue && this.form.shippingAddressId && !this.form.newShippingAddress) {
                    this.form.shipping =
                        this.addresses[this.form.shippingAddressId];
                } else {
                    this.form.shipping = {};
                    this.resetAddressErrors("shipping");
                    this.ensureDefaultCountry("shipping");
                }

                this.addTaxes();
            });

            this.$watch("form.terms_and_conditions", () => {
                this.errors.clear("terms_and_conditions");
            });

            this.$watch("form.payment_method", (newPaymentMethod) => {
                if (newPaymentMethod === "paypal") {
                    this.$nextTick(this.renderPayPalButton());
                }
            });

            if (!DalifaBooks.loggedIn) {
                this.loadGuestCheckoutData();
            }

            if (this.defaultAddress.address_id) {
                this.form.billingAddressId = this.defaultAddress.address_id;
                this.form.shippingAddressId = this.defaultAddress.address_id;

                this.mergeSavedBillingAddress();
                this.mergeSavedShippingAddress();
            }

            if (!this.hasAddress) {
                this.form.newBillingAddress = true;
                this.form.newShippingAddress = true;
            }

            this.ensureDefaultCountry("billing");
            this.ensureDefaultCountry("shipping");

            if (!DalifaBooks.loggedIn) {
                this.$watch(
                    "form",
                    () => {
                        this.saveGuestDraft();
                    },
                    { deep: true }
                );

                window.addEventListener("beforeunload", () => {
                    this.persistGuestAddresses();
                });
            }

            this.setTabReminder();
        },

        getGuestStorageKey() {
            return "dalifabooks_guest_checkout";
        },

        readGuestStorage() {
            try {
                const raw = localStorage.getItem(this.getGuestStorageKey());
                return raw ? JSON.parse(raw) : {};
            } catch (e) {
                return {};
            }
        },

        writeGuestStorage(data) {
            try {
                localStorage.setItem(
                    this.getGuestStorageKey(),
                    JSON.stringify(data)
                );
            } catch (e) {}
        },

        ensureDefaultCountry(type = "billing") {
            if (!this.form[type]) {
                this.form[type] = {};
            }

            if (
                !this.form[type].country &&
                this.hasSingleCountry &&
                this.firstCountry
            ) {
                this.form[type].country = this.firstCountry;
            }

            const country = this.form[type].country;

            if (country) {
                const savedState = this.form[type].state || "";
                const savedCity = this.form[type].city || "";

                this.fetchStates(country, (response) => {
                    this.states[type] = response.data || {};

                    if (savedState && this.states[type][savedState]) {
                        this.form[type].state = savedState;

                        this.fetchWards(country, savedState, (wardResp) => {
                            this.wards[type] = Array.isArray(wardResp.data)
                                ? wardResp.data
                                : [];

                            if (savedCity) {
                                this.form[type].city = savedCity;
                            }
                        });
                    }
                });
            }
        },

        isAddressComplete(addr) {
            return Boolean(
                addr &&
                    addr.first_name &&
                    addr.address_1 &&
                    addr.city &&
                    (addr.country || this.firstCountry) &&
                    addr.state
            );
        },

        buildGuestAddress(addr, type = "billing", existingId = null) {
            const firstName = (addr.first_name || "").trim();
            const lastName = (addr.last_name || "").trim();
            const stateCode = addr.state || "";
            const countryCode = addr.country || this.firstCountry || "VN";

            return {
                id:
                    existingId ||
                    `guest_${Date.now()}_${Math.random()
                        .toString(36)
                        .slice(2, 6)}`,
                first_name: firstName,
                last_name: lastName,
                full_name: `${firstName} ${lastName}`.trim(),
                address_1: (addr.address_1 || "").trim(),
                address_2: (addr.address_2 || "").trim(),
                city: (addr.city || "").trim(),
                state: stateCode,
                state_name:
                    this.states[type]?.[stateCode] ||
                    addr.state_name ||
                    stateCode,
                zip: (addr.zip || "").trim(),
                country: countryCode,
                country_name:
                    this.countries?.[countryCode] ||
                    addr.country_name ||
                    countryCode,
            };
        },

        findMatchingGuestAddressId(addresses, candidate) {
            const normalize = (v) => (v || "").toString().trim().toLowerCase();

            return Object.keys(addresses).find((id) => {
                const item = addresses[id];
                return (
                    normalize(item.first_name) ===
                        normalize(candidate.first_name) &&
                    normalize(item.last_name) ===
                        normalize(candidate.last_name) &&
                    normalize(item.address_1) ===
                        normalize(candidate.address_1) &&
                    normalize(item.address_2) ===
                        normalize(candidate.address_2) &&
                    normalize(item.city) === normalize(candidate.city) &&
                    normalize(item.state) === normalize(candidate.state) &&
                    normalize(item.country) === normalize(candidate.country)
                );
            });
        },

        loadGuestCheckoutData() {
            const saved = this.readGuestStorage();

            if (saved.customer_email && !this.form.customer_email) {
                this.form.customer_email = saved.customer_email;
            }

            if (saved.customer_phone && !this.form.customer_phone) {
                this.form.customer_phone = saved.customer_phone;
            }

            if (
                saved.addresses &&
                typeof saved.addresses === "object" &&
                Object.keys(saved.addresses).length > 0
            ) {
                this.addresses = saved.addresses;

                const defaultId =
                    saved.defaultAddressId &&
                    saved.addresses[saved.defaultAddressId]
                        ? saved.defaultAddressId
                        : Object.keys(saved.addresses)[0];

                this.defaultAddress = { address_id: defaultId };
            } else if (saved.draft) {
                if (
                    saved.draft.billing &&
                    Object.keys(saved.draft.billing).length > 0
                ) {
                    const draftBilling = { ...saved.draft.billing };
                    if (draftBilling.last_name) {
                        draftBilling.first_name = `${draftBilling.first_name || ""} ${draftBilling.last_name}`.trim();
                        draftBilling.last_name = "";
                    }
                    this.form.billing = draftBilling;
                }

                if (saved.draft.ship_to_a_different_address) {
                    this.form.ship_to_a_different_address = true;
                }

                if (
                    saved.draft.shipping &&
                    Object.keys(saved.draft.shipping).length > 0
                ) {
                    const draftShipping = { ...saved.draft.shipping };
                    if (draftShipping.last_name) {
                        draftShipping.first_name = `${draftShipping.first_name || ""} ${draftShipping.last_name}`.trim();
                        draftShipping.last_name = "";
                    }
                    this.form.shipping = draftShipping;
                }
            }
        },

        saveGuestDraft() {
            if (DalifaBooks.loggedIn) {
                return;
            }

            const saved = this.readGuestStorage();

            if (this.form.customer_email) {
                saved.customer_email = this.form.customer_email;
            }

            if (this.form.customer_phone) {
                saved.customer_phone = this.form.customer_phone;
            }

            saved.addresses = this.addresses || {};
            saved.defaultAddressId = this.defaultAddress?.address_id || null;
            saved.draft = {
                billing: this.form.newBillingAddress ? this.form.billing : {},
                shipping: this.form.newShippingAddress
                    ? this.form.shipping
                    : {},
                ship_to_a_different_address:
                    this.form.ship_to_a_different_address,
            };

            this.writeGuestStorage(saved);
        },

        persistGuestAddresses() {
            if (DalifaBooks.loggedIn) {
                return;
            }

            const saved = this.readGuestStorage();
            const addresses = { ...(this.addresses || {}) };
            let defaultAddressId = this.defaultAddress?.address_id || null;

            if (this.form.customer_email) {
                saved.customer_email = this.form.customer_email;
            }

            if (this.form.customer_phone) {
                saved.customer_phone = this.form.customer_phone;
            }

            if (
                this.form.newBillingAddress &&
                this.isAddressComplete(this.form.billing)
            ) {
                const existingId = this.findMatchingGuestAddressId(
                    addresses,
                    this.form.billing
                );
                const billingAddr = this.buildGuestAddress(
                    this.form.billing,
                    "billing",
                    existingId
                );
                addresses[billingAddr.id] = billingAddr;
                defaultAddressId = billingAddr.id;
            } else if (
                this.form.billingAddressId &&
                addresses[this.form.billingAddressId]
            ) {
                defaultAddressId = this.form.billingAddressId;
            }

            if (
                this.form.ship_to_a_different_address &&
                this.form.newShippingAddress &&
                this.isAddressComplete(this.form.shipping)
            ) {
                const existingId = this.findMatchingGuestAddressId(
                    addresses,
                    this.form.shipping
                );
                const shippingAddr = this.buildGuestAddress(
                    this.form.shipping,
                    "shipping",
                    existingId
                );
                addresses[shippingAddr.id] = shippingAddr;
            }

            this.addresses = addresses;
            this.defaultAddress = { address_id: defaultAddressId };

            saved.addresses = addresses;
            saved.defaultAddressId = defaultAddressId;
            saved.draft = {};

            this.writeGuestStorage(saved);
        },

        deleteGuestAddress(addressId) {
            if (DalifaBooks.loggedIn || !this.addresses[addressId]) {
                return;
            }

            const updated = { ...this.addresses };
            delete updated[addressId];
            this.addresses = updated;

            const remainingIds = Object.keys(this.addresses);

            if (remainingIds.length === 0) {
                this.defaultAddress = { address_id: null };
                this.form.billingAddressId = null;
                this.form.shippingAddressId = null;
                this.form.billing = {};
                this.form.shipping = {};
                this.form.newBillingAddress = true;
                this.form.newShippingAddress = true;
                this.ensureDefaultCountry("billing");
                this.ensureDefaultCountry("shipping");
            } else {
                const nextId = remainingIds[0];

                if (this.defaultAddress.address_id === addressId) {
                    this.defaultAddress = { address_id: nextId };
                }

                if (this.form.billingAddressId === addressId) {
                    this.form.billingAddressId = nextId;
                    this.mergeSavedBillingAddress();
                }

                if (this.form.shippingAddressId === addressId) {
                    this.form.shippingAddressId = nextId;
                    this.mergeSavedShippingAddress();
                }
            }

            this.saveGuestDraft();
        },

        setTabReminder() {
            const originalTitle = document.title;
            let timeoutId;

            document.addEventListener("visibilitychange", function () {
                if (document.hidden) {
                    timeoutId = setTimeout(() => {
                        document.title = trans(
                            "storefront::checkout.remember_about_your_order"
                        );
                    }, 1000);
                } else {
                    clearTimeout(timeoutId);

                    document.title = originalTitle;
                }
            });
        },

        hideSkeleton() {
            const selectors = [
                ".cart-items-skeleton",
                ".order-summary-list-skeleton",
                ".order-summary-total-skeleton",
            ];

            selectors.forEach((selector) => {
                const element = document.querySelector(selector);

                if (element) {
                    element.remove();
                }
            });
        },

        changeBillingAddress(address) {
            if (
                this.form.newBillingAddress ||
                this.form.billingAddressId === address.id
            ) {
                return;
            }

            this.form.billingAddressId = address.id;

            this.mergeSavedBillingAddress();
        },

        addNewBillingAddress() {
            this.resetAddressErrors("billing");

            this.form.billing = {};
            this.wards.billing = [];
            this.form.newBillingAddress = !this.form.newBillingAddress;

            if (!this.form.newBillingAddress) {
                this.mergeSavedBillingAddress();
            } else {
                this.ensureDefaultCountry("billing");
            }
        },

        changeShippingAddress(address) {
            if (
                this.form.newShippingAddress ||
                this.form.shippingAddressId === address.id
            ) {
                return;
            }

            this.form.shippingAddressId = address.id;

            this.mergeSavedShippingAddress();
        },

        addNewShippingAddress() {
            this.resetAddressErrors("shipping");

            this.form.shipping = {};
            this.wards.shipping = [];
            this.form.newShippingAddress = !this.form.newShippingAddress;

            if (!this.form.newShippingAddress) {
                this.mergeSavedShippingAddress();
            } else {
                this.ensureDefaultCountry("shipping");
            }
        },

        // Reset address errors based on address type
        resetAddressErrors(addressType) {
            Object.keys(this.errors.errors).map((key) => {
                key.indexOf(addressType) !== -1 && this.errors.clear(key);
            });
        },

        mergeSavedBillingAddress() {
            this.resetAddressErrors("billing");

            if (!this.form.newBillingAddress && this.form.billingAddressId) {
                this.form.billing = {
                    ...this.addresses[this.form.billingAddressId],
                };
            }
        },

        mergeSavedShippingAddress() {
            this.resetAddressErrors("shipping");

            if (
                this.form.ship_to_a_different_address &&
                !this.form.newShippingAddress &&
                this.form.shippingAddressId
            ) {
                this.form.shipping = {
                    ...this.addresses[this.form.shippingAddressId],
                };
            }
        },

        changeBillingCity(city) {
            this.form.billing.city = city;
        },

        changeShippingCity(city) {
            this.form.shipping.city = city;
        },

        changeBillingZip(zip) {
            this.form.billing.zip = zip;
        },

        changeShippingZip(zip) {
            this.form.shipping.zip = zip;
        },

        changeBillingCountry(country) {
            this.form.billing.country = country;
            this.form.billing.state = "";
            this.form.billing.city = "";
            this.wards.billing = [];

            if (country === "") {
                this.states.billing = {};

                return;
            }

            this.fetchStates(country, (response) => {
                this.states.billing = response.data || {};
                this.form.billing.state = "";
            });
        },

        changeShippingCountry(country) {
            this.form.shipping.country = country;
            this.form.shipping.state = "";
            this.form.shipping.city = "";
            this.wards.shipping = [];

            if (country === "") {
                this.states.shipping = {};

                return;
            }

            this.fetchStates(country, (response) => {
                this.states.shipping = response.data || {};
                this.form.shipping.state = "";
            });
        },

        fetchStates(country, callback) {
            axios.get(`/countries/${country}/states`).then(callback);
        },

        fetchWards(country, state, callback) {
            axios
                .get(`/countries/${country}/states/${state}/cities`)
                .then(callback);
        },

        changeBillingState(state) {
            this.form.billing.state = state;
            this.form.billing.city = "";

            const country = this.form.billing.country || this.firstCountry;

            if (!state || !country) {
                this.wards.billing = [];
                return;
            }

            this.fetchWards(country, state, (response) => {
                this.wards.billing = Array.isArray(response.data)
                    ? response.data
                    : [];
            });
        },

        changeShippingState(state) {
            this.form.shipping.state = state;
            this.form.shipping.city = "";

            const country = this.form.shipping.country || this.firstCountry;

            if (!state || !country) {
                this.wards.shipping = [];
                return;
            }

            this.fetchWards(country, state, (response) => {
                this.wards.shipping = Array.isArray(response.data)
                    ? response.data
                    : [];
            });
        },

        changePaymentMethod(paymentMethod) {
            this.form.payment_method = paymentMethod;
        },

        changeShippingMethod(shippingMethodName) {
            this.form.shipping_method = shippingMethodName;
        },

        async updateShippingMethod(shippingMethodName) {
            if (!shippingMethodName) {
                return;
            }

            this.changeShippingMethod(shippingMethodName);

            try {
                const response = await axios.post("/cart/shipping-method", {
                    shipping_method: shippingMethodName,
                });

                this.$store.cart.updateCart(response.data);
            } catch (error) {
                notify(error.response.data.message);
            }
        },

        async addTaxes() {
            try {
                const response = await axios.post("/cart/taxes", this.form);

                this.$store.cart.updateCart(response.data);
            } catch (error) {
                notify(error.response.data.message);
            }
        },

        applyCoupon() {
            if (!this.couponCode) {
                return;
            }

            this.applyingCoupon = true;

            axios
                .post("/cart/coupon", { coupon: this.couponCode })
                .then((response) => {
                    this.couponCode = null;
                    this.couponError = null;

                    this.$store.cart.updateCart(response.data);
                })
                .catch((error) => {
                    this.couponError = error.response.data.message;
                })
                .finally(() => {
                    this.applyingCoupon = false;
                });
        },

        removeCoupon() {
            axios
                .delete("/cart/coupon")
                .then(() => {
                    this.updateShippingMethod(this.form.shipping_method);
                })
                .catch((error) => {
                    notify(error.response.data.message);
                });
        },

        placeOrder() {
            if (!this.form.terms_and_conditions || this.placingOrder) {
                return;
            }

            if (!DalifaBooks.loggedIn) {
                this.persistGuestAddresses();
            }

            this.placingOrder = true;

            axios
                .post("/checkout", {
                    ...this.form,
                    ship_to_a_different_address:
                        +this.form.ship_to_a_different_address,
                })
                .then(({ data }) => {
                    if (data.redirectUrl) {
                        window.location.href = data.redirectUrl;
                    } else if (this.form.payment_method === "stripe") {
                        this.confirmStripePayment(data);
                    } else if (this.form.payment_method === "paytm") {
                        this.confirmPaytmPayment(data);
                    } else if (this.form.payment_method === "razorpay") {
                        this.confirmRazorpayPayment(data);
                    } else if (this.form.payment_method === "paystack") {
                        this.confirmPaystackPayment(data);
                    } else if (this.form.payment_method === "authorizenet") {
                        this.confirmAuthorizeNetPayment(data);
                    } else if (this.form.payment_method === "flutterwave") {
                        this.confirmFlutterWavePayment(data);
                    } else if (this.form.payment_method === "mercadopago") {
                        this.confirmMercadoPagoPayment(data);
                    } else if (this.form.payment_method === "payfast") {
                        this.confirmPayFastPayment(data);
                    } else {
                        this.confirmOrder(
                            data.orderId,
                            this.form.payment_method
                        );
                    }
                })
                .catch(({ response }) => {
                    this.placingOrder = false;

                    if (response.status === 422) {
                        this.errors.record(response.data.errors);
                    }

                    notify(response.data.message);
                });
        },

        confirmOrder(orderId, paymentMethod, params = {}) {
            axios
                .get(`/checkout/${orderId}/complete`, {
                    params: {
                        paymentMethod,
                        ...params,
                    },
                })
                .then(() => {
                    window.location.href = "/checkout/complete";
                })
                .catch((error) => {
                    this.placingOrder = false;

                    this.deleteOrder(orderId);

                    notify(error.response.data.message);
                });
        },

        async deleteOrder(orderId) {
            if (!orderId) {
                return;
            }

            const response = await axios.get(
                `/checkout/${orderId}/payment-canceled`
            );

            notify(response.data.message);
        },

        renderPayPalButton() {
            let vm = this;
            let response;

            window.paypal
                .Buttons({
                    async createOrder() {
                        try {
                            response = await axios.post("/checkout", vm.form);

                            return response.data.resourceId;
                        } catch ({ response }) {
                            if (response.status === 422) {
                                vm.errors.record(response.data.errors);

                                return;
                            }

                            notify(response.data.message);
                        }
                    },
                    onApprove() {
                        vm.confirmOrder(
                            response.data.orderId,
                            "paypal",
                            response.data
                        );
                    },
                    onError() {
                        vm.deleteOrder(response.data.orderId);
                    },
                    onCancel() {
                        vm.deleteOrder(response.data.orderId);
                    },
                })
                .render("#paypal-button-container");
        },

        async renderStripeElements() {
            this.stripe = Stripe(DalifaBooks.stripePublishableKey, {});

            this.stripeElements = this.stripe.elements({
                mode: "payment",
                amount: Math.round(this.$store.cart.total * 100),
                currency: DalifaBooks.currency.toLowerCase(),
            });

            this.stripeElements.create("payment").mount("#stripe-element");
        },

        async confirmStripePayment({ client_secret, orderId, return_url }) {
            const elements = this.stripeElements;

            const { error: submitError } = await this.stripeElements.submit();

            if (submitError) {
                this.placingOrder = false;

                this.deleteOrder(orderId);

                notify(submitError.message);

                return;
            }

            const { error } = await this.stripe.confirmPayment({
                elements,
                clientSecret: client_secret,
                confirmParams: {
                    return_url,
                },
            });

            if (error) {
                this.placingOrder = false;

                this.deleteOrder(orderId);

                notify(error.message);
            }
        },

        confirmPaytmPayment({ orderId, amount, txnToken }) {
            let config = {
                root: "",
                flow: "DEFAULT",
                data: {
                    orderId: orderId,
                    token: txnToken,
                    tokenType: "TXN_TOKEN",
                    amount: amount,
                },
                merchant: {
                    name: DalifaBooks.storeName,
                    redirect: false,
                },
                handler: {
                    transactionStatus: (response) => {
                        if (response.STATUS === "TXN_SUCCESS") {
                            this.confirmOrder(orderId, "paytm", response);
                        } else if (response.STATUS === "TXN_FAILURE") {
                            this.placingOrder = false;

                            this.deleteOrder(orderId);
                        }

                        window.Paytm.CheckoutJS.close();
                    },
                    notifyMerchant: (eventName) => {
                        if (eventName === "APP_CLOSED") {
                            this.placingOrder = false;

                            this.deleteOrder(orderId);
                        }
                    },
                },
            };

            window.Paytm.CheckoutJS.init(config)
                .then(() => {
                    window.Paytm.CheckoutJS.invoke();
                })
                .catch(() => {
                    this.deleteOrder(orderId);
                });
        },

        confirmRazorpayPayment(razorpayOrder) {
            this.placingOrder = false;

            let vm = this;

            new window.Razorpay({
                key: razorpayOrder.razorpayKeyId,
                name: DalifaBooks.storeName,
                description: trans("storefront::checkout.payment_for_order", {
                    id: razorpayOrder.receipt,
                }),
                image: DalifaBooks.storeLogo,
                order_id: razorpayOrder.id,
                handler(response) {
                    vm.placingOrder = true;

                    vm.confirmOrder(
                        razorpayOrder.receipt,
                        "razorpay",
                        response
                    );
                },
                modal: {
                    ondismiss() {
                        vm.deleteOrder(razorpayOrder.receipt);
                    },
                },
                prefill: {
                    name: `${vm.form.billing.first_name} ${vm.form.billing.last_name}`,
                    email: vm.form.customer_email,
                    contact: vm.form.customer_phone,
                },
            }).open();
        },

        confirmPaystackPayment({
            key,
            email,
            amount,
            ref,
            currency,
            order_id,
        }) {
            let vm = this;

            PaystackPop.setup({
                key,
                email,
                amount,
                ref,
                currency,
                onClose() {
                    vm.placingOrder = false;

                    vm.deleteOrder(order_id);
                },
                callback(response) {
                    vm.placingOrder = false;

                    vm.confirmOrder(order_id, "paystack", response);
                },
                onBankTransferConfirmationPending(response) {
                    vm.placingOrder = false;

                    vm.confirmOrder(order_id, "paystack", response);
                },
            }).openIframe();
        },

        confirmAuthorizeNetPayment({ token }) {
            this.authorizeNetToken = token;

            this.$nextTick(() => {
                this.$refs.authorizeNetForm.submit();

                this.authorizeNetToken = null;
            });
        },

        confirmFlutterWavePayment({
            public_key,
            tx_ref,
            order_id,
            amount,
            currency,
            payment_options,
            redirect_url,
        }) {
            let vm = this;

            FlutterwaveCheckout({
                public_key,
                tx_ref,
                amount,
                currency,
                payment_options: payment_options.join(", "),
                redirect_url,
                customer: {
                    email: this.form.customer_email,
                    phone_number: this.form.customer_phone,
                    name: this.form.billing.full_name,
                },
                customizations: {
                    title: DalifaBooks.storeName,
                    logo: DalifaBooks.storeLogo,
                },
                onclose(incomplete) {
                    vm.placingOrder = false;

                    if (incomplete) {
                        vm.deleteOrder(order_id);
                    }
                },
            });
        },

        confirmMercadoPagoPayment(mercadoPagoOrder) {
            this.placingOrder = false;

            const SUPPORTED_LOCALES = {
                en_US: "en-US",
                es_AR: "es-AR",
                es_CL: "es-CL",
                es_CO: "es-CO",
                es_MX: "es-MX",
                es_VE: "es-VE",
                es_UY: "es-UY",
                es_PE: "es-PE",
                pt_BR: "pt-BR",
            };

            const mercadoPago = new MercadoPago(mercadoPagoOrder.publicKey, {
                locale:
                    SUPPORTED_LOCALES[mercadoPagoOrder.currentLocale] ||
                    "en-US",
            });

            mercadoPago.checkout({
                preference: {
                    id: mercadoPagoOrder.preferenceId,
                },
                autoOpen: true,
            });
        },

        confirmPayFastPayment(payFastOrder) {
            this.payFastFormFields = payFastOrder.formFields;

            this.$nextTick(() => {
                this.$refs.payFastForm.submit();
            });
        },
    })
);
