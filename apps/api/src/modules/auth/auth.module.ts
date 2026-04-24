import { Body, Controller, Get, Module, Post } from "@nestjs/common";
import { IsEmail, IsString, MinLength } from "class-validator";

import { DemoStoreService } from "../../common/demo-store.service";

class RegisterDto {
  @IsString()
  @MinLength(3)
  fullName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}

class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}

@Controller("auth")
class AuthController {
  constructor(private readonly demoStore: DemoStoreService) {}

  @Post("register")
  register(@Body() body: RegisterDto) {
    return this.demoStore.register(body);
  }

  @Post("login")
  login(@Body() body: LoginDto) {
    return this.demoStore.login(body);
  }

  @Get("me")
  me() {
    return this.demoStore.getCurrentUser();
  }
}

@Module({
  controllers: [AuthController]
})
export class AuthModule {}
