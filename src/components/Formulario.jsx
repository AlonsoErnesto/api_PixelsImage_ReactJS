import React,{useState} from 'react';
import Error from './Error';


const Formulario = ({setBusqueda}) => {

    const [termino, setTermino] = useState('');
    const [error, setError] = useState(false);

    const buscarImagenes = e => {
        e.preventDefault();

        //validar
        if(!termino)
        {
            setError(true);
            return;
        }

        setError(false);
        //enviar
        setBusqueda(termino)




    }

    return ( 
        <form onSubmit={buscarImagenes}>
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text" 
                        className="form-control form-control-lg"
                        placeholder="Buscar una imagen"
                        onChange={e => setTermino(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input 
                        type="submit" 
                        className="btn btn-lg btn-danger btn-block"
                        placeholder="Buscar"
                    />
                </div>
            </div>
            {error ? <Error mensaje="Agregar un termino de busqueda correcta"/> : null}
        </form>
     );
}
 
export default Formulario;