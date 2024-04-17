import './Preview3DModelCard.css'

export function Preview3DModelCard({ direction=''}: {direction?:'horizontal'|'vertical'|''}) {


    return (
        <div className={"preview-3d-model-card "+direction}>
            <div className={"image "+direction} style={{ backgroundImage: `url(${'/src/res/ert.avif'})` }}></div>
            <div className="text-side">
                <div className="top">PREVIEW 3D MODEL</div>
                <div className="features">{3} FEATURE{3 > 1 ? 'S' : ''}</div>
                <div className="prompt">{'Loader File is missing'}</div>
            </div>
        </div>
    )
}