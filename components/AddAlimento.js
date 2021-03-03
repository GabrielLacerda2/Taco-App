import { Button, Form, Input, Dropdown } from 'semantic-ui-react'
import ListaIngredientes from '../components/ListaIngredientes';
import calculaNutrientes from '../controllers/calculaNutrientes'
import {useEffect, useState} from 'react';

export default function AddAlimento(props) {
    const [qtd,setQtd] = useState(0);
  const [ingrediente, setIngrediente] = useState("");
  const [errors,setErrors] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(()=>{
    if(isSubmit){
      if(Object.keys(errors).length === 0){
        AdicionarAlimento();
        setIsSubmit(false);
      }else{
        setIsSubmit(false);
      }
    }
  })
  
  const Validate = () => {
    let errs = {};
    if(!qtd){
      errs.qtd = "Quatidade is required"
    }
    if(!ingrediente){
      errs.ingrediente = "Alimento is required"
    }
    
    return errs;
  }
  const handleQtd = (e) => {
    setQtd(e.target.value);
  }

  const handleIngrediente = (e) => {
    setIngrediente(e.target.value);
  }

  const handleAdicionar = () => {
    let errs = Validate();
    setErrors(errs);
    setIsSubmit(true);
  }

  const AdicionarAlimento = ()=>{
    props.setIngredientesReceita([...props.ingredientesReceita,{ingrediente:ingrediente,qtd:qtd}]);
    props.food.map(element =>{
        if(element.description == ingrediente){
            props.setDados([...props.dados,element])
            
        }else{
            return;
        }
        
    })
    console.log(props.dados,props.ingredientesReceita)
    props.setTabelaNutrientes(calculaNutrientes(props.dados,props.ingredientesReceita));
  }
  console.log(props.ingredientesReceita,"ingReceita")
  console.log(props.dados,"dados")

  useEffect(()=>{
    props.setTabelaNutrientes(calculaNutrientes(props.dados,props.ingredientesReceita));
  },[props.dados,props.ingredientesReceita])
  

  return (
    <div className="receita-all">
 
      <div className="content-receita">
      <div className="form-info-receita">
        <div>
            <p>Peso Bruto: {props.pesoTotal}</p>
            <p>Ingredientes: {props.numIng} </p>

        </div>
      <Form className="form"> 
      <div className="form-input">
      <Input className="qtd" onChange={handleQtd} placeholder="Quant." label="qtd" labelPosition='right' label="g/ml" error={errors.qtd ? { content:
            "Por favor insira uma Quantidade", pointing:"left"}:null}/>
      <Input className="ing" list='Ingredientes' placeholder='Alimeto' onChange={handleIngrediente} error={errors.ingrediente ? { content:
            "Por favor insira um ingrediente"}:null} />
      <datalist id='Ingredientes'>
          {props.food.map((element) =>(
              <option value={element.description}></option>
          ))}

      </datalist> 
      <Button type='submit' onClick={handleAdicionar} color='black'>Adicionar</Button>
      <ListaIngredientes
        gerou={props.gerou} 
        setGerou={props.setGerou} 
        ingredientes={props.ingredientesReceita} 
        dados={props.dados}
        tabelaNutrientes={props.tabelaNutrientes}
        setTabelaNutrientes={props.setTabelaNutrientes}
        numIng={props.numIng}
        setNumIng={props.setNumIng}
        setPesoTotal={props.setPesoTotal}
       />
      </div>
      
    </Form>
    </div>

    </div> 
    </div>
  
  )
}