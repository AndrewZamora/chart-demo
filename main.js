
(async () => {
    async function getData() {
        const reponse = await fetch('test-data.csv');
        const data = await reponse.text();
        const parsedData = data.split('\n');
        const labels = parsedData[0].split(',');
        const formattedData = parsedData.slice(1).map(item => {
            const set = item.split(',');
            return {
                province_state: set[0],
                country_region: set[1],
                last_update: set[2],
                confirmed: set[3],
                deaths: set[4],
                recovered: set[5],
                latitude: set[6],
                longitude: set[7]
            }
        })
        return {
            data: formattedData
        }
    }
    const { data } = await getData();
    let countries = [];
    let confirmed = []
    data.forEach(item => {
        if (item.country_region && !countries.includes(item.country_region)) {
            countries.push(item.country_region);
        }
    });
    console.log(data)
    const ctx = document.getElementById('myChart').getContext('2d');

    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["0-19", "20-44", "45-54", "55-64", "65-74", "75-84", ">=85"],
            datasets: [{
                label: 'Hospitalization',
                data: [1.6, 14.3, 21.2, 20.5, 28.6, 30.5, 70.3],
                borderColor: 'black',
                backgroundColor: '#ff833a',
                borderWidth: 1
            },
            {
                label: 'ICU admission',
                data: [0, 4.2, 10.4, 11.2, 18.8, 31.0, 29.0],
                borderColor: 'black',
                backgroundColor: '#e65100',
                borderWidth: 1
            },
            {
                label: 'Case-fatality',
                data: [0, 0.2, 0.8, 2.6, 4.9, 10.5, 27.3],
                borderColor: 'black',
                backgroundColor: '#ac1900',
                borderWidth: 1
            },
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },

    });
})()



