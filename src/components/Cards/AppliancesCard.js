import React from 'react'

const AppliancesCard = ({src,price,percent,title}) => {
    return (
        <div className="col-xs-12 col-sm-6 col-md-4 mb-5">
            <div className="card rounded-lg p-0">
                <div className="card-body text-center">
                    <img className="img-fluid rounded-lg" src={src} alt=""/>
                    <h4 className="card-title mt-2"><span>&#8358;</span>{price}</h4>
                    <button type="button" className="btn btn-danger rounded-lg btn-sm m-0">{percent}</button>
                </div>
                <div className="card-header bg-success text-light font-weight-bolder text-center">{title}</div>
            </div>
        </div>
    )
}

export default AppliancesCard
