class UserDto {
  id;
  email;
  firstName;
  lastName;

  constructor(model) {
    this.id = model.id;
    this.email = model.email;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
  }
}

export default UserDto;