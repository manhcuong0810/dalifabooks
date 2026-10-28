import Errors from "../../../components/Errors";

Alpine.data(
    "Addresses",
    ({ initialAddresses, initialDefaultAddress, countries }) => ({
        addresses: initialAddresses,
        defaultAddress: initialDefaultAddress,
        countries,
        formOpen: false,
        editing: false,
        loading: false,
        form: { state: "", city: "" },
        states: {},
        wards: [],
        errors: new Errors(),

        get hasSingleCountry() {
            return Object.keys(this.countries).length === 1;
        },

        get firstCountry() {
            return Object.keys(this.countries)[0];
        },

        get hasAddress() {
            return Object.keys(this.addresses).length !== 0;
        },

        get hasNoStates() {
            return Object.keys(this.states).length === 0;
        },

        get hasWards() {
            return Array.isArray(this.wards) && this.wards.length !== 0;
        },

        get shouldUseWardSelect() {
            return (
                (this.form.country || this.firstCountry) === "VN" ||
                this.hasWards
            );
        },

        init() {
            this.changeCountry(this.firstCountry);
        },

        changeDefaultAddress(address) {
            if (this.defaultAddress.address_id === address.id) return;

            this.defaultAddress.address_id = address.id;

            axios
                .post("/account/addresses/change-default", {
                    address_id: address.id,
                })
                .then((response) => {
                    notify(response.data);
                })
                .catch((error) => {
                    notify(error.response.data.message);
                });
        },

        changeCountry(country) {
            this.form.country = country;
            this.form.state = "";
            this.form.city = "";
            this.wards = [];

            this.fetchStates(country);
        },

        changeState(state) {
            this.form.state = state;
            this.form.city = "";

            const country = this.form.country || this.firstCountry;

            if (!state || !country) {
                this.wards = [];
                return;
            }

            this.fetchWards(country, state);
        },

        changeCity(city) {
            this.form.city = city;
        },

        async fetchStates(country, callback) {
            const response = await axios.get(`/countries/${country}/states`);

            this.states = response.data || {};

            if (callback) {
                callback();
            }
        },

        async fetchWards(country, state, callback) {
            const response = await axios.get(
                `/countries/${country}/states/${state}/cities`
            );

            this.wards = Array.isArray(response.data) ? response.data : [];

            if (callback) {
                callback();
            }
        },

        edit(address) {
            this.formOpen = true;
            this.editing = true;

            this.$nextTick(() => {
                const fullName = `${address.first_name || ""} ${address.last_name || ""}`.trim();

                this.form = {
                    ...address,
                    first_name: fullName,
                    last_name: "",
                };

                const country = address.country || this.firstCountry;

                this.fetchStates(country, () => {
                    this.form.state = "";

                    this.$nextTick(() => {
                        this.form.state = address.state || "";

                        if (address.state) {
                            this.fetchWards(country, address.state, () => {
                                this.$nextTick(() => {
                                    this.form.city = address.city || "";
                                });
                            });
                        }
                    });
                });
            });
        },

        remove(address) {
            if (!confirm(trans("storefront::account.addresses.confirm"))) {
                return;
            }

            axios
                .delete(`/account/addresses/${address.id}`)
                .then((response) => {
                    delete this.addresses[address.id];

                    notify(response.data.message);
                })
                .catch((error) => {
                    notify(error.response.data.message);
                });
        },

        cancel() {
            this.editing = false;
            this.formOpen = false;

            this.errors.reset();
            this.resetForm();
        },

        save() {
            this.loading = true;

            this.editing ? this.update() : this.create();
        },

        update() {
            axios
                .put(`/account/addresses/${this.form.id}`, this.form)
                .then(({ data }) => {
                    this.formOpen = false;
                    this.editing = false;

                    this.addresses[this.form.id] = data.address;

                    this.resetForm();

                    notify(data.message);
                })
                .catch(({ response }) => {
                    if (response.status === 422) {
                        this.errors.record(response.data.errors);
                    }

                    notify(response.data.message);
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        create() {
            axios
                .post("/account/addresses", this.form)
                .then(({ data }) => {
                    this.formOpen = false;

                    let address = { [data.address.id]: data.address };

                    this.addresses = {
                        ...this.addresses,
                        ...address,
                    };

                    this.resetForm();

                    notify(data.message);
                })
                .catch(({ response }) => {
                    if (response.status === 422) {
                        this.errors.record(response.data.errors);
                    }

                    notify(response.data.message);
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        resetForm() {
            this.form = {
                country: this.firstCountry,
                state: "",
                city: "",
            };
            this.wards = [];
        },
    })
);
