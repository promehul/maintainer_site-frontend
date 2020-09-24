// import React from 'react'
// import { Card, Header, Icon, Segment, List, Reveal } from 'semantic-ui-react'

// import styles from '../../css/team/hobbies-card.css'

// const HobbiesCard = ({ coverIcon, array, message }) => {
//   return (
//     <Card raised>
//       <Reveal animated="move up" stylename="styles.reveal-height">
//         <Reveal.Content visible styleName="styles.reveal">
//           <Segment basic padded styleName="styles.visible">
//             <Icon name={coverIcon} size="huge" />
//           </Segment>
//         </Reveal.Content>
//         <Reveal.Content hidden>
//           <Segment basic padded>
//             <Header as="h2">{message}</Header>
//             <List>
//               {array.map((info, index) => {
//                 return (
//                   <List.Item key={index}>
//                     <List.Icon name={coverIcon} />
//                     <List.Content>{info}</List.Content>
//                   </List.Item>
//                 )
//               })}
//             </List>
//           </Segment>
//         </Reveal.Content>
//       </Reveal>
//     </Card>
//   )
// }
// export default HobbiesCard
