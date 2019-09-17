import React, { Component } from 'react'
// import items from './data';
import Client from './Contentful';



const RoomContext = React.createContext();
// now access to provider and consumer components
// - provider allows all components in the component tree to access the RoomContext
// - consumer access that information

class RoomProvider extends Component {
    state={
        // greeting: 'hello',
        // name: 'john'
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,

        // for RoomsFilter component
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    };

    //jaap
    // getData
    getData = async () => {
        try {
            let response = await Client.getEntries({
                content_type: 'reactBeachResortRoom',
                order: "fields.price"
            });
            let rooms = this.formatData(response.items);
            // debugger
            // console.log(rooms);
            let featuredRooms = rooms.filter(room => room.featured === true);

            // for roomsFilter component
            let maxPrice = Math.max(...rooms.map(item => item.price));
            let maxSize = Math.max(...rooms.map(item => item.size)); 
    
            this.setState({
                rooms, 
                featuredRooms, 
                sortedRooms: rooms, 
                loading: false,
                price: maxPrice,
                maxPrice,
                maxSize
            })
                
            } catch (error) {
                console.log(error)
            }
    }

    // when components mount -> update info 
    componentDidMount() {
        this.getData()
    }
    formatData(items) {
        let tempItems = items.map(item => {
            
            let id = item.sys.id 
            let images = item.fields.images.map(image => image.fields.file.url);
            let room = {...item.fields, images: images, id}
            return room;
        })
        return tempItems;
    } 


    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];

        // find returns first match and returns object 
        const room = tempRooms.find((room) => room.slug === slug)
        return room;
    }

    handleChange = (e) => {
        const target = e.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = e.target.name;
        // console.log(`this is type ${type}, this is name ${name}, this is value ${value}`);

        this.setState({
            [name] : value
        }, this.filterRooms)
    };

    // get here the info from the state 
    filterRooms = () => {
        let {
            rooms, type, capacity, price, minSize, maxSize, breakfast, pets 
        } = this.state;

        let tempRooms = [...rooms]; // all the rooms
        capacity = parseInt(capacity); // transform value capacity from string to number
        price = parseInt(price); // transform price from string to number

        // filter by type
        if( type !== 'all') {
            // return only the rooms that match the current type
            tempRooms = tempRooms.filter(room => room.type === type);
        };
        // filter by capacity
        if(capacity !== 1) {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity)
        }

        // fitler by price
        tempRooms = tempRooms.filter(room => room.price <= price)

        // filter by size
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)
      
        // filter by breakfast
        if(breakfast) {
            tempRooms = tempRooms.filter(room => room.breakfast === true);
        }
        // filter by pets
        if(pets) {
            tempRooms = tempRooms.filter(room => room.pets === true);
        }
        this.setState({
            sortedRooms: tempRooms,
        })
    

    }

    render() {
 
        return (
            <RoomContext.Provider 
                value={{
                    ...this.state,
                    getRoom: this.getRoom,
                    handleChange: this.handleChange
                    }}
            >
            {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export {RoomProvider, RoomConsumer, RoomContext}


// optie 3 HOC
// this function returns another function, hence the name, where you return another component
export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return <RoomConsumer>
            {value => <Component {...props} context={value}/>}
        </RoomConsumer>
    }
}