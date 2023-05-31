import { validate } from 'class-validator';
import { UserDto } from '../user.dto';

describe('UserDto', () => {
  let userDto: UserDto;

  beforeEach(() => {
    userDto = new UserDto();
  });

  it('should pass validation when all required fields are provided', async () => {
    userDto.email = 'test@example.com';
    userDto.firstname = 'John';
    userDto.lastname = 'Doe';

    const errors = await validate(userDto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation when email field is missing', async () => {
    userDto.firstname = 'John';
    userDto.lastname = 'Doe';

    const errors = await validate(userDto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail validation when firstname field is missing', async () => {
    userDto.email = 'test@example.com';
    userDto.lastname = 'Doe';

    const errors = await validate(userDto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail validation when lastname field is missing', async () => {
    userDto.email = 'test@example.com';
    userDto.firstname = 'John';

    const errors = await validate(userDto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should pass validation when optional fields are not provided', async () => {
    userDto.email = 'test@example.com';
    userDto.firstname = 'John';
    userDto.lastname = 'Doe';

    const errors = await validate(userDto);
    expect(errors.length).toBe(0);
  });

  it('should pass validation when optional fields are provided', async () => {
    userDto.email = 'test@example.com';
    userDto.firstname = 'John';
    userDto.lastname = 'Doe';
    userDto.avatar = 'https://example.com/avatar.png';
    userDto.isAuthor = true;
    userDto.isAdmin = false;

    const errors = await validate(userDto);
    expect(errors.length).toBe(0);
  });
});
