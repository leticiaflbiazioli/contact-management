import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // In a real scenario, I would search for the user in the database
    const mockUser = {
      id: 1,
      username: 'userlogin',
      password: await bcrypt.hash('password123', 10),
    };

    const isPasswordValid = await bcrypt.compare(pass, mockUser.password);
    if (mockUser && isPasswordValid) {
      const { password, ...result } = mockUser;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
