import React from 'react'
import happy from "../../assets/iconshappy.png";
import man from "../../assets/man.svg"
// import happy2 from "../../assets/happy2.png";

const CommentCard = () => {
    return (
        <div className="row text-center icons ">
            <div className="col-12 comments py-5">
                <div className="card bg-light py-3 px-5">
                    <div className="d-flex bd-highlight mb-3">
                        <div className="p-2 bd-highlight">
                            <img src={man} alt="man" className="man" />
                        </div>
                        <div className="p-2 bd-highlight ">
                            <p>Olajide Ajibade</p>
                            <p className=" text-muted commentdate">23rd Aug,2018</p>

                        </div>

                        <div className="ml-auto p-2 bd-highlight">
                            <span className="starComment">&#9733;</span>
                            <span className="starComment">&#9733;</span>
                            <span className="starComment">&#9733;</span>
                            <span className="starComment">&#9733;</span>
                            <span className="starComment">&#9733;</span>
                        </div>
                        <div className=" p-2 bd-highlight">
                            <img src={happy} alt="happy" className="happy" />
                        </div>
                    </div>
                    <p className="text-left pt-1 mt-1">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                </div>
            </div>
            </div>
           
            
    )

}

export default CommentCard
