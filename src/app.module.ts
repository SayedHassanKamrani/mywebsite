import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { Project } from './projects/entities/project.entity.js';
import { Media } from './projects/entities/media.entity.js';
import { Lead } from './projects/entities/lead.entity.js'; 
import { ProjectsModule } from './projects/projects.module.js';
import { LeadsModule } from './leads/leads.module.js';
import { UploadsController } from './uploads/uploads.controller.js';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
          useFactory: (config: ConfigService) => {
        const dbUrl = config.get<string>('DATABASE_URL');
        if (dbUrl) {
          return {
            type: 'postgres',
            url: dbUrl,
            entities: [Project, Media, Lead],
            synchronize: true, // فقط برای شروع؛ بعداً به false تغییر دهید
            ssl: { rejectUnauthorized: false }, // برای اتصال امن به Render
          };
        }
        return {
          type: 'postgres',
          host: config.get<string>('DATABASE_HOST', 'localhost'),
          port: config.get<number>('DATABASE_PORT', 5432),
          username: config.get<string>('DATABASE_USER', 'postgres'),
          password: config.get<string>('DATABASE_PASSWORD', 'postgres'),
          database: config.get<string>('DATABASE_NAME', 'portfolio'),
          entities: [Project, Media, Lead],
          synchronize: true,
          logging: false,
        };
      },
    }),

    ProjectsModule,
    LeadsModule,
  ],
  controllers: [AppController,UploadsController],
  providers: [AppService],
})
export class AppModule {}