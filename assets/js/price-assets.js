fetch('proxy.php?action=metal-prices')
    .then(
        response => {
            if(response.ok) {
                return response.json()
            }
        }
    )
    .then(
        prices => {
            const keys = Object.keys(prices);

            for(const key of keys) {
                const holder = document.querySelector(`[data-price-for="${key}"]`);

                if(holder) {
                    holder.innerText = formatNumber(prices[key]['data']['active_price'], 2);
                }
            }
        }
    )