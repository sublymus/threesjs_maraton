import './StatisticCard.css'


export function StatisticCard({}:{}) {
    

    return (
        <div className="statistic-card">
                        <div className="text">
                            <h1 className="title">Product Statistic</h1>
                            <div>
                                <h1 className="title">{Number(20000).toLocaleString()}  ₽ </h1>
                                <h2 className="description">since {(new Date(Date.now() - (1000 * 60 * 60 * 24 * 30)).toDateString())}</h2>
                            </div>
                        </div>
                        <BarChart/>
                    </div>
    )
}

const bars = {
    with: 250,
    height: 120,
    bars: [
        { value: 80 },
        { value: 15 },
        { value: 25 },
        { value: 10 },
        { value: 15 },
        { value: 25 },
        { value: 15 },
        { value: 25 },
        { value: 90 },
        { value: 25 },
        { value: 30 },
        { value: 25 },
        { value: 30 },
        { value: 50 },
        { value: 100 },
        { value: 90 },
        { value: 80 },
        { value: 70 },
        { value: 60 },
        { value: 60 },
        { value: 70 },
        { value: 80 },
    ]
}
function BarChart() {


    return (
        <div className="bar-chart">
            <div className="bars">
                {bars.bars.map((b, i) => (
                    <div key={i} className="bar">
                        <div className="level" style={{ height: `${(b.value / 100) * bars.height}px`, background: `linear-gradient(rgb(0, 90, 180),rgb(23, 108, 194)${((b.value < 35 ? 35 : b.value) - 25) * 0.7}% , rgb(75, 165, 255)100%)` }}></div>
                    </div>
                ))}
            </div>
        </div>
    )
}