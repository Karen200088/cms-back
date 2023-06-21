class UserDto {
  email;
  id;

  constructor(model) {
    this.id = model.id;
    this.email = model.email;
  }
}

export default UserDto;