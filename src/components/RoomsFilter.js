import React from 'react';

// optie 4 context api met hooks (functional components)
import {useContext} from 'react';

// use this when you dont use HOC or render props because you use the
// roomConsumer. This is a whole context -> the whole object is imported
import {RoomContext} from '../context';
import Title from '../components/Title';

// get all unique values of type -> items = rooms array
// unique values -> type and nr of guests
// Set only accepts unique values
const getUnique = (items, value) => {
  
    // return [...new Set(items.map(item => {
    //     console.log(item.value);
    //     debugger
    //     return item.value
    // }))]
    // boven niet goed 
    // -> als je het zo doet (onder) krijg je de key van de value (= 'type') -> = single, double etc
    // return [...new Set(items.map(item => {
    //     console.log(item[value]);
    //     debugger
    //     return item[value]
    // }))]
    
    // korte versie om unique value te krijgen op key 
    return [...new Set(items.map(item => item[value]))]
    
}

export default function RoomsFilter({rooms}) {
    const context = useContext(RoomContext);
    console.log(context)
    console.log(typeof(context) === 'object');

    const {
        handleChange,
        type,
        capacity,
        price,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets
    } = context;

    // get unique types
    let types = getUnique(rooms, 'type');
    // then add all
    types = ['all', ...types];
    // then map to jsx
    types = types.map((item, index) => {
        return <option key={index} value={item}>{item}</option>
    })
    // console.log('types', types)

    // get unique guests
    let people = getUnique(rooms, 'capacity');
    people = people.map((item, index) => {
        return <option key={index} value={item}>{item}</option>
    })

  

    return (
        <section className="filter-container">
            <Title title="search rooms"/>
            <form action="" className="filter-form">
                {/* select type */}
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select 
                        className="form-control" 
                        name="type" 
                        id="type" 
                        value={type}
                        onChange={handleChange}
                    >{types}</select>
                </div>
                {/* end select type */}
                {/* guests select type */}
                <div className="form-group">
                    <label htmlFor="capacity">Guests</label>
                    <select 
                        className="form-control" 
                        name="capacity" 
                        id="capacity" 
                        value={capacity}
                        onChange={handleChange}
                    >{people}</select>
                </div>
                {/* end guests */}
                {/* room price */}
                <div className="form-group">
                    <label htmlFor="price">roomprice ${price}</label>
                    <input className="form-control" type="range" name="price" min={minPrice} max={maxPrice} id="price" value={price} onChange={handleChange}/>
                </div>
                {/* end room price */}
                {/* size */}
                <div className="form-group">
                    <label htmlFor="size">room size</label>
                    <div className="size-inputs">
                        <input className="size-input" type="number" name="minSize" id="size" value={minSize} onChange={handleChange}/>
                        <input className="size-input" type="number" name="maxSize" id="size" value={maxSize} onChange={handleChange}/>
                    </div>
                </div>
                {/* end of size */}
                {/* extras */}
                <div className="form-group">
                    <div className="single-extra">
                        <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handleChange}/>
                        <label htmlFor="breakfast">Breakfast</label>
                    </div>
                    <div className="single-extra">
                        <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange}/>
                        <label htmlFor="pets">Pets</label>
                    </div>
                </div>
                {/* end of extras */}
            </form>
        </section>
    )
}
