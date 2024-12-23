import bcrypt from 'bcryptjs';
import User from '@src/models/user.model';

class AuthService {
  async register(requestBody: any): Promise<any> {
    try {
      const {
        first_name,
        last_name,
        email,
        password,
        role = 'user',
        login_by = 'regular',
      } = requestBody;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return {
          success: false,
          message: 'Email is already in use.',
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        role,
        login_by,
        is_verify: 0,
      });

      return {
        success: true,
        data: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role: user.role,
          login_by: user.login_by,
        },
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}

export default new AuthService();
