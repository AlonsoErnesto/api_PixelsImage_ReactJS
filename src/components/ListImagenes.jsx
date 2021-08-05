import React from 'react';
import Imagen from './Imagen';

const ListImagenes = ({images}) => {
    return ( 
        <div className="col-12 p-5 row">
            {images.map(imagen => (
                <Imagen imagen={imagen} key={imagen.id}/>
            ))}
        </div>
     );
}
 
export default ListImagenes;