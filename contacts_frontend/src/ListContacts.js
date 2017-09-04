import React, { Component} from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

// function ListContacts(props){
//   return(
//     <ol className= 'contact-list' >
//       {this.props.contacts.map((contact) =>(
//         <li key ={contact.id} className='contact-list-item'>
//           <div className= 'contact-avatar' style={{
//             backgroundImage: `url(${contact.avatarURL})`
//           }}/>
//           <div className='contact-details'>
//             <p>{contact.name}</p>
//             <p>{contact.email}</p>
//           </div>
//           <button className= 'contact-remove'>
//             Remove
//           </button>
//
//         </li>
//       ))}
//     </ol>
//   )
// }




class ListContacts extends Component{
  static propTypes ={
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

state = {
  query: ''
}

updateQuery = (query1) =>{
  this.setState({ query: query1.trim() })
}

clearQuery= () =>{
  this.setState({ query: ''})
}

  render(){
    const {contacts, onDeleteContact} = this.props
    const { query} = this.state

    let showingContacts
    if(query){
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      showingContacts = this.props.contacts.filter((contact) => match.test(contact.name))
    } else{
      showingContacts = contacts
    }

    showingContacts.sort(sortBy('name'))

    return(
      <div className = 'List-contacts'>

        <div className= 'List-contacts-top'>
          <input
             className= 'search-contacts'
             type= 'text'
             placeholder= 'Search contacts'
             value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
            <a
                href='#create'
                onClick={this.props.onNavigate}
                className='add-contact'
             >Add Contact</a>
          </div>

          {showingContacts.length !== contacts.length &&(
            <div className='showing-contacts'>
              <span>Now showing {showingContacts.length} of {contacts.length} total</span>
              <button onClick={this.clearQuery}> Show all</button>
            </div>
          )}


      <ol className= 'contact-list' >
        {showingContacts.map((contact) =>(
          <li key ={contact.id} className='contact-list-item'>
            <div className= 'contact-avatar' style={{
              backgroundImage: `url(${contact.avatarURL})`
            }}/>
            <div className='contact-details'>
              <p>{contact.name}</p>
              <p>{contact.email}</p>
            </div>
            <button onClick ={() => onDeleteContact(contact)} className= 'contact-remove'>
              Remove
            </button>

          </li>
        ))}
      </ol>
    </div>
    )
  }
}



export default ListContacts
