import { Body, Controller, Get, Module, Post } from "@nestjs/common";
import { IsEmail, IsIn, IsString, MinLength } from "class-validator";

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

  @IsIn(["super_admin", "platform_admin", "producer", "affiliate", "student", "support"])
  role!: "super_admin" | "platform_admin" | "producer" | "affiliate" | "student" | "support";
}

class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsIn(["super_admin", "platform_admin", "producer", "affiliate", "student", "support"])
  role!: "super_admin" | "platform_admin" | "producer" | "affiliate" | "student" | "support";
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
