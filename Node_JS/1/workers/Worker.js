class Worker{
    constructor(workerid, firstName, lastName, address, phone, email){
        this.workerid=workerid;
         this.firstName=firstName;
         this.lastName=lastName; 
         this.address=address;
         this.phone=phone;
         this.email=email;
         this.isActive=true;
    }

    get Worker_Id(){
        return this.id;
    }
    set Worker_Id(workerid){
        this.workerid=workerid;
    }

    get FirstName(){
        return this.firstName;
    }
    set FirstName(FirstName){
        this.firstName=FirstName;
    }

    get LastName(){
        return this.lastName;
    }
    set LastName(LastName){
        this.lastName=LastName;
    }

    get Address(){
        return this.address;
    }
    set Address(Address){
        this.address=Address;
    }

    get Phone(){
        return this.phone;
    }
    set Phone(Phone){
        this.tel=Phone;
    }

    get Email(){
        return this.email;
    }
    set Email(Email){
        this.email=Email;
    }

    get IsActive(){
        return this.isActive;
    }
    set IsActive(IsActive){
        
        this.isActive=IsActive;
    }

}
