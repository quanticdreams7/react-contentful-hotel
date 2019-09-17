import React from 'react'



export default function Title({title}) {
    return (
        <div className="section-title">
            <h4>{title}</h4>
            
        </div>
    )
}
// kan ook -->
// export default function Title(props) {
//     return (
//         <div className="section-title">
//             <h4>{props.title}</h4>
            
//         </div>
//     )
// }
