export default function calculaNutrientes (dados,ingredientesReceita){
    console.log("Gerar Tabela",dados)
    

    const totalNutrientes = dados.reduce((accumulator, selected,index) => {
    
       accumulator.fiber += (selected.attributes.hasOwnProperty("fiber")) ? 
       (selected.attributes.fiber.qty == "NA" || selected.attributes.fiber.qty == "-" || selected.attributes.fiber.qty =="Tr") ?  
       0:selected.attributes.fiber.qty * (ingredientesReceita[index].qtd/100):0;

        accumulator.protein += (selected.attributes.hasOwnProperty("protein")) ? 
       (selected.attributes.protein.qty == "NA" || selected.attributes.protein.qty == "-" || selected.attributes.protein.qty =="Tr") ?  
       0:selected.attributes.protein.qty * (ingredientesReceita[index].qtd/100):0;

       accumulator.carb += (selected.attributes.hasOwnProperty("carbohydrate")) ? 
       (selected.attributes.carbohydrate.qty == "NA" || selected.attributes.carbohydrate.qty == "-" || selected.attributes.carbohydrate.qty =="Tr") ?  
       0:selected.attributes.carbohydrate.qty * (ingredientesReceita[index].qtd/100):0;

       accumulator.energyKcal += (selected.attributes.hasOwnProperty("energy")) ? 
       (selected.attributes.energy.kcal == "NA" || selected.attributes.energy.kcal == "-" || selected.attributes.energy.kcal =="Tr") ?  
       0:selected.attributes.energy.kcal * (ingredientesReceita[index].qtd/100):0;
      

       accumulator.energyKj += (selected.attributes.hasOwnProperty("energy")) ? 
       (selected.attributes.energy.kj == "NA" || selected.attributes.energy.kj == "-" || selected.attributes.energy.kj =="Tr") ?  
       0:selected.attributes.energy.kj * (ingredientesReceita[index].qtd/100):0;

       accumulator.sodium += (selected.attributes.hasOwnProperty("sodium")) ? 
       (selected.attributes.sodium.qty == "NA" || selected.attributes.sodium.qty == "-" || selected.attributes.sodium.qty =="Tr") ?  
       0:selected.attributes.sodium.qty * (ingredientesReceita[index].qtd/100):0;

       if(selected.attributes.hasOwnProperty("fatty_acids")){
       accumulator.saturated += (selected.attributes.fatty_acids.saturated) ? 
       (selected.attributes.fatty_acids.saturated.qty == "NA" || selected.attributes.fatty_acids.saturated.qty == "-" || selected.attributes.fatty_acids.saturated.qty =="Tr") ?  
       0:selected.attributes.fatty_acids.saturated.qty * (ingredientesReceita[index].qtd/100):0;

       accumulator.trans += (selected.attributes.fatty_acids["18:1t"] && selected.attributes.fatty_acids["18:2t"] ) ?  
       (selected.attributes.fatty_acids["18:1t"].qty * (ingredientesReceita[index].qtd/100)) + (selected.attributes.fatty_acids["18:2t"].qty * (ingredientesReceita[index].qtd/100)):0;
       }else{
        accumulator.saturated += 0;
        accumulator.trans += 0
       }
       console.log(accumulator)
 return accumulator;
}, {
       fiber:0,
       protein:0,
       carb:0,
       energyKcal:0,
       energyKj:0,
       sodium:0,
       saturated:0,
       trans:0
   });

   return totalNutrientes;

  }