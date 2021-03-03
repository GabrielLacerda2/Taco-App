import { Button, Checkbox, Form, Input, Dropdown, Label, Select } from 'semantic-ui-react'
import {useEffect, useState} from 'react';
function GerarTabela({nutrientes,pesoTotal,ingredientesReceita}) {
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

      const opglu = [
        { key: 'cg', text: 'Contem Glúten', value: 'contem' },
        { key: 'kg', text: 'Não Contem Glúten', value: 'quilograma' },
      ]
    const [nutrientesCalc,setNutrientesCalc] = useState(nutristesObs);
    const [qtd,setQtd] = useState(0);

    const handleQtd = (e) => {
        setQtd(e.target.value);
    }
    const calculaPorcao = () => {
        console.log(ingredientesReceita.length)
        if(qtd > 0 && ingredientesReceita.length > 0){
        setNutrientesCalc(
            {
            protein:(parseFloat(nutrientes.protein)/pesoTotal) * qtd,
            carb:(parseFloat(nutrientes.carb)/pesoTotal) * qtd,
            sodium:(parseFloat(nutrientes.sodium)/pesoTotal) * qtd,
            energyKj:(parseFloat(nutrientes.energyKj)/pesoTotal) * qtd,
            energyKcal:(parseFloat(nutrientes.energyKcal)/pesoTotal) * qtd,
            fiber:(parseFloat(nutrientes.fiber)/pesoTotal) * qtd,
            saturated:(parseFloat(nutrientes.saturated)/pesoTotal) * qtd,
            trans:(parseFloat(nutrientes.trans)/pesoTotal) * qtd
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
    
    return(
        <div className="gerar-tabela">
        <div>
            <Form className="form-dados-tabela">
              
            <Form.Field>
                <label>Quant da Porção</label>
                <input placeholder="Quant." onChange={handleQtd} />
            </Form.Field>
            <Form.Select 
                    label="Glúten"
                    options={opglu}
                />
            
            
            <Button color="black" onClick={calculaPorcao} >Gerar Tabela</Button>
            </Form>
    </div>
    <div className="content-table">
             
             <table className="table-all" border="1">
      <tbody>
      <tr >
      <td>
          <div className="valor-energetico-td">
              <p>Valor Energetico</p>
              <p>{nutrientesCalc.energyKcal.toFixed(2)} kcal  = {nutrientesCalc.energyKj.toFixed(2)} kj</p> 
              <p>{0}</p>
          </div>
      </td>
      <td >
      <div className="valor-energetico-td">
              <p>Gorduras Saturadas</p>
              <p>{nutrientesCalc.saturated.toFixed(2)}g</p> 
              <p>{0}</p>
          </div>
      </td>
      </tr>
      <tr >
      <td >
      <div className="valor-energetico-td">
              <p>Carboidratos</p>
              <p>{nutrientesCalc.carb.toFixed(2)}g</p> 
              <p>{0}</p>
          </div>
      </td>
      <td >
      <div className="valor-energetico-td">
              <p>Gorduras Trans</p>
              <p>{nutrientesCalc.trans.toFixed(2)}g</p> 
              <p>{0}</p>
          </div>
      </td>
      </tr>
      <tr>
      <td >
      <div className="valor-energetico-td">
              <p>Proteinas</p>
              <p>{nutrientesCalc.protein.toFixed(2)}g</p> 
              <p>{0}</p>
          </div>
      </td>
      <td >
      <div className="valor-energetico-td">
              <p>Fibra Alimentar</p>
              <p>{nutrientesCalc.fiber.toFixed(2)}g</p> 
              <p>{0}</p>
          </div>
      </td>
      </tr>
      <tr>
      <td >
      <div className="valor-energetico-td">
              <p>Gorduras Totais</p>
              <p>{}</p> 
              <p>{0}</p>
          </div>
      </td>
      <td >
      <div className="valor-energetico-td">
              <p>Sódio</p>
              <p>{nutrientesCalc.sodium.toFixed(2)}mg</p> 
              <p>{0}</p>
          </div>
      </td>
      </tr>
      </tbody>
      </table>
          </div>
        </div>
    );
}

export default GerarTabela;