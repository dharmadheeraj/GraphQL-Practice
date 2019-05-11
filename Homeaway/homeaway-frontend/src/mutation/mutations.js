
import { gql } from 'apollo-boost';

// const addBookMutation = gql`
//     mutation AddBook($name: String, $genre: String, $authorId: ID){
//         addBook(name: $name, genre: $genre, authorId: $authorId){
//             name
//             id
//         }
//     }
// `;

const bookProperty = gql`
mutation bookProperty($property_id:ID,$user_id:ID,$owner_id:ID,$from_date:String,$to_date:String)
{
bookProperty(property_id:$property_id,user_id:$user_id,owner_id:$owner_id,from_date:$from_date,to_date:$to_date)
{
id
}
}
`

const updateProfile = gql`
mutation updateProfile(
                    $id : ID,
                    $firstname : String,
                    $lastname : String
                    $aboutme: String,
                    $address: String,
                    $address2: String,
                    )
{
updateProfile(id:$id,firstname: $firstname, lastname: $lastname, aboutme: $aboutme, address: $address, address2: $address2)
{
id
firstname
lastname
aboutme
address
address2
}
}
`

export {bookProperty,updateProfile};