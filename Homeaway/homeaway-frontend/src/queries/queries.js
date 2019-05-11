import { gql } from 'apollo-boost';

const getPropertiesOwnerQuery = gql`
query getOwnerProperties($id:String)
    {
        properties(owner_id:$id){
        name
        type
        description
        price
        from_date
        to_date
        bed
        bath
  }
}
`;

const getUserBookings =gql`
query getBookings($user_id: String)
    {
        bookings(user_id:$user_id)
        {
        property{
        name
        type
        description
        price
        from_date
        to_date
        bed
        bath
        }
  }
}
`;

const getUserProfile = gql`
    query getusers($id:ID)
    {
        users(id:$id)
        {
        firstname
        lastname 
        aboutme
        address
        address2
        country
        state
        zip
        company
        gender
        school
        hometown
        languages
        }
        
}
`;

const singleProperty = gql`
query singleProperty($id:ID)
{
singleProperty(id:$id)
{
id
owner_id
name 
type 
description 
place 
capacity 
bed 
bath
price
from_date
to_date 
}
}
`

const searchAllQuery = gql`
    {
      searchAll
      {
      id
        name
        type
        description
        place
        capacity
        bed
        bath
        price
        from_date
        to_date
        capacity
        min_stay
  }
}
`;



const searchQuery = gql`
query searchQuery($place: String,$from_date:String,$to_date:String,$capacity:String)
    {
      search(place:$place,from_date:$from_date,to_date:$to_date,capacity:$capacity)
      {
        id
        name
        type
        description
        price
        from_date
        to_date
  }
}
`;

export { getUserBookings,getPropertiesOwnerQuery, searchAllQuery ,getUserProfile,singleProperty,searchQuery};