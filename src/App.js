import React,{useState,useEffect} from'react';
import Formulario from './components/Formulario';
import ListImagenes from './components/ListImagenes';



function App() {

  const [busqueda, setBusqueda] = useState('');
  const [images, setImages] = useState([])

  //conteo de paginas
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);


  useEffect(() => {
    
    const consultarAPI = async () => {

      if(!busqueda) return ;
      
      const imagenesPorPagina = 30;
      const key = '11109714-7d5ac589edae1273041e8dd1d';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`

      const imagen = await fetch(url);
      const respuesta = await imagen.json();
      setImages(respuesta.hits)

      //cacular el tota de paginas
      const calcularTotalPaginas = Math.ceil(respuesta.totalHits / imagenesPorPagina);
      setTotalPaginas(calcularTotalPaginas);
      
      //mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior:'smooth'})
   
    }
    consultarAPI();

  }, [busqueda,paginaActual])

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1 ;
    if(nuevaPaginaActual === 0) return ;
    setPaginaActual(nuevaPaginaActual);


  }

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1 ;
    if(nuevaPaginaActual > totalPaginas) return ;
    setPaginaActual(nuevaPaginaActual);
  }


  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">
          Buscador de Imagenes
        </p>
        <Formulario setBusqueda={setBusqueda}/>
      </div>
        <div className="row justify-content-center">
            <ListImagenes images={images}/>

           {(paginaActual === 1) 
           ? null 
           :  <button
              type="button"
              className="btn btn-info mr-1 mb-2"
              onClick={paginaAnterior}
            >
              &laquo; Anterior 
            </button>
            }

            {(paginaActual === totalPaginas ) 
            ? null
            : <button
              type="button"
              className="btn btn-info mr-1 mb-2"
              onClick={paginaSiguiente}
            >
              Siguiente &raquo;
            </button>
            }


        </div>
    </div>
  );
}

export default App;
