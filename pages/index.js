import Header from '../components/Header';
import AddAlimento from '../components/AddAlimento';
import ListaNutrientes from '../components/ListaNutrientes';
import axios from 'axios';
import {useState,useEffect} from 'react';
import GerarTabela from '../components/GerarTabela';


export default function Home(object) {
  const nutristesObs = {
    protein:0,
    carb:0,
    sodium:0,
    energyKj:0,
    energyKcal:0,
    fiber:0,
    saturated:0,
    trans:0
  }

  const [ingredientesReceita, setIngredientesReceita] = useState([]);
  const [dados,setDados] = useState([]);
  const [gerou,setGerou] = useState(false);
  const [tabelaNutrientes,setTabelaNutrientes] = useState(nutristesObs)
  const [numIng,setNumIng] = useState(0);
  const [pesoTotal,setPesoTotal] = useState(0);

  useEffect(()=>{
    setNumIng(Object.keys(ingredientesReceita).length)
    const qtdtotal = ingredientesReceita.reduce((accumulator,element)=>{
      accumulator += parseFloat(element.qtd)?
      parseFloat(element.qtd):0;
      return accumulator;
    }, 0)
    setPesoTotal(qtdtotal);
    console.log(pesoTotal)
  },[ingredientesReceita])





  const [qtd,setQtd] = useState(0);
  const [nutrientesCalc,setNutrientesCalc] = useState(nutristesObs);
  
  const opunt = [
      { key: 'g', text: 'Grama', value: 'grama' },
      { key: 'kg', text: 'Quilograma', value: 'quilograma' },
  ]
  const opmed = [
      { key: 'g', text: 'Grama', value: 'grama' },
      { key: 'kg', text: 'Quilograma', value: 'quilograma' },
  ]
  const opglu = [
      { key: 'cg', text: 'Contem Glúten', value: 'contem' },
      { key: 'kg', text: 'Não Contem Glúten', value: 'quilograma' },
  ]

  const handlePorc = (e) => {
      setQtd(e.target.value)
  }



  const calculaPorcao = () => {
      console.log(ingredientesReceita.length)
      if(qtd > 0 && ingredientesReceita.length > 0){
      setNutrientesCalc(
          {
          protein:(parseFloat(tabelaNutrientes.protein)/pesoTotal) * qtd,
          carb:(parseFloat(tabelaNutrientes.carb)/pesoTotal) * qtd,
          sodium:(parseFloat(tabelaNutrientes.sodium)/pesoTotal) * qtd,
          energyKj:(parseFloat(tabelaNutrientes.energyKj)/pesoTotal) * qtd,
          energyKcal:(parseFloat(tabelaNutrientes.energyKcal)/pesoTotal) * qtd,
          fiber:(parseFloat(tabelaNutrientes.fiber)/pesoTotal) * qtd,
          saturated:(parseFloat(tabelaNutrientes.saturated)/pesoTotal) * qtd,
          trans:(parseFloat(tabelaNutrientes.trans)/pesoTotal) * qtd
           });
          }
          if(ingredientesReceita.length == 0){
            alert("Lista Vazia")
          }
          if(qtd <= 0){
              alert("Não se esqueça da Quantidade")
          }

      console.log(nutrientesCalc)
  }
  console.log(nutrientesCalc)
  return (
   <div>
     <Header />
     <div className="add-list">
     <AddAlimento 
      food={object.object} 
      ingredientesReceita={ingredientesReceita} 
      setIngredientesReceita={setIngredientesReceita} 
      dados={dados} 
      setDados={setDados} 
      gerou={gerou}
      setGerou={setGerou}
      tabelaNutrientes={tabelaNutrientes}
      setTabelaNutrientes={setTabelaNutrientes}
      numIng={numIng}
      pesoTotal={pesoTotal}
     />
     <ListaNutrientes 
     tabelaNutrientes={tabelaNutrientes}

     ingredientes={ingredientesReceita}

      protein={tabelaNutrientes.protein.toFixed(2)}

      energyKcal={tabelaNutrientes.energyKcal.toFixed(2)}

      energyKj={tabelaNutrientes.energyKj.toFixed(2)}

      carb={tabelaNutrientes.carb.toFixed(2)}

      sodium={tabelaNutrientes.sodium.toFixed(2)}

      fiber={tabelaNutrientes.fiber.toFixed(2)}

      saturated={tabelaNutrientes.saturated.toFixed(2)}
      
      trans={tabelaNutrientes.trans.toFixed(2)}
     />
     <GerarTabela 
     nutrientes={tabelaNutrientes}
     pesoTotal={pesoTotal}
     ingredientesReceita={ingredientesReceita}
     />

     </div>
   </div>
  )
}
Home.getInitialProps = async () => {
  const res = await axios.get('https://taco-food-api.herokuapp.com/api/v1/food');
  
  return {object:res.data}
}
