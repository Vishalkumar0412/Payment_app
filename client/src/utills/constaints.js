export const currency = {
    code: "INR",
    symbol: "₹",
    format: (value) => `${currency.symbol}${Number(value).toFixed(2).toLocaleString('en-IN')}`
}


