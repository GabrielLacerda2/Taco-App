import { Button, Checkbox, Form, Input, Dropdown, Label, Select,Icon } from 'semantic-ui-react'
import {useEffect, useState} from 'react';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
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
    const [medida,setMedida] = useState("");
    const [btnDownload,setBtnDownload] = useState(true);

    const handleQtd = (e) => {
        setQtd(e.target.value);
        setNutrientesCalc(
            {
            protein:(parseFloat(nutrientes.protein)/pesoTotal) * 0,
            carb:(parseFloat(nutrientes.carb)/pesoTotal) * 0,
            sodium:(parseFloat(nutrientes.sodium)/pesoTotal) * 0,
            energyKj:(parseFloat(nutrientes.energyKj)/pesoTotal) * 0,
            energyKcal:(parseFloat(nutrientes.energyKcal)/pesoTotal) * 0,
            fiber:(parseFloat(nutrientes.fiber)/pesoTotal) * 0,
            saturated:(parseFloat(nutrientes.saturated)/pesoTotal) * 0,
            trans:(parseFloat(nutrientes.trans)/pesoTotal) * 0
             });
             setBtnDownload(true);
        
    }
    const handleMedidaCaseira = (e) =>{
        setMedida(e.target.value)
        setNutrientesCalc(
            {
            protein:(parseFloat(nutrientes.protein)/pesoTotal) * 0,
            carb:(parseFloat(nutrientes.carb)/pesoTotal) * 0,
            sodium:(parseFloat(nutrientes.sodium)/pesoTotal) * 0,
            energyKj:(parseFloat(nutrientes.energyKj)/pesoTotal) * 0,
            energyKcal:(parseFloat(nutrientes.energyKcal)/pesoTotal) * 0,
            fiber:(parseFloat(nutrientes.fiber)/pesoTotal) * 0,
            saturated:(parseFloat(nutrientes.saturated)/pesoTotal) * 0,
            trans:(parseFloat(nutrientes.trans)/pesoTotal) * 0
             });
             setBtnDownload(true);
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
             setBtnDownload(false);
            }
            if(ingredientesReceita.length == 0){
              alert("Lista Vazia")
            }
            if(qtd <= 0){
                alert("Não se esqueça da Quantidade")
            }

        console.log(nutrientesCalc)
    }

    const handleDownload = () => {
        htmlToImage.toJpeg(document.getElementById('tbody-nutrientes'))
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'tabela-de-nutrientes.jpeg';
            link.href = dataUrl;
            link.click();
        });
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
            <Form.Field>
                <label>Medida Caseira</label>
                <input placeholder="Med. Caseira" onChange={handleMedidaCaseira} />
            </Form.Field>
            
            
            <Button color="black" onClick={calculaPorcao} >Gerar Tabela</Button>
            </Form>
    </div>
    <div className="content-table">
             
             <table className="table-all" border="1">
                 <div id="tbody-nutrientes">
      <tbody border="1">
          <tr>
             <td colSpan="3" className="tabela-header">
                 <h3>Informação Nutricional</h3>
                 <p>Porção {qtd}g ou ml ({medida})</p>
            </td>
          </tr>
       <tr>
           <td className="nutri-td"></td>
           <td className="tabela-header">Quantidade Porção</td>
           <td className="vd">%VD(*)</td>
       </tr>
      <tr>
            <td className="nutri-td" >
                <p>Valor Calórico</p>
            </td>
            <td >
                <div className="valor-energetico-td">
                    <p>{nutrientesCalc.energyKcal.toFixed(2)}kcal = {nutrientesCalc.energyKj.toFixed(2)}kj </p> 
                </div>
            </td>
            <td className="vd" >
        
            </td>
      </tr>
      <tr>
        <td className="nutri-td">
            <p>Carboidratos</p>
        </td>
        <td >
            <p>{nutrientesCalc.carb.toFixed(2)}g</p> 
        </td>
        <td className="vd" >
        
        </td>
      </tr>
      <tr>
        <td className="nutri-td">
            <p>Proteinas</p>
        </td>
        <td >
            <p>{nutrientesCalc.protein.toFixed(2)}g</p>
        </td>
        <td className="vd" >
        
        </td>
      </tr>
      <tr>
        <td className="nutri-td">
            <p>Gorduras Totais</p>
        </td>
        <td >
            <p>0</p>
        </td>
        <td className="vd" >
        
        </td>
      </tr>
      <tr>
      <td className="nutri-td">
     
              <p>Gorduras Saturadas</p>
       
      </td>
      <td >
    
              <p>{nutrientesCalc.saturated.toFixed(2)}g</p>
         
      </td>
      <td className="vd" >
        
            </td>
      </tr>
      <tr>
      <td className="nutri-td">
    
              <p>Gorduras Trans</p>
         
      </td>
      <td >
     
              <p>{nutrientesCalc.trans.toFixed(2)}g</p>
          
      </td>
      <td className="vd" >
        
            </td>
      </tr>
      <tr>
      <td className="nutri-td">
     
              <p>Fibra Alimentar</p>
         
      </td>
      <td >
    
              <p>{nutrientesCalc.fiber.toFixed(2)}g</p> 
         
      </td>
      <td className="vd" >
        
            </td>
      </tr>
      <tr>
      <td className="nutri-td">
     
              <p>Sódio</p>
         
      </td>
      <td >
    
              <p>{nutrientesCalc.sodium.toFixed(2)}mg</p> 
        
      </td>
      <td className="vd" >
        
            </td>
      </tr>
      </tbody>
      </div>
      </table>
      <Button disabled={btnDownload} color="black" onClick={handleDownload}  icon="download" label="Download"  labelPosition='left'></Button>
          </div>
          
        </div>
    );
}

export default GerarTabela;