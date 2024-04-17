import './ActionsCard.css';

export function ActionsCard({ }: {}) {


    return (
        <div className="actions-card">
            <div className="text">
                <h1 className="title">All Colaborator Action</h1>
                <h2 className="description">See all colaborators actions executed on this product like update and collaborator source </h2>
            </div>
            <CircularLineChart />
        </div>
    )
}

function CircularLineChart() {
    return (
        <div className="circular-line-chart">
            <div className="back"></div>
            <div className="btn"> ACTIONS </div>
        </div>
    )
}