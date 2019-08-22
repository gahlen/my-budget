
//Change contact references to user

const contacts = []

export const getContacts = () =>{
    return contacts
}

export const addContact = contact => {
  console.log(contact.firstname);
    let result = false;
    if(contact.firstname &&
        contact.lastname &&
        contact.email &&
        contact.phone &&
        contact.age &&
        contact.password) {
            console.log(contact)
            fetch("http://localhost:4000", {
                method: "POST",
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify(contact)
              })  
        result = true
                          }
    console.log(result)                      
    return result
}

export const login = (credentials) => {
    console.log("Log Credentials",credentials);
    let result = false
    
    result = fetch("http://localhost:4000")
  .then(function(response) {
    return response.json();
  })
  .then(function(contacts) {
    if(contacts.some(contact => {
        return (contact.email === credentials.username &&
            contact.password === credentials.password);          
    })) {
        return true;
    } else {
        return false;
    }
    
  })  
    console.log("result3", result);
    return result
}


