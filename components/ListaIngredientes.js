import { useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input, Dropdown, Label,Icon } from 'semantic-ui-react'
import calculaNutrientes from '../controllers/calculaNutrientes';
import Popup from 'reactjs-popup';

function ListaIngredientes (props) {
    console.log("Ing", props.dados)
    console.log(props.ingredientes)
    
     const handleDelete = (e) => {
        console.log(e.target.parentNode.value)
        props.dados.splice(e.target.parentNode.value,1)
        props.ingredientes.splice(e.target.parentNode.value,1)
        props.setTabelaNutrientes(calculaNutrientes(props.dados,props.ingredientes));
        props.setNumIng(Object.keys(props.ingredientes).length)
        const qtdtotal = props.ingredientes.reduce((accumulator,element)=>{
            accumulator += parseFloat(element.qtd)?
            parseFloat(element.qtd):0;
            return accumulator;
          }, 0)
          props.setPesoTotal(qtdtotal);
     }
     
     return(
         
        
        <div>
             
        <Popup trigger={<button className="trigger-ing">Lista de Ingredientes</button>} position="center" modal>
        <div className="modal">
        <h1>Lista de Ingredientes</h1>
           <ul className="list-ing">
           {props.ingredientes.map((element,index) => (
               <div>
                   <li value={index} className="li-ingrediente" key={index}>{element.qtd} - {element.ingrediente} 
                   
                       <Icon onClick={handleDelete} link circular inverted color='red' name='trash alternate'/> 
                   </li>
                   
               </div>
           ))}
           </ul>
    </div>
    </Popup> 
    </div>
     
     );
 }

export default ListaIngredientes;