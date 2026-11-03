import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsUrl } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty() @IsString() title: string;
  @ApiProperty() @IsString() slug: string;
  @ApiProperty() @IsString() industry: string;
  @ApiProperty() @IsString() type: string;

  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() challenge?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() solution?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() result?: string;
  @ApiPropertyOptional() @IsOptional() @IsUrl() figmaEmbed?: string;
  @ApiPropertyOptional() @IsOptional() @IsUrl() liveUrl?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() featured?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsString() thumbnailId?: string;
    @ApiPropertyOptional() @IsOptional() @IsString() thumbnailUrl?: string; 
}