import React from 'react'
import RoomsFilter from './RoomsFilter';
import RoomsList from './RoomsList';
import {withRoomConsumer} from '../context';
import Loading from './Loading';

function RoomContainer({context}) {
    const {loading, sortedRooms, rooms} = context;
    return (loading
        ? <Loading/>
        : <div>
            <RoomsFilter rooms={rooms}/>
            <RoomsList rooms={sortedRooms}/>
        </div>)
}
export default withRoomConsumer(RoomContainer);

// Optie 2: Context api met function constructor import React from 'react'
// import RoomsFilter from './RoomsFilter'; import RoomsList from './RoomsList';
// // when using functional components with hooks use roomsconsumer you need to
// use // the consumer to acces the context import {RoomConsumer} from
// '../context'; import Loading from './Loading'; export default function
// RoomsContainer() {     return (         <RoomConsumer>             {(value)
// => {                 // dont do lines below in return statement
//   const {loading, sortedRooms, rooms} = value;
// console.log('value from roomconsumer', value)                 // when we
// getting data from external api, we need to make sure that the data is there.
//                // eslint-disable-next-line no-unused-expressions
//    return (                     loading                     ? <Loading/>
//                :   <div>                             hello froms rooms
// container                             <RoomsFilter rooms={rooms}/>
//                  <RoomsList rooms={sortedRooms}/>
// </div>                 )             } }         </RoomConsumer>     ) }