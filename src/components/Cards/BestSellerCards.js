import React from 'react'

function BestSellerCards({src,name,price,amountOff,percent,rating,sold}) {
    return (
        <div className="col-xs-12 col-sm-6 col-md-4 mb-5 ">
        <div className="card rounded-lg p-0 img_blocks">
        <div className="card-body text-center">
            <img className="img-fluid rounded-lg img_blocks" src={src} alt="brick_walls"/>
            <h6 className="text-left">Product Name goes here</h6>
            <h4 className="card-title mt-2 text-left"><span>&#8358;</span>{price}</h4>
            <div className="d-flex flex-row justify-content-start">
            <h6 className="card-title text-muted text-left offAmount"><span>&#8358;</span>{amountOff}</h6>
            <h6 className="pt-0 pl-3 Offpercent">{percent} %Off</h6>
            </div>
        
        </div>
        <div className="d-flex bd-highlight mb-3">
      <div className="p-2 bd-highlight"><span style ={{color:'green'}}>&#9733;</span>
        </div>
          <div className="p-2 bd-highlight">{rating}</div>
          <div className="ml-auto p-2 bd-highlight">{sold} Sold</div>
        </div>
                                  
      </div>
        </div>
    )
}

export default BestSellerCards
