const  WeatherButton  =( {cities, setCity  , getCurrentLocation})=>{


    return(
        <div>

            <button  onClick={ ()=>{ getCurrentLocation()}}> current position </button>
            {  cities.map( (item, index) =>(
                <button  key={index}  onClick={ ()=>{setCity(item)}}  >
                     {item}
                </button>
            )) }
        </div>
    );

};

export default  WeatherButton;