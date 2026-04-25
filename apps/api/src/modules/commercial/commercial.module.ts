import {
  BadGatewayException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  Module,
  Post
} from "@nestjs/common";
import { IsEmail, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

class CommercialPresentationAccessDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @IsNotEmpty()
  currentChapterId!: string;

  @IsString()
  @IsNotEmpty()
  currentChapterTitle!: string;

  @IsIn(["24h", "48h", "72h"])
  activeTierId!: "24h" | "48h" | "72h";

  @IsString()
  @IsNotEmpty()
  activeTierLabel!: string;

  @IsInt()
  @Min(0)
  activePriceInCents!: number;

  @IsOptional()
  @IsString()
  landingPath?: string;
}

@Injectable()
class CommercialPresentationService {
  private readonly logger = new Logger(CommercialPresentationService.name);
  private readonly intakeUrl =
    process.env.PORTAL_LEADS_PRESENTATION_INTAKE_URL?.trim() ||
    "https://api.abasolucoesetecnologia.com.br/v1/public/commercial-intakes/plataforma-de-aulas";

  async registerPresentationAccess(payload: CommercialPresentationAccessDto) {
    const serviceToken = process.env.PORTAL_LEADS_SERVICE_TOKEN?.trim();

    if (!serviceToken) {
      throw new InternalServerErrorException("A integração comercial com o CRM não está configurada.");
    }

    const capturedAt = Date.now();
    const response = await fetch(this.intakeUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-aba-service-token": serviceToken
      },
      body: JSON.stringify({
        ...payload,
        capturedAt,
        sourceSystem: "plataforma-de-aulas"
      })
    });

    if (!response.ok) {
      const responseText = await response.text().catch(() => "");

      this.logger.error(
        `Falha ao registrar lead comercial no Portal de Leads (${response.status}) para ${payload.email} em ${this.intakeUrl}: ${responseText}`
      );

      throw new BadGatewayException(
        "Não foi possível registrar seus dados no CRM agora. Tente novamente em instantes."
      );
    }

    return {
      status: "ok" as const,
      crm: "portal-de-leads" as const,
      intake: "plataforma-de-aulas" as const,
      capturedAt
    };
  }
}

@Controller("commercial/presentation")
class CommercialPresentationController {
  constructor(private readonly commercialPresentation: CommercialPresentationService) {}

  @Post("access")
  @HttpCode(HttpStatus.CREATED)
  access(@Body() body: CommercialPresentationAccessDto) {
    return this.commercialPresentation.registerPresentationAccess(body);
  }
}

@Module({
  controllers: [CommercialPresentationController],
  providers: [CommercialPresentationService]
})
export class CommercialModule {}
