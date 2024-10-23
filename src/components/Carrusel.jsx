import React from "react";
import empleo1 from '../page/img/empleo3.webp' 
import empleo2 from '../page/img/empleofeliz1.jpg'
import empleo3 from '../page/img/felicidad-en-el-trabajo2.jpg'  


const Carrusel = () => {
    return (
        <div
            id="carouselExampleAutoplaying"
            className="carousel slide m-0"
            data-bs-ride="carousel"
        >
            <div className="carousel-inner m-0 p-0">
                <div className="carousel-item active">
                    <img src={empleo1} className="img-carrusel d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={empleo2} className="img-carrusel d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={empleo3} className="img-carrusel d-block w-100" alt="..." />
                </div>
            </div>
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
            </button>
        </div>

    )
}

export default Carrusel;