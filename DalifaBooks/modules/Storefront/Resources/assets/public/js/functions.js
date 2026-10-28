export function trans(langKey, replace = {}) {
    let line = window.DalifaBooks.langs[langKey];

    for (let key in replace) {
        line = line.replace(`:${key}`, replace[key]);
    }

    return line;
}

export function formatCurrency(amount) {
    return new Intl.NumberFormat(DalifaBooks.locale.replace("_", "-"), {
        ...(DalifaBooks.locale === "ar" && {
            numberingSystem: "arab",
        }),
        style: "currency",
        currency: DalifaBooks.currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function generateUid() {
    const timestamp = Math.floor(Math.random() * Date.now()).toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8);

    return (timestamp + randomPart).substring(0, 12);
}
