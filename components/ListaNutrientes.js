function ListaNutrientes({ingredientes,tabelaNutrientes,qtd,fiber,protein,carb,energyKcal,energyKj,sodium,saturated,trans}){
   
    return(
        <div className="content-info">
    <ul>
    <li className="li-nutriente1"><h4>Valor Energetico</h4> <p>{energyKcal} kcal  = {energyKj} kj</p></li>
        <li className="li-nutriente0"><h4>Carboidratos</h4><p>{carb}g</p> </li>
        <li className="li-nutriente1"><h4>Proteinas</h4><p>{protein}g</p> </li>
        <li className="li-nutriente0"><h4>Fibra Alimentar</h4><p>{fiber}g</p> </li>
        <li className="li-nutriente1"><h4>Sódio</h4><p>{sodium}mg</p> </li>
        <li className="li-nutriente0"><h4>Gorduras Saturadas</h4><p>{saturated}g</p> </li>
        <li className="li-nutriente1"><h4>Gorduras Trans</h4><p>{trans}g</p> </li>
        <li className="li-nutriente0"><h4>Gorduras Totais</h4><p>{}g</p> </li>
        
    </ul>
        </div>
    )
}

export default ListaNutrientes;